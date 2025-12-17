"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Lock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resetPasswordValidationSchema } from "@/lib/formDataValidation";

type ResetPasswordFormData = z.infer<typeof resetPasswordValidationSchema>;

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch password field for real-time validation
  const newPassword = watch("newPassword");

  // Password strength validation
  const passwordValidation = {
    hasMinLength: newPassword ? newPassword.length >= 8 : false,
    hasUpperLower: newPassword
      ? /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)
      : false,
    hasNumber: newPassword ? /(?=.*\d)/.test(newPassword) : false,
  };

  // Check verification status and set email on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const otpVerified = localStorage.getItem("otpVerified");
    const verificationTime = localStorage.getItem("verificationTime");

    if (!storedEmail || !otpVerified) {
      toast.error("Unauthorized access", {
        description: "Please complete the verification process first.",
      });
      router.push("/forgot-password");
      return;
    }

    // Check if verification is still valid (e.g., within 10 minutes)
    if (verificationTime) {
      const timePassed = Date.now() - parseInt(verificationTime);
      const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timePassed > tenMinutes) {
        toast.error("Verification expired", {
          description: "Please start the password reset process again.",
        });
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("otpVerified");
        localStorage.removeItem("verificationTime");
        router.push("/forgot-password");
        return;
      }
    }

    setEmail(storedEmail);
    setValue("email", storedEmail);
  }, [router, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console (excluding password for security)
      console.log("Reset Password Data:", {
        email: data.email,
        passwordLength: data.newPassword.length,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful password reset
      toast.success("Password reset successful!", {
        description: "Your password has been updated successfully.",
        duration: 2000,
      });

      // Clear all reset-related data from localStorage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpVerified");
      localStorage.removeItem("verificationTime");
      localStorage.removeItem("otpSentTime");

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/reset-success");
      }, 1000);
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Password reset failed", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-primary dark:bg-primary-dark">
      {/* Right Side - Reset Password Form */}
      <div className="flex-1 bg-primary dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl p-4 py-6 rounded-sm sm:rounded-xl border-none shadow-none bg-white">
          <div className="text-center relative mb-2">
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
              Reset Password
            </h2>
            <p className="text-secondary text-base px-2 sm:px-0">
              Enter your new password below
            </p>
          </div>

          <CardContent className="px-2 sm:px-4 lg:px-6">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <label className="text-foreground text-sm sm:text-base font-medium block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    {...register("email")}
                    type="email"
                    value={email}
                    readOnly
                    disabled
                    className="pl-10 sm:pl-12 h-10 sm:h-12 bg-gray-50 rounded-md dark:bg-gray-700 border-primary/30 text-black cursor-not-allowed text-sm sm:text-base"
                    placeholder="Email address"
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-foreground text-sm sm:text-base font-medium block">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    {...register("newPassword")}
                    type={showNewPassword ? "text" : "password"}
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 rounded-md border focus-visible:border-primary text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm sm:text-base bg-transparent"
                    placeholder="Enter your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red text-xs mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-foreground text-sm sm:text-base font-medium block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 rounded-md border focus-visible:border-primary text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm sm:text-base bg-transparent"
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <p className="mb-2">Password must contain:</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasMinLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-xs sm:text-sm">
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasUpperLower
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-xs sm:text-sm">
                        Uppercase and lowercase letters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-xs sm:text-sm">
                        At least one number
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Password Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-gradient-red hover:bg-gradient-red-hover text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">
                      Updating Password...
                    </span>
                    <span className="sm:hidden">Updating...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Update Password</span>
                    <span className="sm:hidden">Update</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
