"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../Shared/DashboardHeader";
import { StatsCard } from "../Shared/StatsCard";
import { AICallsList } from "./AICallsList";
import { ScheduleCallModal } from "./ScheduleCallModal";
import { CallDetailsModal } from "./CallDetailsModal";
import { ConfirmationModal } from "../Shared/ConfirmationModal";
import { aiCallsData, IAICall } from "@/data/aiCallsData";
import { toast } from "sonner";
import {
    Time01Icon,
    Tick01Icon,
    Cancel01Icon,
    AnalyticsUpIcon,
} from "@hugeicons/core-free-icons";

export function AIInteractionPageContent() {
  const [calls, setCalls] = useState<IAICall[]>(aiCallsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<IAICall | null>(null); // For View details
  const [deleteId, setDeleteId] = useState<string | null>(null); // For Delete confirmation

  // Stats
  const stats = [
    {
      label: "Total Scheduled Calls",
      value: "1,284",
      trend: 8.5,
      icon: Time01Icon,
    },
    {
      label: "Completed Calls",
      value: "1,189",
      trend: 8.5,
      icon: Tick01Icon,
    },
    {
      label: "Failed Calls",
      value: "11",
      trend: 8.5,
      icon: Cancel01Icon,
    },
    {
      label: "Success Rate",
      value: "87%",
      trend: 8.5,
      icon: AnalyticsUpIcon,
    },
  ];

  /* Handlers */
  const handleScheduleCall = (newCallData: Omit<IAICall, "id" | "status">) => {
    const newCall: IAICall = {
      id: String(calls.length + 1 + Math.random()),
      status: "Scheduled",
      ...newCallData,
    };
    setCalls([newCall, ...calls]);
    toast.success("Call scheduled successfully");
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setCalls((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success("Call deleted");
      setDeleteId(null);
    }
  };

  const handleViewClick = (call: IAICall) => {
    setSelectedCall(call);
  };

  return (
    <>
      <DashboardHeader
        title="AI Assistant"
        description="Schedule and manage automated customer follow-up calls"
      />

      <div className="p-4 md:p-8 w-full mx-auto space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendLabel="Up from last month"
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Calls List */}
        <AICallsList
          calls={calls}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
          onScheduleClick={() => setIsScheduleModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <ScheduleCallModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleCall}
      />

      <CallDetailsModal
        isOpen={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        call={selectedCall}
      />

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Scheduled Call"
        message="Are you sure you want to delete this scheduled call? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
