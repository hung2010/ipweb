import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  
  // Get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  const vercelForwardedFor = headersList.get('x-vercel-forwarded-for')
  
  // Parse the first IP from x-forwarded-for if it contains multiple IPs
  const ip = vercelForwardedFor?.split(',')[0]?.trim() 
    || forwardedFor?.split(',')[0]?.trim() 
    || realIp 
    || '127.0.0.1'
  
  try {
    // Use ip-api.com for geolocation (free, no API key required)
    const geoResponse = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { next: { revalidate: 60 } }
    )
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch geolocation')
    }
    
    const geoData = await geoResponse.json()
    
    if (geoData.status === 'fail') {
      // Return basic info if geolocation fails
      return Response.json({
        ip,
        hostname: ip,
        isp: 'Unknown',
        org: 'Unknown',
        country: 'Unknown',
        countryCode: '',
        region: 'Unknown',
        city: 'Unknown',
        timezone: 'Unknown',
        localTime: new Date().toISOString(),
        continent: 'Unknown',
        lat: 0,
        lon: 0,
      })
    }
    
    // Determine continent based on country code
    const continentMap: Record<string, string> = {
      // Asia
      'VN': 'Asia (AS)', 'CN': 'Asia (AS)', 'JP': 'Asia (AS)', 'KR': 'Asia (AS)', 
      'TH': 'Asia (AS)', 'SG': 'Asia (AS)', 'MY': 'Asia (AS)', 'ID': 'Asia (AS)',
      'PH': 'Asia (AS)', 'IN': 'Asia (AS)', 'TW': 'Asia (AS)', 'HK': 'Asia (AS)',
      // Europe
      'DE': 'Europe (EU)', 'FR': 'Europe (EU)', 'GB': 'Europe (EU)', 'IT': 'Europe (EU)',
      'ES': 'Europe (EU)', 'NL': 'Europe (EU)', 'PL': 'Europe (EU)', 'BE': 'Europe (EU)',
      'SE': 'Europe (EU)', 'NO': 'Europe (EU)', 'DK': 'Europe (EU)', 'FI': 'Europe (EU)',
      'CH': 'Europe (EU)', 'AT': 'Europe (EU)', 'PT': 'Europe (EU)', 'IE': 'Europe (EU)',
      'RU': 'Europe (EU)', 'UA': 'Europe (EU)', 'CZ': 'Europe (EU)', 'RO': 'Europe (EU)',
      // North America
      'US': 'North America (NA)', 'CA': 'North America (NA)', 'MX': 'North America (NA)',
      // South America
      'BR': 'South America (SA)', 'AR': 'South America (SA)', 'CL': 'South America (SA)',
      'CO': 'South America (SA)', 'PE': 'South America (SA)',
      // Africa
      'ZA': 'Africa (AF)', 'EG': 'Africa (AF)', 'NG': 'Africa (AF)', 'KE': 'Africa (AF)',
      // Oceania
      'AU': 'Oceania (OC)', 'NZ': 'Oceania (OC)',
    }
    
    const continent = continentMap[geoData.countryCode] || 'Unknown'
    
    // Calculate local time based on timezone
    let localTime = new Date().toISOString()
    try {
      localTime = new Date().toLocaleString('vi-VN', { timeZone: geoData.timezone })
    } catch {
      // Fallback to UTC
    }
    
    return Response.json({
      ip: geoData.query || ip,
      hostname: geoData.query || ip,
      isp: geoData.isp || 'Unknown',
      org: geoData.as || 'Unknown',
      country: geoData.country || 'Unknown',
      countryCode: geoData.countryCode || '',
      region: geoData.regionName || 'Unknown',
      city: geoData.city || 'Unknown',
      timezone: geoData.timezone || 'Unknown',
      localTime,
      continent,
      lat: geoData.lat || 0,
      lon: geoData.lon || 0,
    })
  } catch (error) {
    console.error('Error fetching IP info:', error)
    return Response.json({
      ip,
      hostname: ip,
      isp: 'Unknown',
      org: 'Unknown',
      country: 'Unknown',
      countryCode: '',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'Unknown',
      localTime: new Date().toISOString(),
      continent: 'Unknown',
      lat: 0,
      lon: 0,
    })
  }
}
