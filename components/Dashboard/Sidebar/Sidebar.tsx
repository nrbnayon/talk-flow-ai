// components/Sidebar.tsx
"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  DashboardSquare02Icon,
  UserGroup03Icon,
  WaterfallUp01Icon,
  GoogleDocIcon,
  ArtificialIntelligence05Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface SubLink {
  label: string;
  href: string;
}

interface LinkType {
  label: string;
  href: string;
  icon: IconSvgElement;
  subLinks?: SubLink[];
}

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [, setUserResizedWidth] = useState<number | null>(null);
  const [manualToggle, setManualToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const previousSearchQueryRef = useRef<string>("");

  const minWidth = 80;
  const maxWidth = 400;

  // Memoize links array matching the design
  const links: LinkType[] = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: DashboardSquare02Icon,
      },
      {
        label: "User Management",
        href: "/users",
        icon: UserGroup03Icon,
      },
      {
        label: "Documents",
        href: "/documents",
        icon: GoogleDocIcon,
      },
      {
        label: "AI Interaction",
        href: "/ai-interaction",
        icon: ArtificialIntelligence05Icon,
      },
      {
        label: "Reports",
        href: "/reports",
        icon: WaterfallUp01Icon,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings01Icon,
      },
    ],
    []
  );

  // Filter links based on search query
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;

    return links.filter((link) => {
      const mainMatch = link.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const subMatch = link.subLinks?.some((subLink) =>
        subLink.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return mainMatch || subMatch;
    });
  }, [searchQuery, links]);

  // Check if current path matches link or its sublinks (including dynamic routes)
  const isLinkActive = useCallback(
    (link: LinkType) => {
      // Exact match
      if (pathname === link.href) return true;

      // Check if pathname starts with link.href (for dynamic routes like /users/123)
      if (pathname.startsWith(link.href + "/")) return true;

      // Check sublinks
      if (link.subLinks) {
        return link.subLinks.some((subLink) => {
          // Exact match
          if (pathname === subLink.href) return true;
          // Dynamic route match
          if (pathname.startsWith(subLink.href + "/")) return true;
          return false;
        });
      }

      return false;
    },
    [pathname]
  );

  // Toggle expanded state for items with sublinks
  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  }, []);

  // Auto-expand items if their sublink is active
  useEffect(() => {
    links.forEach((link) => {
      if (
        link.subLinks &&
        link.subLinks.some(
          (subLink) =>
            pathname === subLink.href || pathname.startsWith(subLink.href + "/")
        )
      ) {
        if (!expandedItems.includes(link.label)) {
          setExpandedItems((prev) => [...prev, link.label]);
        }
      }
    });
  }, [pathname, links, expandedItems]);

  // Auto-expand items when search matches sublinks
  useEffect(() => {
    // Only process if search query actually changed
    if (searchQuery.trim() && searchQuery !== previousSearchQueryRef.current) {
      previousSearchQueryRef.current = searchQuery;
      const itemsToExpand: string[] = [];
      links.forEach((link) => {
        if (link.subLinks) {
          const hasMatchingSubLink = link.subLinks.some((subLink) =>
            subLink.label.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (hasMatchingSubLink) {
            itemsToExpand.push(link.label);
          }
        }
      });
      // Only update if there are new items to expand
      if (itemsToExpand.length > 0) {
        setExpandedItems((prev) => {
          const newSet = new Set([...prev, ...itemsToExpand]);
          const newArray = Array.from(newSet);
          // Only update if the array actually changed
          if (
            newArray.length === prev.length &&
            newArray.every((item, idx) => item === prev[idx])
          ) {
            return prev;
          }
          return newArray;
        });
      }
    } else if (!searchQuery.trim()) {
      previousSearchQueryRef.current = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, minWidth),
        maxWidth
      );

      setSidebarWidth(newWidth);
      setUserResizedWidth(newWidth);

      if (newWidth <= minWidth + 20) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  // Handle width update after resizing completes
  useEffect(() => {
    if (!isResizing && manualToggle) {
      // Defer state update to avoid synchronous setState in effect
      // This is necessary to wait for resizing to complete before updating width
      const timeoutId = setTimeout(() => {
        if (open) {
          setSidebarWidth(220);
          setUserResizedWidth(220);
        } else {
          setSidebarWidth(minWidth);
        }
        setManualToggle(false);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [open, isResizing, manualToggle, minWidth]);

  const handleToggleClick = () => {
    // If not resizing, update width immediately
    if (!isResizing) {
      const newOpen = !open;
      if (newOpen) {
        setSidebarWidth(220);
        setUserResizedWidth(220);
      } else {
        setSidebarWidth(minWidth);
      }
      setOpen(newOpen);
    } else {
      // If resizing, use the effect to handle it after resizing completes
      setManualToggle(true);
      setOpen(!open);
    }
  };

  // Handle logout functionality
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Clear cookies
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log("User logged out successfully");
    setShowLogoutModal(false);

    // Redirect to login
    router.push("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Render icon with proper styling
  const renderIcon = useCallback((icon: IconSvgElement, isActive: boolean) => {
    return (
      <HugeiconsIcon
        icon={icon}
        strokeWidth={1.5}
        className={cn(
          "h-6 w-6 shrink-0 transition-colors duration-200",
          isActive
            ? "text-white font-bold"
            : "text-white group-hover:text-primary"
        )}
      />
    );
  }, []);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-primary w-full flex-1 mx-auto",
        "h-screen overflow-hidden relative"
      )}
    >
      <div className="relative overflow-visible flex">
        <Sidebar
          open={open}
          setOpen={setOpen}
          animate={true}
          width={sidebarWidth}
        >
          <SidebarBody
            className={cn(
              "justify-between gap-10 border-0.5 border-r border-border",
              "bg-background text-white"
            )}
          >
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex items-center justify-center my-6">
                <Logo open={open} />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {filteredLinks.map((link, idx) => {
                  const isActive = isLinkActive(link);
                  const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                  const isExpanded = expandedItems.includes(link.label);
                  const isHovered = hoveredItem === link.label;

                  const filteredSubLinks = link.subLinks?.filter(
                    (subLink) =>
                      !searchQuery.trim() ||
                      subLink.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      link.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  );

                  const shouldShowSublinks =
                    hasSubLinks &&
                    (isExpanded || (isHovered && !searchQuery.trim())) &&
                    open &&
                    filteredSubLinks &&
                    filteredSubLinks.length > 0;

                  return (
                    <div
                      key={idx}
                      className="relative"
                      onMouseEnter={() => {
                        if (hasSubLinks) {
                          setHoveredItem(link.label);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hasSubLinks && !isExpanded) {
                          setTimeout(() => {
                            setHoveredItem((prev) =>
                              prev === link.label ? null : prev
                            );
                          }, 200);
                        }
                      }}
                    >
                      {/* Main Link */}
                      <div className="flex items-center relative">
                        <Link
                          href={link.href}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              setOpen(false);
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-md transition-all duration-200 group flex-1 relative",
                            isActive
                              ? "bg-gradient-purple text-white font-bold"
                              : "hover:text-primary hover:bg-gray-50"
                          )}
                        >
                          <span className="shrink-0">
                            {renderIcon(link.icon, isActive)}
                          </span>
                          <motion.span
                            animate={{
                              display: open ? "inline-block" : "none",
                              opacity: open ? 1 : 0,
                            }}
                            className="text-md"
                          >
                            {link.label}
                          </motion.span>

                          {/* Expand/Collapse Button */}
                          {hasSubLinks && open && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded(link.label);
                              }}
                              className={cn(
                                "p-1 rounded transition-all duration-200 hover:bg-gray-200",
                                isActive && "text-white"
                              )}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </Link>
                      </div>

                      {/* Sub Links Container */}
                      {shouldShowSublinks && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                          onMouseEnter={() => {
                            setHoveredItem(link.label);
                          }}
                          onMouseLeave={() => {
                            if (!isExpanded) {
                              setTimeout(() => {
                                setHoveredItem((prev) =>
                                  prev === link.label ? null : prev
                                );
                              }, 200);
                            }
                          }}
                        >
                          {filteredSubLinks.map((subLink, subIdx) => {
                            const isSubLinkActive =
                              pathname === subLink.href ||
                              pathname.startsWith(subLink.href + "/");

                            return (
                              <Link
                                key={subIdx}
                                href={subLink.href}
                                onClick={() => {
                                  if (window.innerWidth < 768) {
                                    setOpen(false);
                                  }
                                }}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm",
                                  isSubLinkActive
                                    ? "bg-gradient-purple text-white font-bold"
                                    : "text-secondary hover:text-primary hover:bg-gray-50"
                                )}
                              >
                                <span className="text-sm whitespace-pre">
                                  {subLink.label}
                                </span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              {/* User Profile */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 px-3">
                  <Link 
                    href="/profile" 
                    onClick={() => {
                        if (window.innerWidth < 768) {
                          setOpen(false);
                        }
                      }}
                    className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                      <span className="text-pink-600 font-semibold text-sm">
                        OR
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        display: open ? "block" : "none",
                        opacity: open ? 1 : 0,
                      }}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-base font-medium truncate">
                        Nayon
                      </p>
                      <p className="text-base text-secondary truncate">
                        Super Admin
                      </p>
                    </motion.div>
                  </Link>
                  <motion.button
                    onClick={handleLogoutClick}
                    animate={{
                      display: open ? "block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className="p-1 hover:bg-red-50 rounded transition-colors hover:text-red-500 cursor-pointer"
                  >
                    <LogOut className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Resizable Border */}
        <div
          className="hidden md:block w-1 bg-transparent cursor-col-resize hover:bg-blue-500/20 transition-colors duration-200 relative group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-0 w-2 -ml-0.5 bg-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggleClick}
          className={cn(
            "absolute hidden md:flex top-4 z-80 cursor-pointer p-2 rounded-full bg-primary border border-gray-300 shadow-lg hover:bg-gray-50 transition-all duration-200",
            open ? "-right-3" : "-right-3"
          )}
        >
          {open ? (
            <PanelRightOpen className="h-4 w-4 text-secondary" />
          ) : (
            <PanelLeftOpen className="h-4 w-4 text-secondary" />
          )}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelLogout}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-primary rounded-xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-4"
          >
            <button
              onClick={handleCancelLogout}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-secondary" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>

              <h3 className="text-lg font-semibold text-primary mb-2">
                Confirm Logout
              </h3>

              <p className="text-sm text-secondary mb-6">
                Are you sure you want to log out? You will need to sign in again
                to access your account.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-red rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Logo = ({ open }: { open: boolean }) => {
  return (
    <div className="font-normal flex items-center text-sm relative z-20 w-full justify-center">
      <motion.div
        animate={{
          width: open ? "120px" : "40px",
          height: open ? "auto" : "40px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center overflow-hidden"
      >
        <Image
          className="w-full h-full object-contain"
          alt="TalkFlow Logo"
          src="/icons/logo.svg"
          width={open ? 120 : 40}
          height={open ? 120 : 40}
          priority
        />
      </motion.div>
    </div>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 bg-primary">
      <div className="p-0 flex flex-col gap-2 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-custom scrollbar-thin">
        {children}
      </div>
    </div>
  );
};
