export default function sitemap() {
  const baseUrl = "https://prev.io.vn"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/check-ip`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tra-cuu-ma-so-thue`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/pdf-to-image`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pdf-to-word`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pdf-to-excel`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/images-to-pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compress-pdf`,
      lastModified: new Date(),
    },

    // pages bắt buộc (Adsense + SEO trust)
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ]
}