"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmationModal } from "@/components/Dashboard/Shared/ConfirmationModal";
import { cn } from "@/lib/utils";
import { MOCK_DATA } from "@/data/leader-request";
import { Request } from "@/types/leader-request";
import { toast } from "sonner";

type RequestStatus = "Pending" | "Approved" | "Declined";

interface RequestWithStatus extends Request {
  status: RequestStatus;
}

interface LeaderRequestClientProps {
  onApproveAll?: () => void;
  onDeclineAll?: () => void;
}

export function LeaderRequestClient({
  onApproveAll,
  onDeclineAll,
}: LeaderRequestClientProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<RequestWithStatus[]>([]);
  const itemsPerPage = 7;

  // Confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: "Approve" | "Decline";
  } | null>(null);

  // Confirmation state for bulk actions
  const [confirmBulkOpen, setConfirmBulkOpen] = useState(false);
  const [pendingBulkAction, setPendingBulkAction] = useState<
    "ApproveAll" | "DeclineAll" | null
  >(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Initialize requests with Pending status if not already set
      const initialRequests = MOCK_DATA.map((item) => ({
        ...item,
        status: (item.status || "Pending") as RequestStatus,
      }));
      setRequests(initialRequests);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Expose approve all and decline all functions to parent
  useEffect(() => {
    if (onApproveAll) {
      (window as any).handleApproveAll = initiateBulkApprove;
    }
    if (onDeclineAll) {
      (window as any).handleDeclineAll = initiateBulkDecline;
    }
  }, [requests, onApproveAll, onDeclineAll]);

  const filteredData = requests.filter(
    (item) =>
      item.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (id: string) => {
    router.push(`/leader-request/${id}`);
  };

  const initiateAction = (
    e: React.MouseEvent,
    type: "Approve" | "Decline",
    id: string
  ) => {
    e.stopPropagation();
    setPendingAction({ id, type });
    setConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    const { id, type } = pendingAction;
    const status: RequestStatus = type === "Approve" ? "Approved" : "Declined";

    try {
      // Update the request status
      setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));

      toast.success(`Request ${type.toLowerCase()}d successfully`, {
        description: `The leader request has been ${type.toLowerCase()}d.`,
      });

      console.log(`${type} request ${id}`);
    } catch (error) {
      toast.error(`Failed to ${type.toLowerCase()} request`, {
        description: "Please try again.",
      });
    }

    setPendingAction(null);
  };

  const initiateBulkApprove = () => {
    setPendingBulkAction("ApproveAll");
    setConfirmBulkOpen(true);
  };

  const initiateBulkDecline = () => {
    setPendingBulkAction("DeclineAll");
    setConfirmBulkOpen(true);
  };

  const handleConfirmBulkAction = () => {
    if (!pendingBulkAction) return;

    try {
      if (pendingBulkAction === "ApproveAll") {
        const pendingCount = requests.filter(
          (r) => r.status === "Pending"
        ).length;
        setRequests(
          requests.map((r) => ({ ...r, status: "Approved" as RequestStatus }))
        );

        toast.success("All requests approved successfully", {
          description: `${pendingCount} request(s) have been approved.`,
        });

        console.log("Approved all requests");
      } else if (pendingBulkAction === "DeclineAll") {
        const pendingCount = requests.filter(
          (r) => r.status === "Pending"
        ).length;
        setRequests(
          requests.map((r) => ({ ...r, status: "Declined" as RequestStatus }))
        );

        toast.success("All requests declined successfully", {
          description: `${pendingCount} request(s) have been declined.`,
        });

        console.log("Declined all requests");
      }
    } catch (error) {
      toast.error("Failed to process bulk action", {
        description: "Please try again.",
      });
    }

    setPendingBulkAction(null);
  };

  const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const styles = {
      Pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      Approved:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      Declined: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
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

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-primary mb-3">
            Leader Request
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-primary  placeholder-gray-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-lg">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200">
                <th className="p-5 font-medium text-secondary dark:text-gray-400">
                  Leader
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
                  Amount
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
              {isLoading
                ? Array.from({ length: 7 }).map((_, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="px-5 py-4 flex gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </td>
                    </tr>
                  ))
                : currentData.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      className="bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-4 text-primary">{item.leader}</td>
                      <td className="px-5 py-4 font-medium text-primary">
                        {item.projectName}
                      </td>
                      <td className="px-5 py-4 text-secondary">{item.date}</td>
                      <td className="px-5 py-4 text-secondary">
                        {item.location}
                      </td>
                      <td className="px-5 py-4 text-primary">{item.amount}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className="flex items-center gap-4 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.status !== "Approved" && (
                            <button
                              onClick={(e) =>
                                initiateAction(e, "Approve", item.id)
                              }
                              className="text-[#027A48] hover:text-[#026aa2] transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {item.status !== "Declined" && (
                            <button
                              onClick={(e) =>
                                initiateAction(e, "Decline", item.id)
                              }
                              className="text-[#B42318] hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
                            >
                              Decline
                            </button>
                          )}
                        </div>
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
          className="border-t border-gray-200"
        />
      </div>

      {/* Single Request Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAction}
        title={`${pendingAction?.type} Request?`}
        message={`Are you sure you want to ${pendingAction?.type.toLowerCase()} this leader request? This action can be reversed, but notifies permissions.`}
        confirmText={pendingAction?.type}
        isDestructive={pendingAction?.type === "Decline"}
      />

      {/* Bulk Action Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmBulkOpen}
        onClose={() => setConfirmBulkOpen(false)}
        onConfirm={handleConfirmBulkAction}
        title={
          pendingBulkAction === "ApproveAll"
            ? "Approve All Requests?"
            : "Decline All Requests?"
        }
        message={`Are you sure you want to ${
          pendingBulkAction === "ApproveAll" ? "approve" : "decline"
        } all leader requests? This action can be reversed, but notifies permissions.`}
        confirmText={
          pendingBulkAction === "ApproveAll" ? "Approve All" : "Decline All"
        }
        isDestructive={pendingBulkAction === "DeclineAll"}
      />
    </>
  );
}
