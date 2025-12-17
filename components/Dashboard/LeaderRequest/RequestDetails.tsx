/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, Mail, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, ImageUploadIcon } from "@hugeicons/core-free-icons";
import {
  LeaderRequestDetails,
  PROJECT_CATEGORIES,
} from "@/lib/project-categories";
import { MOCK_DATA } from "@/data/leader-request";
import { toast } from "sonner";

export function RequestDetails({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeaderRequestDetails | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data based on ID
    const timer = setTimeout(() => {
      const requestData = MOCK_DATA.find((item) => item.id === id);

      if (requestData) {
        // Merge mock data with extended details
        const fullData: LeaderRequestDetails = {
          ...requestData,
          email: "danial@gmail.com",
          village: "Kirembe Park View",
          pastor: "Alvin",
          sponsor: "Eric Lumika",
          established: "8/11/24",
          category: "Cow",
          stories:
            "In a small village in Uganda, families wake up each day hoping for enough water and food to make it through. Children walk long distances to school, their dreams bigger than their circumstances. Mothers work tirelessly—farming, cooking, caring—yet still struggle to provide the basics. Even with so little, the community holds onto hope, sharing whatever they have. Their resilience shines brighter than their hardships, reminding us of the strength in unity.",
          details:
            "The first batch of cow farm training has been successfully completed.",
          updates:
            "The first batch of cow farm training has been successfully completed.",
          impact: "120 families have directly benefited from our projects.",
          pastorSupport: [100, 100, 100],
          livestock: [
            { name: "$100 Chickens", count: 35 },
            { name: "$100 Chickens", count: 35 },
            { name: "$100 Chickens", count: 35 },
          ],
          other: [100],
        };
        setFormData(fullData);
      }
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSaveField = (field: string) => {
    setEditingField(null);
    toast.success("Field updated successfully", {
      description: `${field} has been updated.`,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Project saved successfully", {
        description: "All changes have been saved.",
      });

      setTimeout(() => {
        router.push("/leader-request");
      }, 1000);
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to save project", {
        description: "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setCoverImage(null);
    toast.success("Image deleted successfully");
  };

  const updateFormData = <K extends keyof LeaderRequestDetails>(
    field: K,
    value: LeaderRequestDetails[K]
  ) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const updateNestedFormData = (
    field: string,
    index: number,
    value: unknown
  ) => {
    if (formData) {
      const updatedArray = [
        ...(formData[field as keyof LeaderRequestDetails] as unknown[]),
      ];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Skeleton className="h-4 w-16" /> <ChevronRight className="h-4 w-4" />{" "}
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-secondary dark:text-secondary">
        <span>Request</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-primary">Request details</span>
      </div>

      {/* Leader Profile */}
      <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
          <img
            src="/images/avatar.png"
            alt={formData.leader}
            className="w-full h-full object-cover"
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).src = `https://ui-avatars.com/api/?name=${formData.leader}&background=random`;
            }}
          />
        </div>
        <h2 className="text-xl font-bold text-primary dark:text-gray-50 mb-1">
          {formData.leader}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-secondary dark:text-secondary">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{formData.email}</span>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formData.date}</span>
          </div>
        </div>
      </div>

      {/* Upload Cover */}
      <div>
        <span className="text-sm font-medium text-gray-700 block mb-2">
          Upload Cover
        </span>
        {coverImage ? (
          <div className="relative w-[120px] h-[120px] mb-2">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <label className="w-[120px] h-[120px] bg-white border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
              <HugeiconsIcon icon={ImageUploadIcon} size={24} />
            </div>
            <span className="text-xs text-secondary dark:text-secondary">
              Add image
            </span>
          </label>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteImage}
          disabled={!coverImage}
          className="bg-gray-100 border-none text-secondary hover:bg-gray-200 dark:bg-gray-700 h-8 text-xs"
        >
          Delete
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="font-semibold text-primary">Basic Information</h3>
              <HugeiconsIcon
                icon={Edit02Icon}
                size={18}
                className="text-secondary cursor-pointer hover:text-primary hover:font-black"
                onClick={() => handleEdit("basicInfo")}
              />
            </div>
            <div className="space-y-2 text-sm text-secondary p-5">
              <div className="flex gap-2">
                <span className="font-medium text-primary dark:text-gray-200 w-24">
                  Village:
                </span>
                {editingField === "basicInfo" ? (
                  <Input
                    value={formData.village}
                    onChange={(e) => updateFormData("village", e.target.value)}
                    className="h-7 text-sm flex-1"
                  />
                ) : (
                  <span>{formData.village}</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-primary dark:text-gray-200 w-24">
                  Location:
                </span>
                {editingField === "basicInfo" ? (
                  <Input
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="h-7 text-sm flex-1"
                  />
                ) : (
                  <span>{formData.location}</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-primary dark:text-gray-200 w-24">
                  Pastor:
                </span>
                {editingField === "basicInfo" ? (
                  <Input
                    value={formData.pastor}
                    onChange={(e) => updateFormData("pastor", e.target.value)}
                    className="h-7 text-sm flex-1"
                  />
                ) : (
                  <span>{formData.pastor}</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-primary dark:text-gray-200 w-24">
                  Sponsor:
                </span>
                {editingField === "basicInfo" ? (
                  <Input
                    value={formData.sponsor}
                    onChange={(e) => updateFormData("sponsor", e.target.value)}
                    className="h-7 text-sm flex-1"
                  />
                ) : (
                  <span>{formData.sponsor}</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-primary dark:text-gray-200 w-24">
                  Established:
                </span>
                {editingField === "basicInfo" ? (
                  <Input
                    value={formData.established}
                    onChange={(e) =>
                      updateFormData("established", e.target.value)
                    }
                    className="h-7 text-sm flex-1"
                  />
                ) : (
                  <span>{formData.established}</span>
                )}
              </div>
              {editingField === "basicInfo" && (
                <Button
                  size="sm"
                  onClick={() => handleSaveField("Basic Information")}
                  className="mt-2 w-full bg-blue-400 hover:bg-blue-500"
                >
                  Save
                </Button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="font-semibold text-primary">Details</h3>
              <HugeiconsIcon
                icon={Edit02Icon}
                size={18}
                className="text-secondary cursor-pointer hover:text-primary hover:font-black"
                onClick={() => handleEdit("details")}
              />
            </div>
            <div className="p-5">
              {editingField === "details" ? (
                <>
                  <Textarea
                    value={formData.details}
                    onChange={(e) => updateFormData("details", e.target.value)}
                    className="text-sm min-h-[100px]"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSaveField("Details")}
                    className="mt-2 w-full"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <p className="text-sm text-secondary">{formData.details}</p>
              )}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="font-semibold text-primary">Recent Updates</h3>
              <HugeiconsIcon
                icon={Edit02Icon}
                size={18}
                className="text-secondary cursor-pointer hover:text-primary hover:font-black"
                onClick={() => handleEdit("updates")}
              />
            </div>
            <div className="p-5">
              {editingField === "updates" ? (
                <>
                  <Textarea
                    value={formData.updates}
                    onChange={(e) => updateFormData("updates", e.target.value)}
                    className="text-sm min-h-[100px]"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSaveField("Recent Updates")}
                    className="mt-2 w-full"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <p className="text-sm text-secondary">{formData.updates}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Project Category */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-primary border-b px-5 py-3">
              Project Category
            </h3>
            <div className="relative p-5">
              <select
                className="w-full appearance-none bg-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.category}
                onChange={(e) => {
                  updateFormData("category", e.target.value);
                  toast.success("Category updated successfully");
                }}
              >
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
            </div>
          </div>

          {/* Stories */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="font-semibold text-primary">Stories</h3>
              <HugeiconsIcon
                icon={Edit02Icon}
                size={18}
                className="text-secondary cursor-pointer hover:text-primary hover:font-black"
                onClick={() => handleEdit("stories")}
              />
            </div>
            <div className="p-5">
              {editingField === "stories" ? (
                <>
                  <Textarea
                    value={formData.stories}
                    onChange={(e) => updateFormData("stories", e.target.value)}
                    className="text-sm min-h-[150px]"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSaveField("Stories")}
                    className="mt-2 w-full"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <p className="text-sm text-secondary leading-relaxed text-justify">
                  {formData.stories}
                </p>
              )}
            </div>
          </div>

          {/* Impact so far */}
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="font-semibold text-primary">Impact so far</h3>
              <HugeiconsIcon
                icon={Edit02Icon}
                size={18}
                className="text-secondary cursor-pointer hover:text-primary hover:font-black"
                onClick={() => handleEdit("impact")}
              />
            </div>
            <div className="p-5">
              {editingField === "impact" ? (
                <>
                  <Textarea
                    value={formData.impact}
                    onChange={(e) => updateFormData("impact", e.target.value)}
                    className="text-sm min-h-[100px]"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSaveField("Impact")}
                    className="mt-2 w-full"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <p className="text-sm text-secondary">{formData.impact}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pastor Support */}
      <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-semibold text-primary">Pastor Support</h3>
          <HugeiconsIcon
            icon={Edit02Icon}
            size={18}
            className="text-secondary cursor-pointer hover:text-primary hover:font-black"
            onClick={() => handleEdit("pastorSupport")}
          />
        </div>
        <div className="p-5">
          <label className="text-xs font-medium text-secondary">
            Set price
          </label>
          {formData.pastorSupport.map((amount, idx) => (
            <Input
              key={idx}
              value={
                editingField === "pastorSupport" ? amount : `$${amount} USD`
              }
              onChange={(e) => {
                if (editingField === "pastorSupport") {
                  updateNestedFormData(
                    "pastorSupport",
                    idx,
                    Number(e.target.value.replace(/\D/g, ""))
                  );
                }
              }}
              readOnly={editingField !== "pastorSupport"}
              className="bg-white text-primary mt-3"
            />
          ))}
          {editingField === "pastorSupport" && (
            <Button
              size="sm"
              onClick={() => handleSaveField("Pastor Support")}
              className="mt-2 w-full"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Livestock for Village */}
      <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-semibold text-primary">Livestock for Village</h3>
          <HugeiconsIcon
            icon={Edit02Icon}
            size={18}
            className="text-secondary cursor-pointer hover:text-primary hover:font-black"
            onClick={() => handleEdit("livestock")}
          />
        </div>
        <div className="p-5">
          <label className="text-xs font-medium text-secondary">
            Set price of animals & number
          </label>
          {formData.livestock.map((item, idx) => (
            <div key={idx} className="mt-3">
              {editingField === "livestock" ? (
                <div className="flex gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...formData.livestock];
                      updated[idx].name = e.target.value;
                      updateFormData("livestock", updated);
                    }}
                    placeholder="Name"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={item.count}
                    onChange={(e) => {
                      const updated = [...formData.livestock];
                      updated[idx].count = Number(e.target.value);
                      updateFormData("livestock", updated);
                    }}
                    placeholder="Count"
                    className="w-24"
                  />
                </div>
              ) : (
                <Input
                  value={`${item.name} (${item.count})`}
                  readOnly
                  className="bg-white text-primary"
                />
              )}
            </div>
          ))}
          {editingField === "livestock" && (
            <Button
              size="sm"
              onClick={() => handleSaveField("Livestock")}
              className="mt-2 w-full"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Other */}
      <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-semibold text-primary">
            Other{" "}
            <span className="text-secondary font-normal text-xs">
              (used for items for the church)
            </span>
          </h3>
          <HugeiconsIcon
            icon={Edit02Icon}
            size={18}
            className="text-secondary cursor-pointer hover:text-primary hover:font-black"
            onClick={() => handleEdit("other")}
          />
        </div>
        <div className="p-5">
          <label className="text-xs font-medium text-secondary">
            Set price
          </label>
          <Input
            value={
              editingField === "other"
                ? formData.other[0]
                : `$${formData.other[0]} usd`
            }
            onChange={(e) => {
              if (editingField === "other") {
                updateNestedFormData(
                  "other",
                  0,
                  Number(e.target.value.replace(/\D/g, ""))
                );
              }
            }}
            readOnly={editingField !== "other"}
            className="bg-white text-primary mt-3"
          />
          {editingField === "other" && (
            <Button
              size="sm"
              onClick={() => handleSaveField("Other")}
              className="mt-2 w-full"
            >
              Save
            </Button>
          )}
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
