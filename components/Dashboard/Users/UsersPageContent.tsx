"use client";

import { UsersTable } from "@/components/Dashboard/Users/UsersTable";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import DashboardHeader from "../Shared/DashboardHeader";
import { useState, useEffect } from "react";

export function UsersPageContent() {
  const pathname = usePathname();
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
  let filter: "All" | "Leader" | "Donor" = "All";
  if (pathname.includes("/leader")) filter = "Leader";
  if (pathname.includes("/donor")) filter = "Donor";

  const tabs = [
    { name: "All", href: "/users" },
    { name: "Leader", href: "/users/leader" },
    { name: "Donor", href: "/users/donor" },
  ];

  return (
    <>
      <DashboardHeader
        title="Our Users"
        description="Track, manage and forecast your customers and Donations."
      />
      <div className="p-4 md:p-8 w-full mx-auto">
        <div className="bg-white rounded-xl shadow-xs border border-[#E9EAEB]">
          <h2 className="text-lg font-semibold text-primary p-5">User</h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pb-4">
            {/* Tabs */}
            <div className="flex bg-gray-50 dark:bg-gray-700/50 p-1 rounded-lg">
              {tabs.map((tab) => {
                const isActive =
                  pathname === tab.href ||
                  (tab.href === "/users" && pathname === "/users");
                const active =
                  (tab.name === "All" && pathname === "/users") ||
                  (tab.name === "Leader" && pathname.includes("/leader")) ||
                  (tab.name === "Donor" && pathname.includes("/donor"));

                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all",
                      active
                        ? "bg-[#FBECEB] text-primary dark:bg-gray-800 dark:text-white shadow-none"
                        : "text-secondary dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    )}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-900/50"
              />
            </div>
          </div>

          <UsersTable
            limit={7}
            filter={filter}
            showPagination={true}
            searchQuery={searchQuery}
            isLoading={isSearching}
          />
        </div>
      </div>
    </>
  );
}
