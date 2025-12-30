import { FileText, CheckCircle, FileCheck } from "lucide-react";

interface ActivityItem {
  name: string;
  action: string;
  time: string;
  type: "submit" | "complete" | "update";
}

const recentActivityData: ActivityItem[] = [
  {
    name: "John Doe",
    action: "Submitted new claim",
    time: "2 min ago",
    type: "submit",
  },
  {
    name: "Sarah Smith",
    action: "Completed claim processing",
    time: "25 min ago",
    type: "complete",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
    type: "update",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
    type: "update",
  },
  {
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
    type: "update",
  },
];

const getIconByType = (type: string) => {
  switch (type) {
    case "submit":
      return <FileText className="w-5 h-5" />;
    case "complete":
      return <CheckCircle className="w-5 h-5" />;
    case "update":
      return <FileCheck className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

export default function RecentActivityList() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto"
        style={{ boxShadow: "6px 6px 40px 0px #00000014" }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-gray-400 mt-1">
            Latest actions across the platform
          </p>
        </div>
        <div className="space-y-3">
          {recentActivityData.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 shrink-0">
                {getIconByType(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {activity.name}
                      <span className="text-gray-400 ml-2">
                        {activity.action}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
