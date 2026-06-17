return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/40 backdrop-blur-sm mb-6">
            {isLogin ? (
              <span className="text-sm font-medium text-primary">Welcome Back</span>
            ) : (
              <span className="text-sm font-medium text-accent">Join GROWHAZ</span>
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
