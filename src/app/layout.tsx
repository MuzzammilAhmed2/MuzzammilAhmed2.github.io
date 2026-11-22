import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Loader from "@/components/ui/Loader";
import Cursor from "@/components/ui/Cursor";
import AuraCursor from "@/components/ui/AuraCursor";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Data Engineer & BI Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Data Engineer", "BI Developer", "Power BI", "Microsoft Fabric", "Azure", "Snowflake", "AWS",
    "RAG", "Generative AI", "KYC", "Karachi", "Freelance data engineer", "DP-700", "PL-300",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Data Engineer & BI Developer`,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Data Engineer & BI Developer`,
    description: site.description,
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role.replace(/ · /g, ", "),
  worksFor: { "@type": "Organization", name: site.company },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  alumniOf: "Dawood University of Engineering & Technology",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="grain min-h-screen overflow-x-clip">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`[data-loader]{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Loader />
          <AuraCursor />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
