"use client";

import { Mail, Phone } from "lucide-react";

interface TableActionProps {
  email: string;
  phone: string;
}

export function TableActions({ email, phone }: TableActionProps) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        title="Send email"
        className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-sm hover:bg-blue-50 dark:hover:bg-blue-900/20"
      >
        <Mail className="w-4 h-4" />
      </a>
      <a
        href={`tel:${phone}`}
        title="Call"
        className="text-gray-400 hover:text-green-500 transition-colors p-2 rounded-sm hover:bg-green-50 dark:hover:bg-green-900/20"
      >
        <Phone className="w-4 h-4" />
      </a>
    </div>
  );
}
