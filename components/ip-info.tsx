"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Globe,
  MapPin,
  Building2,
  Clock,
  Server,
  Search,
  Copy,
  Check,
  Network,
  Map,
} from "lucide-react"

interface IPData {
  ip: string
  hostname: string
  domain?: string | null
  isp: string
  org: string
  country: string
  countryCode: string
  region: string
  city: string
  timezone: string
  localTime: string
  continent: string
  lat: number
  lon: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "🌍"
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export function IPInfo() {
  const [searchQuery, setSearchQuery] = useState("")
  const [lookupQuery, setLookupQuery] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Fetch user's own IP
  const { data: myIP, isLoading: isLoadingMyIP } = useSWR<IPData>(
    "/api/ip",
    fetcher
  )

  // Fetch looked up IP or domain
  const { data: lookedUpIP, isLoading: isLoadingLookup, error: lookupError } = useSWR<IPData>(
    lookupQuery ? `/api/ip/lookup?query=${encodeURIComponent(lookupQuery)}` : null,
    fetcher
  )

  const displayData = lookupQuery ? lookedUpIP : myIP
  const isLoading = lookupQuery ? isLoadingLookup : isLoadingMyIP

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLookupQuery(searchQuery.trim())
    }
  }

  const handleCopyIP = async () => {
    if (displayData?.ip) {
      await navigator.clipboard.writeText(displayData.ip)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setSearchQuery("")
    setLookupQuery(null)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <Globe className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Check IP
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Công cụ kiểm tra địa chỉ IP - IP Lookup - Check Hosting nhanh và chính xác
        </p>
      </div>

      {/* IP Display Card */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {lookupQuery 
                ? (displayData?.domain ? `IP của ${displayData.domain}` : "Địa chỉ IP đang tra cứu")
                : "Địa chỉ IP của bạn là"}
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Spinner className="h-6 w-6" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-primary sm:text-4xl">
                  {displayData?.ip || "---"}
                </span>
                <button
                  onClick={handleCopyIP}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  title="Sao chép IP"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            )}
            {!isLoading && displayData && (
              <p className="text-lg text-muted-foreground">
                {getFlagEmoji(displayData.countryCode)} {displayData.country}{" "}
                {displayData.city && `(${displayData.city})`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Kiểm tra IP / Domain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Nhập IP hoặc domain (VD: 8.8.8.8, google.com)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoadingLookup || !searchQuery.trim()}>
              {isLoadingLookup ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Kiểm tra</span>
            </Button>
            {lookupQuery && (
              <Button type="button" variant="outline" onClick={handleReset}>
                IP của tôi
              </Button>
            )}
          </form>
          <p className="text-sm text-muted-foreground mt-2">
            Nhập địa chỉ IP (8.8.8.8) hoặc tên miền website (google.com, facebook.com...)
          </p>
          {lookupError && (
            <p className="text-sm text-destructive mt-2">
              Không thể tra cứu. Vui lòng kiểm tra lại địa chỉ IP hoặc tên miền.
            </p>
          )}
        </CardContent>
      </Card>

      {/* IP Details */}
      {!isLoading && displayData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Thông tin chi tiết: {displayData.domain || displayData.ip}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {displayData.domain && (
                <InfoRow
                  icon={<Globe className="h-4 w-4" />}
                  label="Tên miền"
                  value={displayData.domain}
                />
              )}
              <InfoRow
                icon={<Server className="h-4 w-4" />}
                label="Địa chỉ IP"
                value={displayData.ip}
              />
              {!displayData.domain && (
                <InfoRow
                  icon={<Server className="h-4 w-4" />}
                  label="Tên máy chủ"
                  value={displayData.hostname}
                />
              )}
              <InfoRow
                icon={<Building2 className="h-4 w-4" />}
                label="Nhà cung cấp"
                value={displayData.isp}
              />
              <InfoRow
                icon={<Building2 className="h-4 w-4" />}
                label="Đơn vị"
                value={displayData.org}
              />
              <InfoRow
                icon={<Globe className="h-4 w-4" />}
                label="Quốc gia"
                value={`${getFlagEmoji(displayData.countryCode)} ${displayData.country} ${displayData.countryCode}`}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Khu vực"
                value={`${displayData.city}, ${displayData.region}`}
              />
              <InfoRow
                icon={<Clock className="h-4 w-4" />}
                label="Múi giờ"
                value={displayData.timezone}
              />
              <InfoRow
                icon={<Clock className="h-4 w-4" />}
                label="Giờ địa phương"
                value={displayData.localTime}
              />
              <InfoRow
                icon={<Map className="h-4 w-4" />}
                label="Châu lục"
                value={displayData.continent}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Tọa độ"
                value={`${displayData.lat}, ${displayData.lon}`}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Check IP / Check Hosting là gì?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Check IP</strong>, <strong>Check Hosting</strong>, <strong>IP Location</strong> - Kiểm tra địa chỉ IP của bạn (My IP Address), 
            kiểm tra hosting, website. Tra cứu chi tiết về IP như máy chủ, khu vực, nhà cung cấp, bản đồ, múi giờ và các thông tin khác.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tra cứu IP của website:</strong> Bạn có thể nhập tên miền website (VD: google.com, facebook.com) để xem địa chỉ IP của máy chủ hosting 
            và các thông tin chi tiết như vị trí máy chủ, nhà cung cấp dịch vụ hosting, múi giờ...
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Địa chỉ IP</strong> (IP viết tắt của Internet Protocol) là số định dạng cho một phần cứng mạng, 
            các thiết bị sử dụng địa chỉ IP để liên lạc với nhau qua mạng dựa trên IP như mạng Internet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hầu hết các địa chỉ IP có dạng như sau: <code className="px-1 py-0.5 bg-muted rounded text-sm">151.101.65.121</code> (IPv4). 
            Một số địa chỉ IP khác có dạng: <code className="px-1 py-0.5 bg-muted rounded text-sm">2001:4860:4860::8844</code> (IPv6).
          </p>
          <p className="text-sm text-muted-foreground italic mt-4">
            <strong>Lưu ý:</strong> Vị trí của IP được xác định dựa trên nhiều cơ sở dữ liệu định vị khác nhau nên kết quả chỉ mang tính ước lượng 
            chứ không hoàn toàn chính xác. Thông tin này được lấy từ các cơ sở dữ liệu định vị IP công khai.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2 w-40 shrink-0 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm">{value}</span>
    </div>
  )
}
