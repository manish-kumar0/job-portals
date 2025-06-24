import { JobAlerts } from "@/components/job-alerts"

export default function JobAlertsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <JobAlerts />
      </div>
    </div>
  )
}
