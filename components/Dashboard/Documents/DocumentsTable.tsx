"use client";

import { IDocument } from "@/data/documentsData";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/Dashboard/Shared/Pagination";
import { Download, Trash2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentsTableProps {
  limit?: number;
  showPagination?: boolean;
  searchQuery?: string;
  isLoading?: boolean;
  documents: IDocument[];
  onDelete?: (id: string) => void;
}

export function DocumentsTable({
  limit,
  showPagination = false,
  searchQuery = "",
  isLoading = false,
  documents,
  onDelete,
}: DocumentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      doc.claimant.toLowerCase().includes(query) ||
      doc.documentName.toLowerCase().includes(query) ||
      doc.provider.toLowerCase().includes(query)
    );
  });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const itemsPerPage = limit || 10;
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const displayDocuments = showPagination
    ? filteredDocuments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : limit
    ? filteredDocuments.slice(0, limit)
    : filteredDocuments;

  return (
    <div className="bg-gray rounded-b-xl shadow-none overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead
            className="text-sm text-foreground uppercase font-semibold"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF -103.51%, #1E1E1E 100%)",
            }}
          >
            <tr>
              <th className="px-6 py-4">Claimant</th>
              <th className="px-6 py-4">Document Name</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Signed Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody
            className="divide-y divide-gray-800"
            style={{
              borderImageSource:
                "linear-gradient(180deg, #FFFFFF -103.51%, #1E1E1E 100%)",
              borderImageSlice: 1,
            }}
          >
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse bg-transparent">
                  <td className="p-6">
                    <Skeleton className="h-4 w-32 bg-gray-700" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-4 w-40 bg-gray-700" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-4 w-24 bg-gray-700" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-4 w-36 bg-gray-700" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-6 w-20 rounded-full bg-gray-700" />
                  </td>
                  <td className="p-6">
                    <Skeleton className="h-8 w-16 bg-gray-700" />
                  </td>
                </tr>
              ))
            ) : displayDocuments.length > 0 ? (
              displayDocuments.map((doc, idx) => (
                <tr
                  key={`${doc.id}-${idx}`}
                  className="hover:bg-[#1A1C20] transition-colors border-b border-gray-800/50"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {doc.claimant}
                  </td>
                  <td className="px-6 py-4 text-secondary flex items-center gap-2">
                    {doc.documentName !== "-" && (
                        <FileText className="w-4 h-4 text-gray-400" />
                    )}
                    {doc.documentName}
                  </td>
                  <td className="px-6 py-4 text-secondary">{doc.provider}</td>
                  <td className="px-6 py-4 text-secondary">{doc.signedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-sm text-xs font-semibold",
                        doc.status === "Signed"
                          ? "bg-[#DCFCE7] text-[#008236] border border-[#00000000]"
                          : "bg-[#DBEAFE] text-[#1447E6] border border-[#00000000]"
                      )}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button 
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Download"
                      >
                         <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                        onClick={() => onDelete && onDelete(doc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-secondary">
                  No documents found matching &ldquo;{searchQuery}&rdquo;
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
