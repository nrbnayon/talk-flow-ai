"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../Shared/DashboardHeader";
import { StatsCard } from "../Shared/StatsCard";
import { DocumentsTable } from "./DocumentsTable";
import { AddDocumentModal } from "./AddDocumentModal";
import { ConfirmationModal } from "../Shared/ConfirmationModal";
import { documentsData, IDocument } from "@/data/documentsData";
import { Search, Plus } from "lucide-react";
import {
  UserGroup03Icon,
  GoogleDocIcon,
  ArtificialIntelligence05Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

export function DocumentsPageContent() {
  const [documents, setDocuments] = useState<IDocument[]>(documentsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleAddDocument = (newDoc: Omit<IDocument, "id" | "status" | "signedDate">) => {
    // Determine status based on provider (dummy logic)
    // If DocuSign/started, maybe In Progress or Signed immediately?
    // Let's assume In Progress for new docs
    const doc: IDocument = {
      id: String(documents.length + 1),
      ...newDoc,
      status: "In Progress",
      signedDate: "-", // Not signed yet
    };
    setDocuments((prev) => [doc, ...prev]);
    toast.success("Document added successfully");
  };

  const handleDeleteDocument = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setDocuments((prev) => prev.filter((d) => d.id !== deleteId));
      toast.success("Document deleted");
      setDeleteId(null);
    }
  };

  const stats = [
    {
      label: "Active Users",
      value: "1,284",
      trend: 8.5,
      icon: UserGroup03Icon,
    },
    {
      label: "Total Claims",
      value: "2,489",
      trend: 8.5,
      icon: GoogleDocIcon,
    },
    {
      label: "Total AI Calls",
      value: "1,367",
      trend: 8.5,
      icon: ArtificialIntelligence05Icon,
    },
    {
      label: "Documents Status",
      value: "1,234",
      trend: 8.5,
      icon: GoogleDocIcon,
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Documents Managements"
        description="Centralized document management and e-signature tracking"
      />

      <div className="p-4 md:p-8 w-full mx-auto space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendLabel="Up from last month"
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Documents List */}
        <div className="bg-gray rounded-xl shadow-xs p-6" style={{ minHeight: "500px" }}>
           <div className="mb-6">
             <h2 className="text-xl font-semibold text-foreground">Document list</h2>
           </div>

          {/* Search & Actions Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
             {/* Search Bar */}
            <div className="relative w-full sm:max-w-4xl bg-background rounded-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-[#0A0E14] text-sm text-foreground border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

             {/* Add Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Document
            </button>
          </div>

          <DocumentsTable
            limit={10}
            showPagination={true}
            searchQuery={searchQuery}
            isLoading={isSearching}
            documents={documents}
            onDelete={handleDeleteDocument}
          />
        </div>
      </div>

      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDocument={handleAddDocument}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}
