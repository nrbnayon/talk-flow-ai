"use client";
import { usersData } from "@/data/usersData";
import { UserRole, User } from "@/types/user";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { TableActions } from "@/components/Dashboard/Shared/TableActions";

interface UsersTableProps {
  limit?: number;
  filter?: "All" | UserRole;
  showPagination?: boolean;
  searchQuery?: string;
  isLoading?: boolean;
}

export function UsersTable({
  limit,
  filter = "All",
  showPagination = false,
  searchQuery = "",
  isLoading = false,
}: UsersTableProps) {
  const [allUsers] = useState<User[]>(usersData);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = allUsers.filter((u) => {
    // 1. Filter by role
    if (filter !== "All" && u.role !== filter) return false;

    // 2. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.address.toLowerCase().includes(query) ||
        (u.claimTitle && u.claimTitle.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Reset page when filter or search changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [filter, searchQuery]);

  const itemsPerPage = limit || 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const displayUsers = showPagination
    ? filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : limit
    ? filteredUsers.slice(0, limit)
    : filteredUsers;

  return (
    <div className="bg-gray rounded-b-xl shadow-none overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead
            className="text-lg text-foreground uppercase"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF -103.51%, #1E1E1E 100%)",
            }}
          >
            <tr>
              <th className="px-5 py-2 font-medium">Claimant</th>
              <th className="px-5 py-2 font-medium">Claim Title</th>
              <th className="px-5 py-2 font-medium">Email</th>
              <th className="px-5 py-2 font-medium">Phone</th>
              <th className="px-5 py-2 font-medium">Address</th>
              <th className="px-5 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{
              borderImageSource:
                "linear-gradient(180deg, #FFFFFF -103.51%, #1E1E1E 100%)",
              borderImageSlice: 1,
            }}
          >
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="p-5">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="p-5">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="p-5">
                    <Skeleton className="h-4 w-36" />
                  </td>
                  <td className="p-5">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-5">
                    <Skeleton className="h-4 w-48" />
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </td>
                </tr>
              ))
            ) : displayUsers.length > 0 ? (
              displayUsers.map((user, idx) => (
                <tr
                  key={`${user.id}-${idx}`}
                  className="hover:bg-gray-500 transition-colors"
                >
                  <td className="p-5 font-medium text-foreground">
                    {user.name}
                  </td>
                  <td className="p-5 text-foreground">
                    {user.claimTitle || "-"}
                  </td>
                  <td className="p-5 text-foreground">{user.email}</td>
                  <td className="p-5 text-foreground">{user.phone}</td>
                  <td className="p-5 text-foreground">{user.address}</td>
                  <td className="p-5">
                    <TableActions email={user.email} phone={user.phone} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-foreground">
                  No users found matching &ldquo;{searchQuery}&ldquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
