"use client";

import { IAICall } from "@/data/aiCallsData";
import { useState } from "react";
import { Search, Eye, Trash2, Calendar, Plus } from "lucide-react";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { cn } from "@/lib/utils";

interface AICallsListProps {
  calls: IAICall[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  onView: (call: IAICall) => void;
  onScheduleClick: () => void;
}

export function AICallsList({
  calls,
  searchQuery,
  onSearchChange,
  onDelete,
  onView,
  onScheduleClick,
}: AICallsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust based on height

  // Filter
  const filteredCalls = calls.filter((call) =>
    call.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.phoneNumber.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const displayCalls = filteredCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#1A1C20] rounded-xl p-6 min-h-[600px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">AI Call Scheduler</h2>
      </div>

       {/* Search & Action Bar */}
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-[#0A0E14] text-sm text-white border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500"
          />
        </div>
        <button
          onClick={onScheduleClick}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20 whitespace-nowrap"
        >
           <Plus className="w-5 h-5" />
          Schedule a call
        </button>
      </div>

      {/* List */}
      <div className="flex-1 space-y-3">
        {displayCalls.length > 0 ? (
          displayCalls.map((call) => (
            <div
              key={call.id}
              className="bg-[#0A0E14] p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-black/40 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#2A2D35] flex items-center justify-center text-gray-400 text-sm font-medium shrink-0">
                  {call.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-medium text-sm truncate">
                      {call.customerName}
                    </h3>
                    <span className="text-gray-500 text-xs truncate">
                      {call.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                     <span className="px-2 py-0.5 rounded text-[10px] bg-[#2A2D35] text-gray-300 border border-gray-700">
                        {call.type}
                     </span>
                     <span className="px-2 py-0.5 rounded text-[10px] bg-[#2A2D35] text-gray-300 border border-gray-700">
                        {call.priority}
                     </span>
                  </div>
                  <p className="text-gray-400 text-xs truncate">
                      {call.purpose}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-800 pt-3 md:pt-0">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                       <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                           <div className="w-2 h-[1px] bg-gray-400 rotate-90" />
                       </div>
                       {call.scheduledDate} • {call.scheduledTime}
                  </div>
                  
                  <div className="flex items-center gap-2">
                       <button 
                        onClick={() => onView(call)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="View Details"
                       >
                           <Eye className="w-4 h-4" />
                       </button>
                       <button 
                        onClick={() => onDelete(call.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                       >
                           <Trash2 className="w-4 h-4" />
                       </button>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            No calls found matching "{searchQuery}"
          </div>
        )}
      </div>

       {/* Pagination */}
       {totalPages > 1 && (
        <div className="mt-6">
             <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
             />
        </div>
       )}
    </div>
  );
}
