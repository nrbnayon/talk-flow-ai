"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/Dashboard/Shared/Badge";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Donation {
  id: string;
  projectName: string;
  date: string;
  location: {
    city: string;
    state: string;
  };
  leader: string;
  donor: string;
  amount: string;
  status: "Active" | "Pending";
}

const MOCK_DATA: Donation[] = [
  {
    id: "Don-AX93K7",
    projectName: "Mwati Village",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Phoenix Baker",
    donor: "Andi Lane",
    amount: "$2,800",
    status: "Active",
  },
  {
    id: "Don-AX93K7",
    projectName: "Kitui Hills",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Drew cano",
    donor: "Kate Morrison",
    amount: "$3,500",
    status: "Pending",
  },
  {
    id: "Don-AX93K7",
    projectName: "Kasama Town",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Phoenix Baker",
    donor: "Andi Lane",
    amount: "$1,800",
    status: "Active",
  },
  {
    id: "Don-AX93K7",
    projectName: "Mwati Village",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Drew cano",
    donor: "Kate Morrison",
    amount: "$2,800",
    status: "Pending",
  },
  {
    id: "Don-AX93K7",
    projectName: "Kitui Hills",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Phoenix Baker",
    donor: "Andi Lane",
    amount: "$3,500",
    status: "Active",
  },
  {
    id: "Don-AX93K7",
    projectName: "Kasama Town",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Drew cano",
    donor: "Kate Morrison",
    amount: "$1,800",
    status: "Pending",
  },
  {
    id: "Don-AX93K7",
    projectName: "Mwati Village",
    date: "Jan 6, 2025",
    location: { city: "Overland Park", state: "KS" },
    leader: "Phoenix Baker",
    donor: "Andi Lane",
    amount: "$2,600",
    status: "Active",
  },
];

export function DonationsClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 7;

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = MOCK_DATA.filter(
    (item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-primary mb-3">Donations</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white  text-primary  placeholder-gray-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-b-lg">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                ID
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Project name
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Date
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Location
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Leader
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Donor
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Amount
              </th>
              <th className="p-5 font-medium text-secondary dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index} className="bg-white ">
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                  </tr>
                ))
              : currentData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white  hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-5 py-4 text-secondary dark:text-gray-400">
                      {item.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-primary ">
                      {item.projectName}
                    </td>
                    <td className="px-5 py-4 text-secondary dark:text-gray-400">
                      {item.date}
                    </td>
                    <td className="px-5 py-4 text-secondary dark:text-gray-400">
                      <div className="flex flex-col">
                        <span>
                          {item.location.city}, {item.location.state}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-primary dark:text-blue-400">
                      {item.leader}
                    </td>
                    <td className="px-5 py-4 text-secondary dark:text-gray-400">
                      {item.donor}
                    </td>
                    <td className="px-5 py-4 text-primary ">{item.amount}</td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          item.status.toLowerCase() === "active"
                            ? "active"
                            : "pending"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={isLoading ? 1 : totalPages}
        onPageChange={setCurrentPage}
        className="border-t border-gray-200 dark:border-gray-700"
      />
    </div>
  );
}
