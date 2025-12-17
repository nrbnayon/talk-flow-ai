// components\Dashboard\Profile\ProfileClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  name: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
}

const MOCK_USER: UserProfile = {
  name: "Jhon Smith",
  fullName: "Danial Pagla Smith",
  email: "danialpagla556@gmail.com",
  role: "Super Admin",
};

export default function ProfileClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [editNameValue, setEditNameValue] = useState(user.fullName);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setEditNameValue(MOCK_USER.fullName);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveName = () => {
    if (!editNameValue.trim()) {
      toast.error("Name is required", {
        description: "Please enter a valid name.",
      });
      return;
    }

    if (editNameValue.length > 32) {
      toast.error("Name too long", {
        description: "Name must be 32 characters or less.",
      });
      return;
    }

    setUser({ ...user, name: editNameValue.split(" ")[0] || editNameValue, fullName: editNameValue });
    setIsEditingName(false);
    setHasChanges(true);
    toast.success("Name updated", {
      description: "Your name has been updated successfully.",
    });
  };

  const handleCancelName = () => {
    setEditNameValue(user.fullName);
    setIsEditingName(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error("All fields required", {
        description: "Please fill in all password fields.",
      });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      toast.error("Passwords don't match", {
        description: "New password and confirmation must match.",
      });
      return;
    }

    if (passwordData.new.length < 8) {
      toast.error("Password too short", {
        description: "Password must be at least 8 characters.",
      });
      return;
    }

    setIsEditingPassword(false);
    setPasswordData({ current: "", new: "", confirm: "" });
    setHasChanges(true);
    toast.success("Password changed", {
      description: "Your password has been updated successfully.",
    });
  };

  const handleCancelPassword = () => {
    setPasswordData({ current: "", new: "", confirm: "" });
    setIsEditingPassword(false);
  };

  const handleGlobalSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Profile saved", {
        description: "All changes have been saved successfully.",
      });
      setHasChanges(false);
    } catch (error) {
      toast.error("Failed to save", {
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGlobalCancel = () => {
    if (hasChanges) {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (!confirm) return;
    }
    
    // Reset all editing states
    setIsEditingName(false);
    setIsEditingPassword(false);
    setEditNameValue(user.fullName);
    setPasswordData({ current: "", new: "", confirm: "" });
    setHasChanges(false);
    
    toast.info("Changes discarded", {
      description: "All unsaved changes have been discarded.",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {user.role}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track, manage and forecast your customers and Donations.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleGlobalCancel}
            disabled={isSaving}
            className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGlobalSave}
            disabled={isSaving || !hasChanges}
            className="bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        {/* User Info Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-700">
            <Image 
              src={user.avatar || "/images/avatar.png"}
              alt="Profile"
              width={72}
              height={72}
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=72`;
              }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your username and manage your account
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Section Title */}
          <div className="w-full md:w-48 shrink-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-50">
              Account Settings
            </h3>
          </div>

          {/* Form Fields */}
          <div className="flex-1 flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
            {/* Name Field */}
            <div className="py-6 first:pt-0">
              <div className="flex justify-between items-start gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Your name
                  </label>
                  
                  {isEditingName ? (
                    <div className="mt-3 max-w-lg bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Make sure this match the name on your any gov. ID.
                      </p>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Full name
                        </label>
                        <Input
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                          placeholder="Enter your full name"
                          maxLength={32}
                        />
                        <div className="text-right text-xs text-gray-400">
                          text limit {editNameValue.length}/32
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCancelName}
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveName}
                          className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      {user.fullName}
                    </div>
                  )}
                </div>

                {!isEditingName && (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-semibold text-sm transition-colors mt-1"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="py-6">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <div className="text-gray-700 dark:text-gray-300">
                    {showEmail ? user.email : user.email.replace(/(.{3})(.*)(@.*)/, "$1***$3")}
                  </div>
                </div>
                <button 
                  onClick={() => setShowEmail(!showEmail)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-semibold text-sm transition-colors"
                >
                  {showEmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showEmail ? "Hide" : "View"}
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="py-6">
              <div className="flex justify-between items-start gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                  </label>
                  
                  {isEditingPassword ? (
                    <div className="mt-3 max-w-lg bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Current password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.current}
                          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          New password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.new}
                          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Confirm new password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="showPassword"
                          checked={showPassword}
                          onChange={(e) => setShowPassword(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="showPassword" className="text-xs text-gray-600 dark:text-gray-400">
                          Show passwords
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCancelPassword}
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleChangePassword}
                          className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700 dark:text-gray-300 text-xl leading-none tracking-widest mt-1">
                      ••••••••••••••••
                    </div>
                  )}
                </div>

                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-semibold text-sm transition-colors mt-1"
                  >
                    <Pencil className="w-4 h-4" /> Change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}