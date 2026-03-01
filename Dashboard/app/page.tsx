"use client";

import Image from "next/image";
import { KeyboardEvent, useMemo, useRef, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useRouter } from "next/navigation";

type AuthStep = "signIn" | "forgotPassword" | "verifyOtp" | "setNewPassword";

const OTP_LENGTH = 4;

const createEmptyOtp = () => Array.from({ length: OTP_LENGTH }, () => "");

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(createEmptyOtp);
  const [error, setError] = useState("");
  const [rememberPassword, setRememberPassword] = useState(true);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otpValue = useMemo(() => otp.join(""), [otp]);

  const resetError = () => setError("");

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (!cleaned) {
      setOtp((previousOtp) => {
        const nextOtp = [...previousOtp];
        nextOtp[index] = "";
        return nextOtp;
      });
      return;
    }

    setOtp((previousOtp) => {
      const nextOtp = [...previousOtp];
      if (cleaned.length === 1) {
        nextOtp[index] = cleaned;
        return nextOtp;
      }

      for (let offset = 0; offset < cleaned.length; offset += 1) {
        const targetIndex = index + offset;
        if (targetIndex >= OTP_LENGTH) {
          break;
        }
        nextOtp[targetIndex] = cleaned[offset];
      }
      return nextOtp;
    });

    const nextIndex = Math.min(index + cleaned.length, OTP_LENGTH - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const goToSignIn = () => {
    setStep("signIn");
    setOtp(createEmptyOtp());
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPassword("");
    resetError();
  };

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setError("Enter email and password.");
      return;
    }
    router.replace("/dashboard");

    resetError();
  };

  const handleSendCode = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    resetError();
    setOtp(createEmptyOtp());
    setStep("verifyOtp");
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 4) {
      setError("Enter the 4-digit code.");
      return;
    }

    resetError();
    setStep("setNewPassword");
  };

  const handleSetNewPassword = () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    goToSignIn();
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-page px-4 py-6">
      <main className="flex min-h-192.25 w-full max-w-235 items-center justify-center rounded-md bg-card px-7 py-11 shadow-md">
        <section className="w-full px-32">
          <div className="flex justify-center mb-20">
            <Image
              src="/appIcon.png"
              alt="App icon"
              width={150}
              height={150}
              priority
              style={{
                borderRadius: 25,
              }}
            />
          </div>

          {step === "signIn" ? (
            <form
              className="space-y-4 w-full justify-center flex flex-col items-center "
              onSubmit={(event) => {
                event.preventDefault();
                handleSignIn();
              }}
            >
              <CustomInput
                autoComplete="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  resetError();
                }}
              />
              <CustomInput
                autoComplete="current-password"
                label="Password"
                placeholder="******"
                type="password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  resetError();
                }}
              />
              <div className="flex w-full items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-muted">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-main"
                    checked={rememberPassword}
                    onChange={(event) =>
                      setRememberPassword(event.target.checked)
                    }
                  />
                  Remember password
                </label>
                <button
                  type="button"
                  className="font-medium text-main underline-offset-2 hover:underline"
                  onClick={() => {
                    resetError();
                    setStep("forgotPassword");
                  }}
                >
                  Forgot password?
                </button>
              </div>
              {error ? (
                <p className="text-xs text-error">{error}</p>
              ) : null}
              <CustomButton type="submit">Sign In</CustomButton>
            </form>
          ) : null}

          {step === "forgotPassword" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleSendCode();
              }}
            >
              <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-heading">
                  Forget Password
                </h1>
                <p className="text-sm text-muted">
                  Enter your email address to receive a reset code.
                </p>
              </header>
              <CustomInput
                autoComplete="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  resetError();
                }}
              />
              {error ? (
                <p className="text-xs text-error">{error}</p>
              ) : null}
              <CustomButton type="submit">Send Code</CustomButton>
              <button
                type="button"
                className="w-full text-center text-xs font-medium text-main"
                onClick={goToSignIn}
              >
                Back to sign in
              </button>
            </form>
          ) : null}

          {step === "verifyOtp" ? (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                handleVerifyOtp();
              }}
            >
              <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-heading">
                  Verify OTP
                </h1>
                <p className="text-sm text-muted">
                  Please enter the 4-digit code sent to {email || "your email"}.
                </p>
              </header>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={`${index}-otp`}
                    inputMode="numeric"
                    className="h-11 w-11 rounded-sm border border-border bg-field text-center text-lg font-semibold text-heading outline-none focus:border-main"
                    maxLength={1}
                    ref={(element) => {
                      otpRefs.current[index] = element;
                    }}
                    value={digit}
                    onChange={(event) => {
                      handleOtpChange(index, event.target.value);
                      resetError();
                    }}
                    onKeyDown={(event) => {
                      handleOtpKeyDown(index, event);
                    }}
                    onFocus={(event) => {
                      event.currentTarget.select();
                    }}
                  />
                ))}
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="text-xs font-medium text-main"
                  onClick={() => {
                    setOtp(createEmptyOtp());
                    resetError();
                    otpRefs.current[0]?.focus();
                  }}
                >
                  Resend code
                </button>
              </div>
              {error ? (
                <p className="text-center text-xs text-error">{error}</p>
              ) : null}
              <CustomButton type="submit">Verify</CustomButton>
            </form>
          ) : null}

          {step === "setNewPassword" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleSetNewPassword();
              }}
            >
              <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-heading">
                  Set New Password
                </h1>
                <p className="text-sm text-muted">
                  Update your password and sign in again.
                </p>
              </header>
              <CustomInput
                autoComplete="current-password"
                label="Current Password"
                placeholder="******"
                type="password"
                value={currentPassword}
                onChange={(value) => {
                  setCurrentPassword(value);
                  resetError();
                }}
              />
              <CustomInput
                autoComplete="new-password"
                label="New Password"
                placeholder="******"
                type="password"
                value={newPassword}
                onChange={(value) => {
                  setNewPassword(value);
                  resetError();
                }}
              />
              <CustomInput
                autoComplete="new-password"
                label="Confirm New Password"
                placeholder="******"
                type="password"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
                  resetError();
                }}
              />
              {error ? (
                <p className="text-xs text-error">{error}</p>
              ) : null}
              <CustomButton type="submit">Sign In</CustomButton>
            </form>
          ) : null}
        </section>
      </main>
    </div>
  );
}
