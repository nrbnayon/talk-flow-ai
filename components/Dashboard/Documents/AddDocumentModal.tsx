"use client";

import { useState, useRef } from "react";
import { X, UploadCloud, ChevronDown, File } from "lucide-react";
import { IDocument } from "@/data/documentsData";
import { toast } from "sonner";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: Omit<IDocument, "id" | "status" | "signedDate">) => void;
}

export function AddDocumentModal({
  isOpen,
  onClose,
  onAddDocument,
}: AddDocumentModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    documentName: "",
    provider: "DocuSign",
    type: "Signature",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload a file");
      return;
    }

    if (!formData.customerName || !formData.documentName) {
      toast.error("Please fill in all required fields");
      return;
    }

    onAddDocument({
      claimant: formData.customerName,
      documentName: formData.documentName,
      provider: formData.provider,
    });

    // Reset form
    setFormData({
      customerName: "",
      documentName: "",
      provider: "DocuSign",
      type: "Signature",
    });
    setSelectedFile(null);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-[#1A1C20] rounded-lg shadow-2xl w-full max-w-lg mx-4 border border-gray-800">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Add Document</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Upload Area */}
          <div>
            <div 
              onClick={handleUploadClick}
              className="border border-dashed border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center bg-[#0A0E14] text-center cursor-pointer hover:border-gray-500 transition-colors"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <div className="bg-gray-800 p-3 rounded-full mb-3">
                {selectedFile ? (
                   <File className="w-6 h-6 text-white" />
                ) : (
                   <UploadCloud className="w-6 h-6 text-white" />
                )}
              </div>
              <p className="text-white text-sm font-medium mb-1">
                {selectedFile ? selectedFile.name : (
                  <>
                    Drop files here or click to upload <span className="text-red-500">*</span>
                  </>
                )}
              </p>
              {!selectedFile && (
                <>
                  <p className="text-gray-500 text-xs">
                    Supports: 2D scans (JPG, PNG, PDF)
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Maximum file size: 5 MB</p>
                </>
              )}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors border border-transparent focus:border-blue-500"
            />
          </div>

          {/* Document Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="documentName"
              value={formData.documentName}
              onChange={handleChange}
              placeholder="Claim Form CF-2847"
              className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors border border-transparent focus:border-blue-500"
            />
          </div>

          {/* Document Provider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Document Provider
            </label>
            <div className="relative">
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none border border-transparent focus:border-blue-500 cursor-pointer"
              >
                <option value="DocuSign">DocuSign</option>
                <option value="Drop Box">Drop Box</option>
                <option value="Google Drive">Google Drive</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

           {/* Document Type */}
           <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Document Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#0A0E14] rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none border border-transparent focus:border-blue-500 cursor-pointer"
              >
                <option value="Signature">Signature</option>
                <option value="Review">Review</option>
                <option value="Archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-800 justify-end bg-[#1A1C20] rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#2D2F36] hover:bg-[#3D3F46] text-white text-sm font-medium rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-md transition-colors"
          >
            Add Document
          </button>
        </div>
      </div>
    </div>
  );
}
