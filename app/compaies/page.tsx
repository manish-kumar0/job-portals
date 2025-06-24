import { CompanyProfiles } from "@/components/company-profiles"

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <CompanyProfiles />
      </div>
    </div>
  )
}
