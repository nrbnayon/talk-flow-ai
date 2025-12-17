/* eslint-disable @next/next/no-img-element */
// components/Dashboard/Upload/UploadDetails.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, X, Loader2, FileText } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, ImageUploadIcon } from "@hugeicons/core-free-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadDetail, UploadType } from "@/types/uploads";
import { UploadsService } from "@/data/uploads";
import { cn } from "@/lib/utils";

const DEFAULT_UPLOAD: UploadDetail = {
  id: "",
  title: "",
  type: "Book",
  createdAt: "",
  status: "Draft",
  section: "Introduction",
  bookName: "",
  coverImage: "",
  pdfUrl: "",
  information: "",
  description: "",
};

const INTRODUCTION_OPTIONS = [
  "Become The Movement",
  "Kingdom Empowerment",
  "Walking Witness Women",
  "Adopt A Village / Prison",
  "Bible Books And More",
  "Living in The Kingdom",
] as const;

type SectionKey = "basic" | "content";

export function UploadDetails({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editSections, setEditSections] = useState<Record<SectionKey, boolean>>(
    {
      basic: id === "new",
      content: id === "new",
    }
  );

  const isNew = id === "new";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadDetail>({
    defaultValues: DEFAULT_UPLOAD,
  });

  const watchType = watch("type");
  const watchCoverImage = watch("coverImage");
  const watchPdfUrl = watch("pdfUrl");

  useEffect(() => {
    const load = async () => {
      if (isNew) {
        const isContent =
          searchParams.has("content") ||
          searchParams.get("type")?.toLowerCase() === "content";
        const isBook =
          searchParams.has("book") ||
          searchParams.get("type")?.toLowerCase() === "book";

        const initialType: UploadType = isContent
          ? "Content"
          : isBook
          ? "Book"
          : DEFAULT_UPLOAD.type;

        // For new uploads, start with empty introduction so the
        // Introduction select shows the placeholder instead of a value.
        reset({
          ...DEFAULT_UPLOAD,
          type: initialType,
          section: "",
        });
        setIsLoading(false);
        return;
      }

      try {
        const data = await UploadsService.getById(id);
        if (!data) {
          router.push("/upload");
          return;
        }
        reset(data);
      } catch (error) {
        console.error("Failed to load upload", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id, isNew, router, searchParams, reset]);

  const toggleEdit = (section: SectionKey) => {
    if (isNew) return;
    setEditSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isEditing = (section: SectionKey) => isNew || editSections[section];

  const onSubmit = async (data: UploadDetail) => {
    setIsSaving(true);
    try {
      if (isNew) {
        await UploadsService.create(data);
      } else {
        await UploadsService.update(id, data);
      }
      toast.success("Upload saved", {
        description: isNew
          ? "Your upload has been created successfully."
          : "Your changes have been saved.",
      });
      router.push("/upload");
    } catch (error) {
      console.error("Failed to save upload", error);
      toast.error("Failed to save upload", {
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTypeChange = (value: UploadType) => {
    setValue("type", value, { shouldValidate: true });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file", {
        description: "Please upload an image file.",
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image too large", {
        description: "Image size must be less than 10MB.",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setValue("coverImage", url, { shouldValidate: true });
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue("coverImage", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processPdfFile = (file: File | undefined) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Invalid file", {
        description: "Please upload a PDF file.",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("File too large", {
        description: "PDF size must be less than 100MB.",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setValue("pdfUrl", url, { shouldValidate: true });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processPdfFile(file);
  };

  const handlePdfDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    processPdfFile(file);
  };

  const handleRemovePdf = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue("pdfUrl", "", { shouldValidate: true });
  };

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: SectionKey;
  }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-primary">{title}</h3>
      {!isNew && (
        <button
          onClick={() => toggleEdit(section)}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            editSections[section]
              ? "bg-primary/10 text-primary"
              : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
        >
          <HugeiconsIcon icon={Edit02Icon} size={18} />
        </button>
      )}
    </div>
  );

  const Label = ({
    children,
    required,
  }: {
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <label className="text-sm font-medium flex gap-1 text-gray-700 dark:text-gray-300">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  const ErrorMsg = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <span className="text-xs text-red-500 mt-1">{error}</span>;
  };

  const DisplayText = ({
    value,
    placeholder = "-",
  }: {
    value?: string;
    placeholder?: string;
  }) => (
    <p className={cn("text-sm py-2 px-1", !value && "text-gray-400 italic")}>
      {value || placeholder}
    </p>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Skeleton className="h-4 w-16" /> <ChevronRight className="h-4 w-4" />{" "}
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-48 w-[300px] rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <form
      className="space-y-8 pb-10"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-secondary dark:text-gray-400">
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() => router.push("/upload")}
        >
          Upload
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-primary">
          {isNew ? "New Upload" : "Upload details"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - basic info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <SectionHeader title="Basic information" section="basic" />

            <div className="space-y-4">
              {/* Type switch */}
              <div className="grid gap-2">
                <Label required>Type</Label>
                {isEditing("basic") ? (
                  <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
                    {(["Book", "Content"] as UploadType[]).map((type) => {
                      const active = watchType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleTypeChange(type)}
                          className={cn(
                            "px-3 py-1.5 text-sm flex-1",
                            active
                              ? "bg-blue-400 text-white"
                              : "bg-white text-secondary hover:bg-gray-50"
                          )}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <DisplayText value={watchType} />
                )}
              </div>

              {/* Created at (read-only) */}
              {!isNew && (
                <div className="grid gap-2">
                  <Label>Created at</Label>
                  <DisplayText value={watch("createdAt")} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - content fields */}
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <SectionHeader
              title={watchType === "Book" ? "Upload Book" : "Content"}
              section="content"
            />

            {watchType === "Book" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Book Cover + Book name */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Upload Book Cover</Label>
                    <p className="text-xs text-secondary">
                      Image size less than 5MB
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {watchCoverImage ? (
                      <div className="relative w-full aspect-3/4 max-w-[200px] rounded-lg overflow-hidden border border-gray-200 group">
                        <img
                          src={watchCoverImage}
                          alt="Book cover"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveImage}
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-3/4 max-w-[200px] bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <HugeiconsIcon icon={ImageUploadIcon} size={24} />
                        </div>
                        <span className="text-xs text-secondary dark:text-gray-400">
                          Add image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Book name field (moved here) */}
                  <div className="grid gap-2 pt-2">
                    <Label required>Book name</Label>
                    {isEditing("basic") ? (
                      <>
                        <Input
                          {...register("title")}
                          onChange={(e) => {
                            const next = e.target.value;
                            setValue("title", next, { shouldValidate: true });
                            setValue("bookName", next, {
                              shouldValidate: true,
                            });
                          }}
                          value={watch("title") || ""}
                          placeholder="Enter book name"
                          className={cn(
                            (errors.title || errors.bookName) &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        <ErrorMsg
                          error={
                            (errors.title && errors.title.message) ||
                            (errors.bookName && errors.bookName.message)
                          }
                        />
                      </>
                    ) : (
                      <DisplayText
                        value={watch("bookName") || watch("title") || ""}
                      />
                    )}
                  </div>
                </div>

                {/* Right side - PDF Upload */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Upload PDF</Label>
                    {isEditing("content") ? (
                      <div className="flex flex-col gap-3">
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          id="pdf-upload"
                          onChange={handlePdfUpload}
                        />
                        <div
                          onClick={() =>
                            document.getElementById("pdf-upload")?.click()
                          }
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onDrop={handlePdfDrop}
                          className="w-full aspect-3/4 max-w-[200px] bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {watchPdfUrl ? (
                            <>
                              <FileText className="h-10 w-10 text-primary mb-2" />
                              <span className="text-xs text-primary mb-2 text-center px-2">
                                PDF attached
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemovePdf}
                                className="h-7 text-xs"
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                <FileText className="h-6 w-6 text-primary" />
                              </div>
                              <span className="text-xs text-secondary dark:text-gray-400 text-center px-2">
                                Add pdf or drag & drop
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-secondary">
                          Max size 100MB. PDF files only.
                        </p>
                      </div>
                    ) : (
                      <DisplayText
                        value={watchPdfUrl || ""}
                        placeholder="No PDF attached"
                      />
                    )}
                  </div>

                  {/* Optional PDF URL */}
                  <div className="grid gap-2">
                    <Label>Upload PDF URL (optional)</Label>
                    <Input
                      {...register("pdfUrl")}
                      value={watchPdfUrl || ""}
                      onChange={(e) =>
                        setValue("pdfUrl", e.target.value, {
                          shouldValidate: false,
                        })
                      }
                      placeholder="https://example.com/file.pdf"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Introduction dropdown */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary">Introduction</span>
                    {isEditing("content") ? (
                      <select
                        className="border border-gray-300 rounded-md px-3 py-1 text-xs"
                        {...register("section", {
                          validate: (value) =>
                            watchType === "Content"
                              ? !!value?.trim() ||
                                "Please select an introduction section"
                              : true,
                        })}
                        value={watch("section") || ""}
                        onChange={(e) =>
                          setValue("section", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select introduction
                        </option>
                        {INTRODUCTION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-primary">
                        {watch("section") || "Select introduction"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label required>Section</Label>
                  {isEditing("content") ? (
                    <>
                      <Input
                        {...register("section", {
                          validate: (value) =>
                            watchType === "Content"
                              ? !!value?.trim() || "Section title is required"
                              : true,
                        })}
                        value={watch("section") || ""}
                        onChange={(e) =>
                          setValue("section", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        placeholder="e.g. Introduction"
                        className={cn(
                          errors.section &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      <ErrorMsg
                        error={errors.section && errors.section.message}
                      />
                    </>
                  ) : (
                    <DisplayText value={watch("section") || ""} />
                  )}
                </div>

                {/* Content title moved here */}
                <div className="grid gap-2">
                  <Label required>Title</Label>
                  {isEditing("content") ? (
                    <>
                      <Input
                        {...register("title", {
                          validate: (value) =>
                            watchType === "Content"
                              ? value.trim()
                                ? true
                                : "Title is required"
                              : true,
                        })}
                        value={watch("title") || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setValue("title", value, { shouldValidate: true });
                        }}
                        placeholder="Enter title"
                        className={cn(
                          errors.title &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      <ErrorMsg error={errors.title && errors.title.message} />
                    </>
                  ) : (
                    <DisplayText value={watch("title") || ""} />
                  )}
                </div>

                <div className="grid gap-2">
                  <Label required>Information</Label>
                  {isEditing("content") ? (
                    <>
                      <Textarea
                        {...register("information", {
                          validate: (value) =>
                            watchType === "Content"
                              ? !!value?.trim() ||
                                "Information text is required"
                              : true,
                          maxLength: {
                            value: 300,
                            message: "Information must be under 300 characters",
                          },
                        })}
                        value={watch("information") || ""}
                        onChange={(e) =>
                          setValue("information", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        placeholder="Short information text"
                        className={cn(
                          errors.information &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      <ErrorMsg
                        error={errors.information && errors.information.message}
                      />
                    </>
                  ) : (
                    <DisplayText value={watch("information") || ""} />
                  )}
                </div>

                <div className="grid gap-2">
                  <Label required>Description</Label>
                  {isEditing("content") ? (
                    <>
                      <Textarea
                        {...register("description", {
                          validate: (value) =>
                            watchType === "Content"
                              ? !!value?.trim() ||
                                "Description text is required"
                              : true,
                          maxLength: {
                            value: 300,
                            message: "Description must be under 300 characters",
                          },
                        })}
                        value={watch("description") || ""}
                        onChange={(e) =>
                          setValue("description", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        placeholder="Longer description"
                        className={cn(
                          errors.description &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      <ErrorMsg
                        error={errors.description && errors.description.message}
                      />
                    </>
                  ) : (
                    <DisplayText value={watch("description") || ""} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full justify-end sticky bottom-4 bg-white/80 dark:bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
        <Button
          type="submit"
          disabled={isSaving || isSubmitting}
          className="bg-gradient-red hover:bg-gradient-red-hover text-white"
        >
          {isSaving || isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300 dark:border-gray-600"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
