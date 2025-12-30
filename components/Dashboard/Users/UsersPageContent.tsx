"use client";

import { UsersTable } from "@/components/Dashboard/Users/UsersTable";
import { Search, Plus } from "lucide-react";
import DashboardHeader from "../Shared/DashboardHeader";
import { useState, useEffect } from "react";

export function UsersPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce/simulate search delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Determine filter based on pathname
  return (
    <>
      <DashboardHeader
        title="User Management"
        description="Manage user accounts and permissions"
      />
      <div className="p-4 md:p-8 w-full mx-auto">
        <div className="bg-gray rounded-xl shadow-xs p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">User List</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-purple text-white text-sm font-medium rounded-sm transition-colors cursor-pointer hover:opacity-90">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4  py-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-7xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#0A0E14] rounded-lg focus:outline-none focus:border-blue-500 "
              />
            </div>
          </div>

          <UsersTable
            limit={10}
            showPagination={true}
            searchQuery={searchQuery}
            isLoading={isSearching}
          />
        </div>
      </div>
    </>
  );
}
