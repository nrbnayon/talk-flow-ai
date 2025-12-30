"use client";

import { useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import { IAICall } from "@/data/aiCallsData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (call: Omit<IAICall, "id" | "status">) => void;
}

export function ScheduleCallModal({
  isOpen,
  onClose,
  onSchedule,
}: ScheduleCallModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    relatedClaim: "Select claim",
    callType: "Follow Up",
    priority: "High" as "High" | "Medium" | "Low",
    scheduledDate: "",
    scheduledTime: "5:00 PM",
    script: "",
    autoRetry: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      autoRetry: !prev.autoRetry,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.scheduledDate || !formData.script) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSchedule({
      customerName: formData.customerName,
      phoneNumber: "+1 (555) 000-0000", // Mock phone
      type: formData.callType,
      claimId: formData.relatedClaim === "Select claim" ? "General" : formData.relatedClaim,
      priority: formData.priority,
      purpose: formData.script, // Using script as purpose for list view
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      script: formData.script,
      autoRetry: formData.autoRetry,
    });

    setFormData({
      customerName: "",
      relatedClaim: "Select claim",
      callType: "Follow Up",
      priority: "High",
      scheduledDate: "",
      scheduledTime: "5:00 PM",
      script: "",
      autoRetry: true,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-[#1A1C20] rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white">Schedule AI Call</h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure an automated call to a customer
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <form id="schedule-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Select Customer"
                  className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                />
              </div>

              {/* Related Claim */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Related Claim
                </label>
                <div className="relative">
                  <select
                    name="relatedClaim"
                    value={formData.relatedClaim}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none border border-transparent cursor-pointer"
                  >
                    <option disabled>Select claim</option>
                    <option value="CF-2847">CF-2847</option>
                    <option value="CF-9921">CF-9921</option>
                    <option value="CF-3321">CF-3321</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Call Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Call Type
                </label>
                <div className="relative">
                  <select
                    name="callType"
                    value={formData.callType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none border border-transparent cursor-pointer"
                  >
                    <option value="Follow Up">Follow Up</option>
                    <option value="Reminder">Reminder</option>
                    <option value="Survey">Survey</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Priority
                </label>
                <div className="relative">
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none border border-transparent cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Scheduled Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Scheduled Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 border border-transparent [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              {/* Scheduled Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Scheduled Time
                </label>
                <div className="relative">
                  <select
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none border border-transparent cursor-pointer"
                  >
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* AI Script / Purpose */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                AI Script / Purpose
              </label>
              <textarea
                name="script"
                value={formData.script}
                onChange={handleChange}
                placeholder="What should the AI assistant discuss with the customer?"
                rows={4}
                className="w-full px-4 py-3 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-transparent resize-none"
              />
            </div>

            {/* Auto-retry Toggle */}
            <div className="flex items-center justify-between p-1">
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Auto-retry on failure
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Automatically retry up to 3 times if call fails
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative",
                  formData.autoRetry ? "bg-blue-600" : "bg-gray-600"
                )}
              >
                <span
                  className={cn(
                    "block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out absolute top-0.5 left-0.5",
                    formData.autoRetry ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end gap-3 rounded-b-xl bg-[#1A1C20]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#2D2F36] hover:bg-[#3D3F46] text-white text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="schedule-form"
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
