export interface IAICall {
  id: string;
  customerName: string;
  phoneNumber: string;
  type: string; // e.g., "Follow Up"
  claimId: string;
  priority: "High" | "Medium" | "Low";
  status: "Scheduled" | "Completed" | "Failed";
  purpose: string;
  scheduledDate: string;
  scheduledTime: string;
  script?: string;
  autoRetry?: boolean;
}

export const aiCallsData: IAICall[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    phoneNumber: "+1 (555) 234-5678",
    type: "Follow Up",
    claimId: "CF-2847",
    priority: "High",
    status: "Scheduled",
    purpose: "Follow up on missing document submission",
    scheduledDate: "Dec 5, 2025",
    scheduledTime: "5:10PM",
    script: "Hello Sarah, this is the AI assistant calling regarding your claim CF-2847. We noticed that we are still missing your vehicle registration document. Could you please upload it at your earliest convenience?",
    autoRetry: true,
  },
  {
    id: "2",
    customerName: "John Smith",
    phoneNumber: "+1 (555) 987-6543",
    type: "Follow Up",
    claimId: "CF-9921",
    priority: "High",
    status: "Scheduled",
    purpose: "Follow up on missing document submission",
    scheduledDate: "Dec 5, 2025",
    scheduledTime: "5:10PM",
    script: "Hello John, checking in on the status of your claim.",
    autoRetry: true,
  },
  {
    id: "3",
    customerName: "Michael Chen",
    phoneNumber: "+1 (555) 456-7890",
    type: "Follow Up",
    claimId: "CF-3321",
    priority: "High",
    status: "Scheduled",
    purpose: "Follow up on missing document submission",
    scheduledDate: "Dec 5, 2025",
    scheduledTime: "5:10PM",
    autoRetry: false,
  },
  {
    id: "4",
    customerName: "Sarah Johnson",
    phoneNumber: "+1 (555) 234-5678",
    type: "Follow Up",
    claimId: "CF-2847",
    priority: "High",
    status: "Scheduled",
    purpose: "Follow up on missing document submission",
    scheduledDate: "Dec 5, 2025",
    scheduledTime: "5:10PM",
    autoRetry: true,
  },
  {
    id: "5",
    customerName: "Sarah Johnson",
    phoneNumber: "+1 (555) 234-5678",
    type: "Follow Up",
    claimId: "CF-2847",
    priority: "High",
    status: "Scheduled",
    purpose: "Follow up on missing document submission",
    scheduledDate: "Dec 5, 2025",
    scheduledTime: "5:10PM",
    autoRetry: true,
  },
];
