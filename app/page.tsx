"use client"

import { useState } from "react"
import { IPInfo } from "@/components/ip-info"
import { TaxLookup } from "@/components/tax-lookup"
import { Globe, Building2 } from "lucide-react"

type Tab = "ip" | "tax"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("ip")

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
            <button
              onClick={() => setActiveTab("ip")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "ip"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              Check IP
            </button>
            <button
              onClick={() => setActiveTab("tax")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "tax"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Mã Số Thuế
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "ip" ? <IPInfo /> : <TaxLookup />}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Check IP | Tra cứu Mã Số Thuế - Công cụ tra cứu miễn phí
          </p>
        </footer>
      </div>
    </main>
  )
}
