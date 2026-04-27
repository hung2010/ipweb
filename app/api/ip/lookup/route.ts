import { resolve } from "dns/promises"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('ip') || searchParams.get('query')
  
  if (!query) {
    return Response.json({ error: 'IP address or domain is required' }, { status: 400 })
  }
  
  // Validate IP format
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(([0-9a-fA-F]{1,4}:)*)?::([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/
  
  // Domain regex - matches domain.com, sub.domain.com, etc.
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  
  let ipToLookup = query.trim()
  let hostname = query.trim()
  let isDomain = false
  
  // Check if it's a domain
  if (!ipv4Regex.test(query) && !ipv6Regex.test(query)) {
    // Could be a domain, try to resolve it
    let domain = query.trim()
    
    // Remove protocol if present
    domain = domain.replace(/^https?:\/\//, '')
    // Remove path if present
    domain = domain.split('/')[0]
    // Remove port if present
    domain = domain.split(':')[0]
    // Remove www if present
    domain = domain.replace(/^www\./, '')
    
    hostname = domain
    
    // Check if it looks like a domain
    if (!domainRegex.test(domain) && !domain.includes('.')) {
      return Response.json({ error: 'Invalid IP address or domain format' }, { status: 400 })
    }
    
    try {
      // Resolve domain to IP
      const addresses = await resolve(domain)
      if (addresses && addresses.length > 0) {
        ipToLookup = addresses[0]
        isDomain = true
      } else {
        return Response.json({ error: 'Could not resolve domain to IP address' }, { status: 400 })
      }
    } catch (error) {
      console.error('DNS resolution error:', error)
      return Response.json({ error: 'Could not resolve domain. Please check the domain name.' }, { status: 400 })
    }
  }
  
  try {
    const geoResponse = await fetch(
      `http://ip-api.com/json/${ipToLookup}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { next: { revalidate: 60 } }
    )
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch geolocation')
    }
    
    const geoData = await geoResponse.json()
    
    if (geoData.status === 'fail') {
      return Response.json({ error: geoData.message || 'Unable to lookup IP' }, { status: 400 })
    }
    
    const continentMap: Record<string, string> = {
      'VN': 'Asia (AS)', 'CN': 'Asia (AS)', 'JP': 'Asia (AS)', 'KR': 'Asia (AS)', 
      'TH': 'Asia (AS)', 'SG': 'Asia (AS)', 'MY': 'Asia (AS)', 'ID': 'Asia (AS)',
      'PH': 'Asia (AS)', 'IN': 'Asia (AS)', 'TW': 'Asia (AS)', 'HK': 'Asia (AS)',
      'DE': 'Europe (EU)', 'FR': 'Europe (EU)', 'GB': 'Europe (EU)', 'IT': 'Europe (EU)',
      'ES': 'Europe (EU)', 'NL': 'Europe (EU)', 'PL': 'Europe (EU)', 'BE': 'Europe (EU)',
      'SE': 'Europe (EU)', 'NO': 'Europe (EU)', 'DK': 'Europe (EU)', 'FI': 'Europe (EU)',
      'CH': 'Europe (EU)', 'AT': 'Europe (EU)', 'PT': 'Europe (EU)', 'IE': 'Europe (EU)',
      'RU': 'Europe (EU)', 'UA': 'Europe (EU)', 'CZ': 'Europe (EU)', 'RO': 'Europe (EU)',
      'US': 'North America (NA)', 'CA': 'North America (NA)', 'MX': 'North America (NA)',
      'BR': 'South America (SA)', 'AR': 'South America (SA)', 'CL': 'South America (SA)',
      'CO': 'South America (SA)', 'PE': 'South America (SA)',
      'ZA': 'Africa (AF)', 'EG': 'Africa (AF)', 'NG': 'Africa (AF)', 'KE': 'Africa (AF)',
      'AU': 'Oceania (OC)', 'NZ': 'Oceania (OC)',
    }
    
    const continent = continentMap[geoData.countryCode] || 'Unknown'
    
    let localTime = new Date().toISOString()
    try {
      localTime = new Date().toLocaleString('vi-VN', { timeZone: geoData.timezone })
    } catch {
      // Fallback to UTC
    }
    
    return Response.json({
      ip: geoData.query || ipToLookup,
      hostname: isDomain ? hostname : (geoData.query || ipToLookup),
      domain: isDomain ? hostname : null,
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
    return Response.json({ error: 'Failed to lookup IP address' }, { status: 500 })
  }
}
