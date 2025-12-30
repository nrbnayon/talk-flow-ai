"use client";

import { X, Calendar, Clock } from "lucide-react";
import { IAICall } from "@/data/aiCallsData";
import { Call02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: IAICall | null;
}

export function CallDetailsModal({
  isOpen,
  onClose,
  call,
}: CallDetailsModalProps) {
  if (!isOpen || !call) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-[#1A1C20] rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Call details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* content */}
        <div className="p-6">
          {/* User Info Row */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#2A2D35] flex items-center justify-center text-gray-400 text-lg font-medium shrink-0">
              {call.customerName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-white font-medium">{call.customerName}</h3>
                <span className="text-gray-400 text-sm">{call.phoneNumber}</span>
              </div>
              <div className="flex gap-2 mt-2">
                 <span className="px-2 py-0.5 rounded text-xs bg-[#2A2D35] text-gray-300 border border-gray-700">
                    Scheduled
                 </span>
                 <span className="px-2 py-0.5 rounded text-xs bg-[#2A2D35] text-gray-300 border border-gray-700">
                    {call.type}
                 </span>
              </div>
            </div>
          </div>

           {/* Details Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <div className="bg-[#0A0E14] p-4 rounded-lg">
                   <p className="text-gray-400 text-xs mb-1">Related Claim</p>
                   <p className="text-white text-sm font-medium">{call.claimId || "-"}</p>
               </div>
               <div className="bg-[#0A0E14] p-4 rounded-lg">
                   <p className="text-gray-400 text-xs mb-1">Priority</p>
                   <p className="text-white text-sm font-medium">{call.priority}</p>
               </div>
               <div className="bg-[#0A0E14] p-4 rounded-lg relative">
                   <p className="text-gray-400 text-xs mb-1">Scheduled Date</p>
                   <div className="flex justify-between items-center">
                       <p className="text-white text-sm font-medium">{call.scheduledDate}</p>
                       <Calendar className="w-4 h-4 text-gray-500" />
                   </div>
               </div>
               <div className="bg-[#0A0E14] p-4 rounded-lg relative">
                   <p className="text-gray-400 text-xs mb-1">Scheduled Time</p>
                   <div className="flex justify-between items-center">
                        <p className="text-white text-sm font-medium">{call.scheduledTime}</p>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                   </div>
               </div>
           </div>

           {/* Script */}
           <div className="mb-8">
               <p className="text-sm font-medium text-gray-300 mb-2">AI Script / Purpose</p>
               <div className="bg-[#0A0E14] p-4 rounded-lg text-sm text-gray-300 min-h-[80px]">
                   {call.purpose || call.script || "No script provided."}
               </div>
           </div>

           {/* Footer Buttons */}
           <div className="flex gap-3 justify-end">
               <button 
                  className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-colors"
                >
                   <HugeiconsIcon icon={Call02Icon} size={16} />
                   Start Call Now
               </button>
               <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2D2F36] hover:bg-[#3D3F46] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
           </div>
        </div>

      </div>
    </div>
  );
}

// Icon helper
function ChevronDown({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m6 9 6 6 6-6"/>
        </svg>
    )
}
