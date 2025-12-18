// ===== components/Dashboard/Home/PendingClaimsList.tsx =====
interface PendingClaimsListProps {
  className?: string;
}

interface ClaimItem {
  badge: string;
  title: string;
  time: string;
}

const pendingClaimsData: ClaimItem[] = [
  {
    badge: "New Claim",
    title: "Sarah Johnson - Vehicle Damage",
    time: "5 min ago",
  },
  {
    badge: "Claim Update",
    title: "John Smith - Claim #482",
    time: "15 min ago",
  },
  {
    badge: "User Verification",
    title: "Mike Chen - Documents",
    time: "1 hour ago",
  },
  {
    badge: "Priority Claim",
    title: "Emergency Claim #892",
    time: "2 hours ago",
  },
];

const badgeStyles: Record<string, string> = {
  "New Claim": "bg-[#8B5CF6] text-white",
  "Claim Update": "bg-[#3B82F6] text-white",
  "User Verification": "bg-[#10B981] text-white",
  "Priority Claim": "bg-[#EF4444] text-white"
};

export function PendingClaimsList({ className }: PendingClaimsListProps) {
  return (
    <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Pending Claims</h3>
        <p className="text-sm text-secondary mt-1">Claims requiring your attention</p>
      </div>
      <div className="space-y-4">
        {pendingClaimsData.map((claim, index) => (
          <div 
            key={index} 
            className="flex flex-col gap-2 pb-4 border-b border-gray-700 last:border-b-0 last:pb-0"
          >
            <span 
              className={`text-xs px-3 py-1 rounded-full inline-block w-fit ${badgeStyles[claim.badge] || 'bg-gray-600 text-white'}`}
            >
              {claim.badge}
            </span>
            <h4 className="text-sm font-medium text-foreground">{claim.title}</h4>
            <span className="text-xs text-secondary">{claim.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}