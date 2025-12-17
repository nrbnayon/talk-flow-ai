/* eslint-disable @next/next/no-img-element */
// components/Dashboard/Projects/ProjectDetails.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, Plus, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, ImageUploadIcon } from "@hugeicons/core-free-icons";
import { ProjectsService } from "@/data/projects";
import { ProjectDetail } from "@/types/projects";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";

const DEFAULT_PROJECT: ProjectDetail = {
  id: "",
  projectName: "",
  date: "",
  leader: "",
  amount: "",
  status: "Pending",
  village: "",
  location: "",
  pastor: "",
  sponsor: "",
  established: "",
  category: "Cow",
  stories: "",
  details: "",
  updates: "",
  impact: "",
  pastorSupport: [0],
  livestock: [{ name: "Chickens", count: 0 }],
  other: [0],
  coverImage: "",
};

type SectionKey =
  | "basic"
  | "details"
  | "updates"
  | "category"
  | "stories"
  | "impact"
  | "pastorSupport"
  | "livestock"
  | "other";

export function ProjectDetails({ id }: { id: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProjectDetail>(DEFAULT_PROJECT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isNew = id === "new";

  // State to track edit mode per section
  // For new projects, all sections are essentially "editing" (or we just don't check this state)
  // For existing projects, enabled when user clicks edit
  const [editSections, setEditSections] = useState<Record<SectionKey, boolean>>(
    {
      basic: isNew,
      details: isNew,
      updates: isNew,
      category: isNew,
      stories: isNew,
      impact: isNew,
      pastorSupport: isNew,
      livestock: isNew,
      other: isNew,
    }
  );

  useEffect(() => {
    const loadProject = async () => {
      if (isNew) {
        setFormData({ ...DEFAULT_PROJECT });
        setIsLoading(false);
        return;
      }

      try {
        const data = await ProjectsService.getById(id);
        if (data) {
          setFormData(data);
        } else {
          router.push("/projects");
        }
      } catch (error) {
        console.error("Failed to load project", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id, isNew, router]);

  const toggleEdit = (section: SectionKey) => {
    if (isNew) return; // Always editing in new mode
    setEditSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isEditing = (section: SectionKey) => isNew || editSections[section];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.village.trim())
      newErrors.village = "Village name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.pastor.trim()) newErrors.pastor = "Pastor name is required";
    if (!formData.sponsor.trim())
      newErrors.sponsor = "Sponsor name is required";
    if (!formData.established.trim())
      newErrors.established = "Establishment date is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";
    if (!formData.stories.trim()) newErrors.stories = "Stories are required";
    if (!formData.impact.trim())
      newErrors.impact = "Impact description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSaving(true);
    try {
      if (isNew) {
        await ProjectsService.create(formData);
      } else {
        await ProjectsService.update(id, formData);
      }
      router.push("/projects");
    } catch (error) {
      console.error("Failed to save project", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, coverImage: imageUrl });
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({ ...formData, coverImage: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateLivestock = (
    index: number,
    field: "name" | "count",
    value: string | number
  ) => {
    const newLivestock = [...formData.livestock];
    newLivestock[index] = { ...newLivestock[index], [field]: value };
    setFormData({ ...formData, livestock: newLivestock });
  };

  const addLivestock = () => {
    setFormData({
      ...formData,
      livestock: [...formData.livestock, { name: "", count: 0 }],
    });
  };

  const removeLivestock = (index: number) => {
    setFormData({
      ...formData,
      livestock: formData.livestock.filter((_, i) => i !== index),
    });
  };

  const updateArrayField = (
    field: "pastorSupport" | "other",
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const newArray = [...formData[field]];
    newArray[index] = numValue;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "pastorSupport" | "other") => {
    setFormData({ ...formData, [field]: [...formData[field], 0] });
  };

  const removeArrayItem = (field: "pastorSupport" | "other", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

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

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: SectionKey;
  }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-primary ">{title}</h3>
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

  const DisplayText = ({
    value,
    placeholder = "-",
  }: {
    value?: string | number;
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
    <div className="space-y-8 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-secondary dark:text-gray-400">
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() => router.push("/projects")}
        >
          Projects
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-primary ">
          {isNew ? "New Project" : "Project details"}
        </span>
      </div>

      {/* Upload Cover */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Cover
        </span>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {formData.coverImage ? (
          <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden border border-gray-200 mt-2 group">
            <img
              src={formData.coverImage}
              alt="Project Cover"
              className="w-full h-full object-cover"
            />
            {/* Allowed to remove image even in view mode? Probably yes, or maybe stick to edit mode rules. 
                Let's simplify: Image updating is always available for now, or could restrict to 'basic' edit mode.
                Let's leave it accessible.
            */}
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
            className="w-[300px] h-[180px] bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-2"
          >
            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
              <HugeiconsIcon icon={ImageUploadIcon} size={24} />
            </div>
            <span className="text-sm text-secondary dark:text-gray-400">
              Add image
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Basic Information" section="basic" />
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label required>Village/Project Name</Label>
                {isEditing("basic") ? (
                  <>
                    <Input
                      value={formData.village}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          village: e.target.value,
                          projectName: e.target.value,
                        });
                        if (errors.village)
                          setErrors({ ...errors, village: "" });
                      }}
                      placeholder="e.g. Kirembe Park View"
                      className={cn(
                        errors.village &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <ErrorMsg error={errors.village} />
                  </>
                ) : (
                  <DisplayText value={formData.village} />
                )}
              </div>
              <div className="grid gap-2">
                <Label required>Location</Label>
                {isEditing("basic") ? (
                  <>
                    <Input
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location)
                          setErrors({ ...errors, location: "" });
                      }}
                      placeholder="Enter location"
                      className={cn(
                        errors.location &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <ErrorMsg error={errors.location} />
                  </>
                ) : (
                  <DisplayText value={formData.location} />
                )}
              </div>
              <div className="grid gap-2">
                <Label required>Pastor/Leader</Label>
                {isEditing("basic") ? (
                  <>
                    <Input
                      value={formData.pastor}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          pastor: e.target.value,
                          leader: e.target.value,
                        });
                        if (errors.pastor) setErrors({ ...errors, pastor: "" });
                      }}
                      placeholder="Pastor name"
                      className={cn(
                        errors.pastor &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <ErrorMsg error={errors.pastor} />
                  </>
                ) : (
                  <DisplayText value={formData.pastor} />
                )}
              </div>
              <div className="grid gap-2">
                <Label required>Sponsor</Label>
                {isEditing("basic") ? (
                  <>
                    <Input
                      value={formData.sponsor}
                      onChange={(e) => {
                        setFormData({ ...formData, sponsor: e.target.value });
                        if (errors.sponsor)
                          setErrors({ ...errors, sponsor: "" });
                      }}
                      placeholder="Sponsor name"
                      className={cn(
                        errors.sponsor &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <ErrorMsg error={errors.sponsor} />
                  </>
                ) : (
                  <DisplayText value={formData.sponsor} />
                )}
              </div>
              <div className="grid gap-2">
                <Label required>Established</Label>
                {isEditing("basic") ? (
                  <>
                    <Input
                      value={formData.established}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          established: e.target.value,
                        });
                        if (errors.established)
                          setErrors({ ...errors, established: "" });
                      }}
                      placeholder="Date established"
                      className={cn(
                        errors.established &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <ErrorMsg error={errors.established} />
                  </>
                ) : (
                  <DisplayText value={formData.established} />
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Details" section="details" />
            <div className="grid gap-2">
              {isEditing("details") ? (
                <>
                  <textarea
                    className={cn(
                      "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                      errors.details &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.details}
                    onChange={(e) => {
                      setFormData({ ...formData, details: e.target.value });
                      if (errors.details) setErrors({ ...errors, details: "" });
                    }}
                    placeholder="Enter project details..."
                  />
                  <ErrorMsg error={errors.details} />
                </>
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300 min-h-[50px] whitespace-pre-wrap">
                  {formData.details || "-"}
                </div>
              )}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <SectionHeader title="Recent Updates" section="updates" />
            <div className="grid gap-2">
              {isEditing("updates") ? (
                <textarea
                  className={cn(
                    "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  )}
                  value={formData.updates}
                  onChange={(e) =>
                    setFormData({ ...formData, updates: e.target.value })
                  }
                  placeholder="Enter updates..."
                />
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300 min-h-[50px] whitespace-pre-wrap">
                  {formData.updates || "No updates yet."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Project Category */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Project Category" section="category" />
            {isEditing("category") ? (
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {PROJECT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
              </div>
            ) : (
              <DisplayText value={formData.category} />
            )}
          </div>

          {/* Stories */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Stories" section="stories" />
            <div className="grid gap-2">
              {isEditing("stories") ? (
                <>
                  <textarea
                    className={cn(
                      "flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                      errors.stories &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.stories}
                    onChange={(e) => {
                      setFormData({ ...formData, stories: e.target.value });
                      if (errors.stories) setErrors({ ...errors, stories: "" });
                    }}
                    placeholder="Tell the story..."
                  />
                  <ErrorMsg error={errors.stories} />
                </>
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300 min-h-[100px] whitespace-pre-wrap">
                  {formData.stories || "-"}
                </div>
              )}
            </div>
          </div>

          {/* Impact so far */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Impact so far" section="impact" />
            <div className="grid gap-2">
              {isEditing("impact") ? (
                <>
                  <textarea
                    className={cn(
                      "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                      errors.impact &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.impact}
                    onChange={(e) => {
                      setFormData({ ...formData, impact: e.target.value });
                      if (errors.impact) setErrors({ ...errors, impact: "" });
                    }}
                    placeholder="Describe impact..."
                  />
                  <ErrorMsg error={errors.impact} />
                </>
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300 min-h-[100px] whitespace-pre-wrap">
                  {formData.impact || "-"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pastor Support */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary">Pastor Support</h3>
          {isEditing("pastorSupport") ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addArrayItem("pastorSupport")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          ) : (
            !isNew && (
              <button
                onClick={() => toggleEdit("pastorSupport")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  editSections["pastorSupport"]
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <HugeiconsIcon icon={Edit02Icon} size={18} />
              </button>
            )
          )}
        </div>
        <div className="space-y-4">
          <label className="text-xs font-medium text-secondary">
            Set price
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.pastorSupport.map((amount, idx) => (
              <div key={idx} className="flex gap-2">
                {isEditing("pastorSupport") ? (
                  <>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) =>
                        updateArrayField("pastorSupport", idx, e.target.value)
                      }
                      className="bg-white dark:bg-gray-800 text-primary "
                      placeholder="Amount"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("pastorSupport", idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md px-3 py-2 text-sm w-full border border-transparent">
                    {amount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Livestock for Village */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary ">Livestock for Village</h3>
          {isEditing("livestock") ? (
            <Button variant="ghost" size="sm" onClick={addLivestock}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          ) : (
            !isNew && (
              <button
                onClick={() => toggleEdit("livestock")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  editSections["livestock"]
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <HugeiconsIcon icon={Edit02Icon} size={18} />
              </button>
            )
          )}
        </div>
        <div className="space-y-4">
          <label className="text-xs font-medium text-secondary">
            Set name & count
          </label>
          {formData.livestock.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              {isEditing("livestock") ? (
                <>
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      updateLivestock(idx, "name", e.target.value)
                    }
                    placeholder="Animal Name"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={item.count}
                    onChange={(e) =>
                      updateLivestock(idx, "count", parseInt(e.target.value))
                    }
                    placeholder="Count"
                    className="w-32"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLivestock(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex gap-4 items-center w-full bg-gray-50 dark:bg-gray-700/50 rounded-md p-2">
                  <div className="flex-1 text-sm font-medium">{item.name}</div>
                  <div className="w-24 text-sm text-secondary">
                    Qty: {item.count}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Other */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary ">
            Other{" "}
            <span className="text-secondary font-normal text-xs">
              (used for items for the church)
            </span>
          </h3>
          {isEditing("other") ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addArrayItem("other")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          ) : (
            !isNew && (
              <button
                onClick={() => toggleEdit("other")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  editSections["other"]
                    ? "bg-primary/10 text-primary"
                    : "text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <HugeiconsIcon icon={Edit02Icon} size={18} />
              </button>
            )
          )}
        </div>
        <div className="space-y-4">
          <label className="text-xs font-medium text-secondary">
            Set price
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.other.map((amount, idx) => (
              <div key={idx} className="flex gap-2">
                {isEditing("other") ? (
                  <>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) =>
                        updateArrayField("other", idx, e.target.value)
                      }
                      className="bg-white dark:bg-gray-800 text-primary "
                      placeholder="Amount"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("other", idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md px-3 py-2 text-sm w-full border border-transparent">
                    {amount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full justify-end sticky bottom-4 bg-white/80 dark:bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-red hover:bg-gradient-red-hover text-white"
        >
          {isSaving ? "Saving..." : "Save Project"}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300 dark:border-gray-600"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
