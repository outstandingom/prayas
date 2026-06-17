// src/pages/Auth.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

// --- Validation schemas ---
const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(15).optional().or(z.literal("")),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface PendingUser {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const mounted = useRef(true);
  const authCompleted = useRef(false);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Sign-up OTP
  const [showSignupOtp, setShowSignupOtp] = useState(false);
  const [signupOtpCode, setSignupOtpCode] = useState("");
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);
  const [signupOtpTimer, setSignupOtpTimer] = useState(0);

  // Forgot password
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Login OTP
  const [loginOtpOpen, setLoginOtpOpen] = useState(false);
  const [loginOtpEmail, setLoginOtpEmail] = useState("");
  const [loginOtpCode, setLoginOtpCode] = useState("");
  const [loginOtpStep, setLoginOtpStep] = useState<"email" | "verify">("email");
  const [loginOtpTimer, setLoginOtpTimer] = useState(0);

  // --- Effects ---
  useEffect(() => {
    mounted.current = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && mounted.current && window.location.pathname === "/auth") {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (authCompleted.current && session?.user && mounted.current) {
        navigate("/");
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (signupOtpTimer <= 0) return;
    const timer = setTimeout(() => setSignupOtpTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [signupOtpTimer]);

  useEffect(() => {
    if (loginOtpTimer <= 0) return;
    const timer = setTimeout(() => setLoginOtpTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [loginOtpTimer]);

  // --- Helpers ---
  const normalizeOtp = (value: string) => value.replace(/\D/g, "").slice(0, 6);

  const validateMainForm = useCallback(() => {
    setErrors({});
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        registerSchema.parse({ fullName, phone, email, password });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const nextErrors: Record<string, string> = {};
        error.errors.forEach((issue) => {
          if (issue.path[0]) nextErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(nextErrors);
      }
      return false;
    }
  }, [isLogin, email, password, fullName, phone]);

  const showToast = (title: string, description?: string, isError = false) => {
    alert(`${isError ? '❌ ' : '✅ '}${title}\n${description || ''}`);
  };

  // --- Sign In ---
  const handleSignIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateMainForm()) return;
      setLoading(true);
      authCompleted.current = true;

      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showToast("Welcome back!", "You have successfully logged in.");
        navigate("/");
      } catch (error: any) {
        authCompleted.current = false;
        if (!mounted.current) return;
        showToast(
          "Sign In Failed",
          error?.message?.includes("Invalid login credentials")
            ? "Invalid email or password."
            : error?.message || "Unable to sign in.",
          true
        );
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [email, password, navigate, validateMainForm]
  );

  // --- Sign Up ---
  const handleSignUp = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateMainForm()) return;

      setLoading(true);
      try {
        setPendingUser({
          email: email.trim(),
          password: password.trim(),
          fullName: fullName.trim(),
          phone: phone.trim(),
        });

        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            shouldCreateUser: true,
            data: {
              full_name: fullName.trim(),
              phone: phone.trim() || null,
            },
          },
        });
        if (error) throw error;

        setSignupOtpCode("");
        setShowSignupOtp(true);
        setSignupOtpTimer(45);
        showToast("Verification Code Sent", `Enter the 6-digit code sent to ${email.trim()}`);
      } catch (error: any) {
        if (!mounted.current) return;
        showToast("Sign Up Failed", error?.message || "Unable to send OTP.", true);
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [email, fullName, password, phone, validateMainForm]
  );

  // --- Verify sign-up OTP ---
  const handleVerifySignupOtp = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (!pendingUser || signupOtpCode.length !== 6) return;

      setLoading(true);
      try {
        const { error: otpError } = await supabase.auth.verifyOtp({
          email: pendingUser.email,
          token: signupOtpCode,
          type: "email",
        });
        if (otpError) throw otpError;

        if (pendingUser.password) {
          const { error: updateError } = await supabase.auth.updateUser({
            password: pendingUser.password,
          });
          if (updateError) {
            showToast(
              "Account created",
              "Account verified but password setup failed. You can set password later.",
              true
            );
          }
        }

        authCompleted.current = true;
        showToast("Account Created", "Your email is verified and account is ready.");
        navigate("/");
      } catch (error: any) {
        if (!mounted.current) return;
        showToast("Verification Failed", error?.message || "Invalid or expired code.", true);
        setSignupOtpCode("");
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [navigate, pendingUser, signupOtpCode]
  );

  // --- Resend sign-up OTP ---
  const handleResendSignupOtp = useCallback(async () => {
    if (!pendingUser || signupOtpTimer > 0) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: pendingUser.email,
        options: {
          shouldCreateUser: true,
          data: {
            full_name: pendingUser.fullName,
            phone: pendingUser.phone || null,
          },
        },
      });
      if (error) throw error;
      setSignupOtpTimer(45);
      setSignupOtpCode("");
      showToast("Code Resent", "A new verification code has been sent.");
    } catch (error: any) {
      if (!mounted.current) return;
      showToast("Resend Failed", error?.message || "Please try again.", true);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [pendingUser, signupOtpTimer]);

  // --- Login OTP ---
  const sendLoginOtp = useCallback(async () => {
    const targetEmail = loginOtpEmail.trim();
    try {
      z.string().email().parse(targetEmail);
    } catch {
      showToast("Invalid Email", "Please enter a valid email address.", true);
      return;
    }

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: targetEmail,
        options: { shouldCreateUser: false },
      });
      if (error) throw error;

      setLoginOtpStep("verify");
      setLoginOtpTimer(45);
      setLoginOtpCode("");
      showToast("OTP Sent", "Enter the 6-digit code sent to your email.");
    } catch (error: any) {
      if (!mounted.current) return;
      showToast("OTP Failed", error?.message || "Unable to send OTP.", true);
    } finally {
      if (mounted.current) setResetLoading(false);
    }
  }, [loginOtpEmail]);

  const verifyLoginOtp = useCallback(async () => {
    if (loginOtpCode.length !== 6 || !loginOtpEmail.trim()) return;
    setResetLoading(true);
    authCompleted.current = true;

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: loginOtpEmail.trim(),
        token: loginOtpCode,
        type: "email",
      });
      if (error) throw error;

      showToast("Signed In", "OTP verification successful.");
      setLoginOtpOpen(false);
      navigate("/");
    } catch (error: any) {
      authCompleted.current = false;
      if (!mounted.current) return;
      showToast("Verification Failed", error?.message || "Invalid OTP.", true);
      setLoginOtpCode("");
    } finally {
      if (mounted.current) setResetLoading(false);
    }
  }, [loginOtpCode, loginOtpEmail, navigate]);

  const openLoginOtpDialog = () => {
    setLoginOtpOpen(true);
    setLoginOtpStep("email");
    setLoginOtpEmail(email.trim());
    setLoginOtpCode("");
  };

  // --- Forgot Password ---
  const handleResetPassword = useCallback(async () => {
    if (!resetEmail.trim()) {
      showToast("Email required", "Please enter your email address.", true);
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      if (error) throw error;
      showToast("Reset link sent", `Check ${resetEmail} for password reset instructions.`);
      setResetPasswordOpen(false);
      setResetEmail("");
    } catch (error: any) {
      showToast("Reset failed", error?.message || "Unable to send reset email.", true);
    } finally {
      setResetLoading(false);
    }
  }, [resetEmail]);

  const switchMode = useCallback(() => {
    setIsLogin((prev) => !prev);
    setErrors({});
    setShowSignupOtp(false);
    setSignupOtpCode("");
    setPendingUser(null);
    setPassword("");
  }, []);

  // --- Sign-up OTP View ---
  if (showSignupOtp && pendingUser) {
    return (
      <section className="section-container min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/40 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-primary">Verify Email</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Enter <span className="text-primary">OTP</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              We sent a 6-digit code to<br />
              <span className="font-medium">{pendingUser.email}</span>
            </p>
          </div>

          <div className="p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm space-y-6">
            <form onSubmit={handleVerifySignupOtp} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="signup-otp" className="text-xs text-muted-foreground">
                  Verification Code
                </label>
                <input
                  id="signup-otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  placeholder="Enter 6-digit code"
                  value={signupOtpCode}
                  onChange={(e) => setSignupOtpCode(normalizeOtp(e.target.value))}
                  className="w-full bg-background/50 border border-border/50 text-center text-lg tracking-[0.35em] h-12 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={loading || signupOtpCode.length !== 6}
              >
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
            </form>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleResendSignupOtp}
                disabled={signupOtpTimer > 0}
                className="text-xs text-primary font-medium hover:underline disabled:opacity-50"
              >
                {signupOtpTimer > 0 ? `Resend in ${signupOtpTimer}s` : "Resend Code"}
              </button>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setShowSignupOtp(false);
                    setPendingUser(null);
                    setSignupOtpCode("");
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Back to Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- Main Auth Form ---
return (
    <section className="section-container min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/40 backdrop-blur-sm mb-6">
            {isLogin ? (
              <>
                <span className="text-sm font-medium text-primary">Welcome Back</span>
              </>
            ) : (
              <>
                <span className="text-sm font-medium text-accent">Join GROWHAZ</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create account with email OTP verification"}
          </p>
        </div>

        <div className="p-6 rounded-xl backdrop-blur-sm border border-primary/20 bg-card/50">
          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="flex items-center gap-2 text-xs text-muted-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={`w-full bg-background/50 border ${errors.fullName ? 'border-destructive' : 'border-border/50'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="flex items-center gap-2 text-xs text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-background/50 border ${errors.phone ? 'border-destructive' : 'border-border/50'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div className="border-t border-border/30 my-2" />
              </>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="flex items-center gap-2 text-xs text-muted-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-background/50 border ${errors.email ? 'border-destructive' : 'border-border/50'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="flex items-center gap-2 text-xs text-muted-foreground">
                Password {isLogin && <span className="text-destructive">*</span>}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={isLogin}
                  minLength={isLogin ? 6 : undefined}
                  className={`w-full bg-background/50 border ${errors.password ? 'border-destructive' : 'border-border/50'} text-sm h-9 rounded-md px-3 pr-9 focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              {!isLogin && (
                <p className="text-xs text-muted-foreground">
                  Password is required and will be set after email verification.
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setResetPasswordOpen(true)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot Password?
                </button>

                <button
                  type="button"
                  onClick={openLoginOtpDialog}
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Login with OTP
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : isLogin ? (
                <>
                  Sign In <span>→</span>
                </>
              ) : (
                <>
                  Send Signup OTP <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-border/30 text-center">
            <p className="text-xs text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchMode}
                className={`ml-2 font-medium hover:underline text-xs ${isLogin ? "text-primary" : "text-accent"}`}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/60 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* --- Forgot Password Dialog (simple modal) --- */}
      {resetPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl w-full max-w-md border border-primary/20">
            <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the email address associated with your account, and we'll send you a reset link.
            </p>
            <div className="space-y-4">
              <input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-background/50 border border-border/50 text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setResetPasswordOpen(false)}
                  className="px-4 py-2 text-sm border border-border/50 rounded-md hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={resetLoading || !resetEmail.trim()}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Login OTP Dialog (simple modal) --- */}
      {loginOtpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl w-full max-w-md border border-primary/20">
            <h2 className="text-lg font-semibold mb-2">Login with OTP</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {loginOtpStep === "email"
                ? "Enter your registered email to receive a one-time code."
                : `Enter the 6-digit code sent to ${loginOtpEmail}`}
            </p>

            {loginOtpStep === "email" ? (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginOtpEmail}
                  onChange={(e) => setLoginOtpEmail(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setLoginOtpOpen(false)}
                    className="px-4 py-2 text-sm border border-border/50 rounded-md hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendLoginOtp}
                    disabled={resetLoading || !loginOtpEmail.trim()}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  placeholder="Enter 6-digit OTP"
                  value={loginOtpCode}
                  onChange={(e) => setLoginOtpCode(normalizeOtp(e.target.value))}
                  className="w-full bg-background/50 border border-border/50 text-center text-lg tracking-[0.35em] h-11 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={6}
                />
                <div className="flex justify-between items-center">
                  <button
                    onClick={sendLoginOtp}
                    disabled={loginOtpTimer > 0 || resetLoading}
                    className="text-xs text-primary hover:underline disabled:opacity-50"
                  >
                    {loginOtpTimer > 0 ? `Resend in ${loginOtpTimer}s` : "Resend OTP"}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLoginOtpOpen(false);
                        setLoginOtpStep("email");
                        setLoginOtpCode("");
                      }}
                      className="px-4 py-2 text-sm border border-border/50 rounded-md hover:bg-muted"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={verifyLoginOtp}
                      disabled={resetLoading || loginOtpCode.length !== 6}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                      Verify & Login
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
                  }
