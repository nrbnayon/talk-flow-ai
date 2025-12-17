// components/Dashboard/Upload/UploadsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";

import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Upload, UploadStatus, UploadType } from "@/types/uploads";
import { UploadsService } from "@/data/uploads";

const ITEMS_PER_PAGE = 7;

const StatusBadge = ({ status }: { status: UploadStatus }) => {
  const styles: Record<UploadStatus, string> = {
    Draft:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Published:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <span
      className={cn(
        "px-2 pb-1 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
};

interface UploadsClientProps {
  filterType?: UploadType;
}

export function UploadsClient({ filterType }: UploadsClientProps) {
  const router = useRouter();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUploads = async () => {
    setIsLoading(true);
    try {
      const data = await UploadsService.getAll();
      setUploads(data);
    } catch (error) {
      console.error("Failed to fetch uploads", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const base = filterType
    ? uploads.filter((item) => item.type === filterType)
    : uploads;

  const filtered = base.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRowClick = (id: string) => {
    router.push(`/upload/${id}`);
  };

  const handleAddBook = () => {
    router.push("/upload/new?book");
  };
  const handleAddContent = () => {
    router.push("/upload/new?content");
  };

  const handleToggleStatus = async (
    e: React.MouseEvent,
    id: string,
    currentStatus: UploadStatus
  ) => {
    e.stopPropagation();
    const nextStatus: UploadStatus =
      currentStatus === "Draft" ? "Published" : "Draft";

    // Optimistic update
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u))
    );

    try {
      await UploadsService.updateStatus(id, nextStatus);
    } catch (error) {
      console.error("Failed to update upload status", error);
      // Revert by refetching
      fetchUploads();
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary dark:text-gray-50">
            Uploads
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddBook}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <HugeiconsIcon
                icon={PlusSignSquareIcon}
                size={20}
                strokeWidth={1}
              />
              Add Book
            </button>
            <button
              onClick={handleAddContent}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <HugeiconsIcon
                icon={PlusSignSquareIcon}
                size={20}
                strokeWidth={1}
              />
              Add Content
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
            <input
              type="text"
              placeholder="Search uploads..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 text-primary placeholder-gray-500 h-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Title
                </th>
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Type
                </th>
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Created
                </th>
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Status
                </th>
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <td className="p-5">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="p-5">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-5">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="p-5">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-5">
                      <Skeleton className="h-4 w-24" />
                    </td>
                  </tr>
                ))
              ) : currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="p-5 font-medium text-primary">
                      {item.title}
                    </td>
                    <td className="p-5 text-secondary dark:text-gray-400">
                      {item.type}
                    </td>
                    <td className="p-5 text-secondary dark:text-gray-400">
                      {item.createdAt}
                    </td>
                    <td className="p-5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-5">
                      <div
                        className="flex items-center gap-4 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) =>
                            handleToggleStatus(e, item.id, item.status)
                          }
                          className="text-[#027A48] hover:text-[#026aa2] dark:text-green-400 dark:hover:text-green-300 transition-colors cursor-pointer hover:bg-green-100 p-1 rounded"
                        >
                          {item.status === "Draft" ? "Publish" : "Unpublish"}
                        </button>
                        <button
                          onClick={() => handleRowClick(item.id)}
                          className="text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:bg-blue-50 p-1 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-secondary dark:text-gray-400"
                  >
                    No uploads found
                  </td>
                </tr>
              )}
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
    </>
  );
}
