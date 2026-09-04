// src\app\(auth)\components\LoginForm.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginValidationSchema } from "@/lib/formDataValidation";
import Link from "next/link";
import { Mail } from "lucide-react";

type LoginFormData = z.infer<typeof loginValidationSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo credentials are intentionally available in the deployed demo.
      const isDemoLogin =
        data.email === "admin@gmail.com" && data.password === "admin123";

      if (isDemoLogin) {
        // Set the demo session cookies used by the proxy.
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        const expiresString = expires.toUTCString();

        // Set cookies
        document.cookie = `accessToken=dev-admin-token; expires=${expiresString}; path=/; SameSite=Lax`;
        document.cookie = `refreshToken=dev-refresh-token; expires=${expiresString}; path=/; SameSite=Lax`;
        document.cookie = `userRole=admin; expires=${expiresString}; path=/; SameSite=Lax`;

        // Also set in localStorage for consistency
        localStorage.setItem("accessToken", "dev-admin-token");
        localStorage.setItem("refreshToken", "dev-refresh-token");
        localStorage.setItem("userRole", "admin");

        toast.success("Login successful!", {
          description: `Welcome back, ${data.email}!`,
          duration: 2000,
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid credentials", {
          description: "Use the demo admin email and password to continue.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-primary">
      {/* Right Side - Login Form */}
      <div className="flex-1 bg-primary flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl lg:rounded-4xl border-none shadow-none bg-white ">
          <div className="w-full flex justify-center items-center mb-4">
            <Image
              src="/images/logo.jpeg"
              alt="logo"
              width={1000}
              height={1000}
              className="w-25 h-25 md:w-50 md:h-50 rounded-2xl"
            />
          </div>
          <CardHeader className="text-center">
            <h2 className="text-lg sm:text-2xl text-primary font-bold">
              Welcome Back!
            </h2>
          </CardHeader>
          <CardHeader className="text-center">
            <h2 className="text-lg text-primary/80 font-medium">
              Enter your email and password to access your account.
            </h2>
          </CardHeader>

          <div className="px-2 sm:px-4 lg:px-6">
            <form
              className="space-y-4 sm:space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-primary text-sm sm:text-base font-semibold"
                >
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    className={`pl-4 pr-10 h-10 sm:h-12 rounded-md shadow-none text-sm sm:text-base text-primary placeholder:text-secondary ${
                      errors.email
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                {errors.email && (
                  <p className="text-error text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-primary text-sm sm:text-base font-semibold block"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-4 pr-10 h-10 sm:h-12 rounded-md shadow-none text-sm sm:text-base text-primary placeholder:text-secondary ${
                      errors.password
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-error text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <span className="text-xs text-primary/50">Demo access available</span>
                <Link
                  href="/forgot-password"
                  className="text-red font-semibold text-xs sm:text-sm hover:text-red hover:underline transition-colors text-center sm:text-right"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-gradient-red hover:bg-gradient-red-hover text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-14 w-full rounded-md border-2 border-[#d53f33] text-base font-bold text-[#d53f33] transition hover:bg-[#d53f33] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  setValue("email", "admin@gmail.com");
                  setValue("password", "admin123");
                  void onSubmit({
                    email: "admin@gmail.com",
                    password: "admin123",
                    rememberMe: false,
                  });
                }}
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? "Signing in as admin..." : "One-click Demo Admin Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
