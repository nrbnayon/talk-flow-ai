// src\app\(auth)\components\VerifyOtp.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be 6 digits")
    .max(4, "OTP must be 6 digits")
    .regex(/^\d{4}$/, "OTP must contain only numbers"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Initialize timer and email on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const otpSentTime = localStorage.getItem("otpSentTime");
    const timerKey = `otpTimer_${storedEmail}`;
    const storedTimeLeft = localStorage.getItem(timerKey);

    if (!storedEmail) {
      toast.error("Session expired", {
        description: "Please start the password reset process again.",
      });
      router.push("/forgot-password");
      return;
    }

    setEmail(storedEmail);

    // Calculate remaining time
    if (otpSentTime && storedTimeLeft) {
      const timePassed = Math.floor(
        (Date.now() - parseInt(otpSentTime)) / 1000
      );
      const remainingTime = Math.max(0, parseInt(storedTimeLeft) - timePassed);
      setTimeLeft(remainingTime);
    } else if (otpSentTime) {
      const timePassed = Math.floor(
        (Date.now() - parseInt(otpSentTime)) / 1000
      );
      const remainingTime = Math.max(0, 180 - timePassed);
      setTimeLeft(remainingTime);
      localStorage.setItem(timerKey, remainingTime.toString());
    }
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          // Save timer state to localStorage
          const timerKey = `otpTimer_${email}`;
          localStorage.setItem(timerKey, newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeLeft, email]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: OtpFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console
      console.log("OTP Verification Data:", {
        email,
        otp: data.otp,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful OTP verification
      toast.success("OTP verified successfully!", {
        description: "Redirecting to reset password...",
        duration: 2000,
      });

      // Store verification status
      localStorage.setItem("otpVerified", "otpVerified");
      localStorage.setItem("verificationTime", Date.now().toString());

      // Clear timer from localStorage
      const timerKey = `otpTimer_${email}`;
      localStorage.removeItem(timerKey);

      setTimeout(() => {
        router.push("/reset-password");
      }, 1000);
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Invalid OTP", {
        description: "Please check the code and try again.",
        duration: 3000,
      });
      setError("otp", { message: "Invalid OTP code" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset timer
      setTimeLeft(180);
      const newSentTime = Date.now();
      localStorage.setItem("otpSentTime", newSentTime.toString());
      const timerKey = `otpTimer_${email}`;
      localStorage.setItem(timerKey, "180");

      toast.success("OTP resent successfully!", {
        description: `New verification code sent to ${email}`,
        duration: 2000,
      });
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setValue("otp", value);

    // Auto-submit when OTP is complete
    if (value.length === 6) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-primary dark:bg-primary-dark">
      {/*  OTP Verification Form */}
      <div className="flex-1 bg-primary dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl p-4 py-6 rounded-sm sm:rounded-xl border-none shadow-none bg-white">
          <div className="text-center relative mb-4">
            <div className="flex items-center justify-center mb-2 sm:mb-4">
              <Link
                href="/forgot-password"
                className="absolute left-0 top-0 sm:left-2 sm:top-2 lg:left-4 lg:top-4 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors border"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-secondary dark:text-gray-400" />
              </Link>
              <div className="w-full flex justify-center items-center">
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={165}
                  height={120}
                />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-3xl text-primary font-bold dark:text-white my-3">
              Check your email
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-0">
              Please enter the 4-digit verification code we sent to
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 break-all">
              {email}
            </p>
          </div>

          <CardContent className="px-2 sm:px-4 lg:px-6">
            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* OTP Input */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={handleOtpChange}
                    disabled={isLoading || timeLeft === 0}
                  >
                    <InputOTPGroup className="gap-2 sm:gap-6">
                      <InputOTPSlot
                        index={0}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg rounded-md shadow-none text-foreground"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg rounded-md shadow-none text-foreground"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg rounded-md shadow-none text-foreground"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg rounded-md shadow-none text-foreground"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {errors.otp && (
                  <p className="text-error text-xs mt-1 text-center">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              {/* Timer Display */}
              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Code expires in:{" "}
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {formatTime(timeLeft)}s
                    </span>
                  </p>
                ) : (
                  <p className="text-error text-xs sm:text-sm">
                    Verification code has expired
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-gradient-red hover:bg-gradient-red-hover text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base"
                disabled={
                  isLoading ||
                  isSubmitting ||
                  otp.length !== 4 ||
                  timeLeft === 0
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Verifying...</span>
                    <span className="sm:hidden">Verifying...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Verify Code</span>
                    <span className="sm:hidden">Verify</span>
                  </>
                )}
              </Button>

              {/* Resend Button */}
              <div className="flex items-center justify-center gap-2">
                <p className="text-secondary text-xs sm:text-sm text-center">
                  Didn&lsquo;t receive the code?
                </p>
                <button
                  onClick={handleResendOtp}
                  className="text-red text-xs sm:text-sm hover:text-red hover:underline transition-colors text-center sm:text-right cursor-pointer"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">Resending...</span>
                      <span className="sm:hidden">Resending...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Resend Code</span>
                      <span className="sm:hidden">Resend</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
