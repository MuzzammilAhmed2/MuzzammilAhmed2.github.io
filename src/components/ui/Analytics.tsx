import Script from "next/script";

// Cloudflare Web Analytics: cookie-free, no personal data. Loads only when the token is set
// (repo variable NEXT_PUBLIC_CF_BEACON_TOKEN, see README).
const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function Analytics() {
  if (!token) return null;
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token, spa: true })}
    />
  );
}
