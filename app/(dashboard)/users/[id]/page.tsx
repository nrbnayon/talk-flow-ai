"use client";

import { use } from "react";
import {
  Mail,
  MapPin,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Image from "next/image";
import { userDetailsData } from "@/data";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // In a real app we would use fetch user by id.
  const userData = userDetailsData;

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary dark:text-white">
          Leader details
        </h1>
        <div className="text-sm text-secondary dark:text-gray-400 mt-1">
          Leader /{" "}
          <span className="text-primary dark:text-white font-medium">
            Leader details
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-sm shadow-none border border-[#E9EAEB] p-8 flex flex-col items-center text-center h-fit">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-200">
            <Image
              src={userData.image || "/images/avatar.png"}
              alt={userData.name}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-primary dark:text-white mb-4">
            {userData.name}
          </h2>

          <div className="w-full space-y-4 text-left">
            <div className="flex items-center gap-3 text-secondary dark:text-gray-300">
              <Mail className="w-5 h-5 text-gray-700 text-semibold" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-secondary dark:text-gray-300">
              <MapPin className="w-5 h-5 text-gray-700 text-semibold" />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center gap-3 text-secondary dark:text-gray-300">
              <Users className="w-5 h-5 text-gray-700 text-semibold" />
              <span>{userData.date}</span>
            </div>
            <div className="flex items-center gap-3 text-secondary dark:text-gray-300">
              <Calendar className="w-5 h-5 text-gray-700 text-semibold" />
              <span>{userData.joined}</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow-none border border-[#E9EAEB]  ">
              <h3 className="text-sm font-medium text-secondary dark:text-gray-400 mb-2">
                Total earning
              </h3>
              <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                {userData.earnings}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-green-500 font-medium flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {userData.earningsTrend}%
                </span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow-none border border-[#E9EAEB]  ">
              <h3 className="text-sm font-medium text-secondary dark:text-gray-400 mb-2">
                Total Projects
              </h3>
              <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                {userData.projectsCount}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-red-500 font-medium flex items-center">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  {Math.abs(userData.projectsTrend)}%
                </span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-none border border-[#E9EAEB] overflow-hidden">
            <div className="p-6 border-b border-[#E9EAEB]">
              <h3 className="text-lg font-semibold text-primary dark:text-white">
                Projects
              </h3>
            </div>
            <div className="divide-y divide-[#E9EAEB] dark:divide-gray-700 px-4">
              {userData.projectList.map((project, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center rounded-xl shadow-sm border border-[#E9EAEB] mt-3 last:mb-3"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-24 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                    <Image
                      src={project.image || "/images/avatar.png"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary dark:text-white">
                      {project.title}
                    </h4>
                    <div className="text-sm text-secondary dark:text-gray-400 space-y-1 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3  text-gray-700 font-bold" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-700 font-bold" />
                        {project.families} families
                      </div>
                    </div>
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-[#FBEDE6] text-[#C2392E] dark:bg-orange-900/20 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
