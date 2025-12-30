"use client";

import { useState } from "react";
import DashboardHeader from "../Shared/DashboardHeader";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function SettingsPageContent() {
  const [accountData, setAccountData] = useState({
    email: "example@gmail.com",
    phone: "000-0000-000",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Account Handlers
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast.success("Account information updated successfully");
    }, 500);
  };

  // Security Handlers
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!securityData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Password updated successfully");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 500);
  };

  return (
    <>
      <DashboardHeader
        title="Admin Dashboard"
        description="Welcome back! Here's an overview of your platform."
      />

      <div className="p-4 md:p-8 w-full w-full mx-auto space-y-8">
        
        {/* Account Information Section */}
        <div className="bg-[#1A1C20] rounded-xl p-8 shadow-sm border border-gray-800">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Account Information</h2>
            <p className="text-sm text-gray-400 mt-1">Update your account details</p>
          </div>

          <form onSubmit={handleAccountSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={accountData.email}
                onChange={handleAccountChange}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={accountData.phone}
                onChange={handleAccountChange}
                placeholder="000-0000-000"
                className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-[#1A1C20] rounded-xl p-8 shadow-sm border border-gray-800">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="text-sm text-gray-400 mt-1">Manage password and security settings</p>
          </div>

          <form onSubmit={handleSecuritySubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  placeholder="Enter New Password"
                  className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  placeholder="Re-enter Password"
                  className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
