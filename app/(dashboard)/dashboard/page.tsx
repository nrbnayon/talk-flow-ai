import DashboardHeader from "@/components/Dashboard/Shared/DashboardHeader";

export default function DashboardPage() {
  return (
      <div>
        <DashboardHeader title="Admin Dashboard" description="Welcome back! Here's an overview of your platform" />
        <div className="p-4 md:p-8">
          Welcome to the dashboard
        </div>
      </div>
  )
}
