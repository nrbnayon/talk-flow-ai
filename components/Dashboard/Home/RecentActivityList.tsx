// ===== components/Dashboard/Home/RecentActivityList.tsx =====
interface RecentActivityListProps {
  className?: string;
}

interface ActivityItem {
  name: string;
  action: string;
  time: string;
}

const recentActivityData: ActivityItem[] = [
  {
    name: "John Doe",
    action: "Submitted new claim",
    time: "2 min ago",
  },
  {
    name: "Sarah Smith",
    action: "Completed claim processing",
    time: "25 min ago",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
];

export function RecentActivityList({ className }: RecentActivityListProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-secondary mt-1">Latest actions across the platform</p>
      </div>
      <div className="space-y-4">
        {recentActivityData.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            >
              {getInitials(activity.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.name}
                  </p>
                  <p className="text-sm text-secondary truncate">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-secondary mt-1 block">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}