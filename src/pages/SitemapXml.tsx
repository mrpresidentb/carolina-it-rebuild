
import React from "react";
import { Navigate } from "react-router-dom";
import { defaultSettings } from "@/hooks/useSettings";

// List of public routes you want in the sitemap:
const PUBLIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/services", priority: 0.9, changefreq: "monthly" },
  { path: "/printers", priority: 0.9, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", priority: 0.8, changefreq: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-of-use", priority: 0.3, changefreq: "yearly" }
];

function getBaseUrl() {
  // Attempt to use canonicalUrl if set, fallback to window.location.origin
  const canonical = defaultSettings.seo.advanced.canonicalUrl;
  return canonical || (typeof window !== "undefined" ? window.location.origin : "https://itcarolina.lovable.app");
}

const buildSitemapXml = () => {
  const base = getBaseUrl();
  const urls = PUBLIC_ROUTES.map(route => {
    return `<url>
  <loc>${base}${route.path}</loc>
  <changefreq>${route.changefreq}</changefreq>
  <priority>${route.priority}</priority>
</url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

const SitemapXml: React.FC = () => {
  // Send raw XML on mount
  React.useEffect(() => {
    const xml = buildSitemapXml();
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    window.location.replace(url); // Not best for SEO crawlers; better to just display raw XML
  }, []);
  // Instead, just render XML for bots
  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
      {buildSitemapXml()}
    </pre>
  );
};

export default SitemapXml;
