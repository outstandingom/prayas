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

  // Forgot password
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

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

  // --- Helpers ---
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
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            nextErrors[issue.path[0] as string] = issue.message;
          }
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
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim() || null,
            },
          },
        });
        if (error) throw error;

        showToast(
          "Confirmation Email Sent",
          `Please check ${email.trim()} to confirm your account.`
        );
      } catch (error: any) {
        if (!mounted.current) return;
        showToast("Sign Up Failed", error?.message || "Unable to create account.", true);
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [email, fullName, password, phone, validateMainForm]
  );

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
    setPassword("");
  }, []);

  // --- Main Auth Form ---
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 bg-[#F1F8F5]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFF314]/20 bg-white/40 backdrop-blur-sm mb-6">
            {isLogin ? (
              <span className="text-sm font-medium text-[#FFF314]">Welcome Back</span>
            ) : (
              <span className="text-sm font-medium text-[#FFF314]">Join Prayas Samaj Sevi Sanstha</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#263238]">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-[#263238]/60 text-sm">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create account and verify your email"}
          </p>
        </div>

        <div className="p-6 rounded-xl backdrop-blur-sm border border-[#FFF314]/20 bg-white/50">
          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="flex items-center gap-2 text-xs text-[#263238]/60">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={`w-full bg-white/50 border ${errors.fullName ? 'border-red-500' : 'border-[#FFF314]/20'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#FFF314]/50 text-[#263238]`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="flex items-center gap-2 text-xs text-[#263238]/60">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-white/50 border ${errors.phone ? 'border-red-500' : 'border-[#FFF314]/20'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#FFF314]/50 text-[#263238]`}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="border-t border-[#FFF314]/10 my-2" />
              </>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="flex items-center gap-2 text-xs text-[#263238]/60">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-white/50 border ${errors.email ? 'border-red-500' : 'border-[#FFF314]/20'} text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#FFF314]/50 text-[#263238]`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="flex items-center gap-2 text-xs text-[#263238]/60">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={`w-full bg-white/50 border ${errors.password ? 'border-red-500' : 'border-[#FFF314]/20'} text-sm h-9 rounded-md px-3 pr-9 focus:outline-none focus:ring-2 focus:ring-[#FFF314]/50 text-[#263238]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#263238]/60 hover:text-[#263238]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setResetPasswordOpen(true)}
                  className="text-xs text-[#FFF314] hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FFF314] text-[#263238] rounded-md font-medium hover:bg-[#FFF314]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
                  Sign Up <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[#FFF314]/10 text-center">
            <p className="text-xs text-[#263238]/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 font-medium hover:underline text-xs text-[#FFF314]"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-[#263238]/40 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* --- Forgot Password Dialog --- */}
      {resetPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md border border-[#FFF314]/20">
            <h2 className="text-lg font-semibold mb-2 text-[#263238]">Reset Password</h2>
            <p className="text-sm text-[#263238]/60 mb-4">
              Enter the email address associated with your account, and we'll send you a reset link.
            </p>
            <div className="space-y-4">
              <input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white/50 border border-[#FFF314]/20 text-sm h-9 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#FFF314]/50 text-[#263238]"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setResetPasswordOpen(false)}
                  className="px-4 py-2 text-sm border border-[#263238]/20 rounded-md hover:bg-gray-50 text-[#263238]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={resetLoading || !resetEmail.trim()}
                  className="px-4 py-2 text-sm bg-[#FFF314] text-[#263238] rounded-md hover:bg-[#FFF314]/90 disabled:opacity-50"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
