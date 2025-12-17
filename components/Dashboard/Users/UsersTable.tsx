"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Dashboard/Shared/Badge";
import { Trash2 } from "lucide-react";
import { usersData } from "@/data";
import { UserType, User } from "@/types";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/components/Dashboard/Shared/DeleteConfirmationModal";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { useEffect } from "react";

interface UsersTableProps {
  limit?: number;
  filter?: "All" | UserType;
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
  const [allUsers, setAllUsers] = useState<User[]>(usersData);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = allUsers.filter((u) => {
    // 1. Filter by Type
    if (filter !== "All" && u.type !== filter) return false;

    // 2. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Reset page when filter or search changes
  useEffect(() => {
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

  const handleDelete = async () => {
    if (userToDelete) {
      setIsDeleting(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAllUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast.success("User deleted successfully");

      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-none border border-[#FAFAFA] dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-secondary dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 uppercase">
            <tr>
              <th className="p-5 font-medium">Name</th>
              <th className="p-5 font-medium">Email address</th>
              <th className="p-5 font-medium">Joining Date</th>
              <th className="p-5 font-medium">Location</th>
              <th className="p-5 font-medium">User type</th>
              <th className="p-5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-8 w-8" />
                  </td>
                </tr>
              ))
            ) : displayUsers.length > 0 ? (
              displayUsers.map((user, idx) => (
                <tr
                  key={`${user.id}-${idx}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-5">
                    <Link
                      href={`/users/${user.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {user.name.charAt(0)}
                            {user.name.split(" ")[1]?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-primary dark:text-white group-hover:text-blue-600 transition-colors">
                        {user.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-secondary dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-secondary dark:text-gray-400">
                    {user.date}
                  </td>
                  <td className="px-6 py-4 text-secondary dark:text-gray-400">
                    {user.location}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.type.toLowerCase() as any}>
                      {user.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUserToDelete(user);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2 rounded-sm hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      <Trash2 className="w-4 h-4 text-red" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-secondary dark:text-gray-400"
                >
                  No users found matching "{searchQuery}"
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
      <DeleteConfirmationModal
        isOpen={!!userToDelete}
        onClose={() => !isDeleting && setUserToDelete(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete User"
        description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
