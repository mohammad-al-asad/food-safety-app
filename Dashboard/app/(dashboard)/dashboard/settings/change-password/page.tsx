"use client";

import React, {
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/ui/CustomInput";

type ViewMode = "change" | "forgot" | "verify";
const OTP_LENGTH = 4;
const createEmptyOtp = () => Array.from({ length: OTP_LENGTH }, () => "");

export default function ChangePasswordPage() {
  const router = useRouter();
  const [mode, setMode] = useState<ViewMode>("change");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(createEmptyOtp);
  const [error, setError] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otpValue = useMemo(() => otp.join(""), [otp]);
  const resetError = () => setError("");

  const headerTitle =
    mode === "change"
      ? "Change Password"
      : mode === "forgot"
      ? "Forgot Password"
      : "Settings";

  const handleBack = () => {
    resetError();

    if (mode === "verify") {
      setMode("forgot");
      return;
    }

    if (mode === "forgot") {
      setMode("change");
      return;
    }

    router.push("/dashboard/settings");
  };

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
        if (targetIndex >= OTP_LENGTH) break;
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

  const handleChangePassword = () => {
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

    resetError();
  };

  const handleSendCode = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    resetError();
    setOtp(createEmptyOtp());
    setMode("verify");
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== OTP_LENGTH) {
      setError("Enter the 4-digit code.");
      return;
    }

    resetError();
  };

  return (
    <div className="max-h-[calc(100vh-8.5rem)]">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm">
        <div className="bg-main px-4 py-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-3 text-white"
          >
            <ArrowLeft size={30} />
            <h1 className="text-3xl font-bold tracking-tight">{headerTitle}</h1>
          </button>
        </div>

        <div className="px-18 py-12 flex flex-col items-center">
          {mode === "change" && (
            <form
              className="max-w-5xl w-full"
              onSubmit={(event) => {
                event.preventDefault();
                handleChangePassword();
              }}
            >
              <div className="space-y-5">
                <CustomInput
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(value) => {
                    setCurrentPassword(value);
                    resetError();
                  }}
                  placeholder="*******"
                />
                <CustomInput
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(value) => {
                    setNewPassword(value);
                    resetError();
                  }}
                  placeholder="*******"
                />
                <CustomInput
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    resetError();
                  }}
                  placeholder="*******"
                />
              </div>

              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    resetError();
                    setMode("forgot");
                  }}
                  className="text-sm text-main underline underline-offset-2"
                >
                  Forgot password?
                </button>
              </div>

              {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-main py-2.5 text-lg font-bold text-white transition-colors hover:bg-[#d9561a]"
              >
                Change Password
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form
              className="max-w-5xl w-full"
              onSubmit={(event) => {
                event.preventDefault();
                handleSendCode();
              }}
            >
              <p className="mb-6 max-w-4xl text-3xl leading-tight text-[#334155]">
                Enter your email address to ger a verification code for resetting
                your password.
              </p>

              <CustomInput
                label="Email"
                type="email"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  resetError();
                }}
                placeholder="Enter your email"
              />

              {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-main py-2.5 text-lg font-bold text-white transition-colors hover:bg-[#d9561a]"
              >
                Get OTP
              </button>
            </form>
          )}

          {mode === "verify" && (
            <form
              className="max-w-5xl w-full"
              onSubmit={(event) => {
                event.preventDefault();
                handleVerifyOtp();
              }}
            >
              <p className="mb-6 max-w-4xl text-3xl leading-tight text-[#334155]">
                Please check your email. We have sent a code to contact
                example@gmail.com
              </p>

              <div className="mb-4 flex items-center justify-center gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    inputMode="numeric"
                    value={digit}
                    maxLength={1}
                    ref={(element) => {
                      otpRefs.current[index] = element;
                    }}
                    onChange={(event) => {
                      handleOtpChange(index, event.target.value);
                      resetError();
                    }}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    onFocus={(event) => event.currentTarget.select()}
                    className="h-16 w-16 rounded-md border border-main bg-transparent text-center text-4xl text-[#334155] outline-none focus:bg-white"
                  />
                ))}
              </div>

              <div className="mb-6 flex items-center justify-center text-sm text-[#64748B]">
                <div>Didn&apos;t receive code?</div>
                <button
                  type="button"
                  className="underline underline-offset-2 ml-1"
                  onClick={() => {
                    setOtp(createEmptyOtp());
                    resetError();
                    otpRefs.current[0]?.focus();
                  }}
                >
                  Resend
                </button>
              </div>

              {error ? <p className="mb-4 text-sm text-error text-center">{error}</p> : null}

              <button
                type="submit"
                className="w-full rounded-md bg-main py-2.5 text-lg font-bold text-white transition-colors hover:bg-[#d9561a]"
              >
                Verify
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
