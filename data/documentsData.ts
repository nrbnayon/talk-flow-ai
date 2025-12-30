export interface IDocument {
  id: string;
  claimant: string;
  documentName: string;
  provider: string;
  signedDate: string;
  status: "Signed" | "In Progress";
}

export const documentsData: IDocument[] = [
  {
    id: "1",
    claimant: "Sarah Johnson",
    documentName: "Claim Form CF-2847",
    provider: "DocuSign",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "2",
    claimant: "John Smith",
    documentName: "Claim Form CF-2847",
    provider: "Drop Box",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "3",
    claimant: "Michael Chen",
    documentName: "Claim Form CF-2847",
    provider: "DocuSign",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "4",
    claimant: "Emily Davis",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
  {
    id: "5",
    claimant: "Robert Taylor",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
  {
    id: "6",
    claimant: "Sarah Johnson",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
  {
    id: "7",
    claimant: "John Smith",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
  {
    id: "8",
    claimant: "Michael Chen",
    documentName: "Claim Form CF-2847",
    provider: "Drop Box",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "9",
    claimant: "Emily Davis",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
  {
    id: "10",
    claimant: "Robert Taylor",
    documentName: "Claim Form CF-2847",
    provider: "Drop Box",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "11",
    claimant: "Sarah Johnson",
    documentName: "Claim Form CF-2847",
    provider: "Drop Box",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "12",
    claimant: "John Smith",
    documentName: "Claim Form CF-2847",
    provider: "DocuSign",
    signedDate: "Dec 5, 2025 4:30PM",
    status: "Signed",
  },
  {
    id: "13",
    claimant: "Michael Chen",
    documentName: "-",
    provider: "-",
    signedDate: "-",
    status: "In Progress",
  },
];
