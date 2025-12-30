"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { X } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, "id">) => void;
}

export function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    claimTitle: "",
    email: "",
    phone: "",
    address: "",
    role: "user" as const,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onAddUser(formData);

    // Reset form
    setFormData({
      name: "",
      claimTitle: "",
      email: "",
      phone: "",
      address: "",
      role: "user",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-[#1A1C20] rounded-lg shadow-2xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 ">
          <h2 className="text-xl font-semibold text-white">Add User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Claim Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Claim Title
            </label>
            <input
              type="text"
              name="claimTitle"
              value={formData.claimTitle}
              onChange={handleChange}
              placeholder="Scholarship Claim"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="000-0000-000"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="46 Rd, Birmingham, UK"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-700 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-white hover:bg-gray-100 text-gray-900 text-sm font-medium rounded-sm transition-colors"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
