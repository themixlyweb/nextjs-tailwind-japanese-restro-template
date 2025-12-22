import type { Metadata } from "next";
import "./globals.css";
import { Covered_By_Your_Grace } from "next/font/google";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify"

const coveredByYourGrace = Covered_By_Your_Grace({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-covered-grace",
});


export const metadata: Metadata = {
  title:
    "Ramen Junction - React & Next.js Japanese Restaurant Website Template",
  description:
    "Ramen Junction is a modern React & Next.js restaurant template for ramen, sushi, and Asian food businesses with fast performance, responsive design, and SEO-ready pages.",
  authors: [{ name: "Ramen Junction" }],
  metadataBase: new URL("https://themixly.com"),
  alternates: {
    canonical:
      "https://themixly.com/preview/2441/ramen-junction-react-next-js-template-for-japanese-restaurant/",
  },

  openGraph: {
    type: "website",
    siteName: "Crumbella",
    title:
      "Ramen Junction - React & Next.js Japanese Restaurant Website Template",
    description:
      "Ramen Junction is a modern React & Next.js restaurant template for ramen, sushi, and Asian food businesses with fast performance, responsive design, and SEO-ready pages.",
    url:
      "https://themixly.com/preview/2441/ramen-junction-react-next-js-template-for-japanese-restaurant/",
    images: [
      {
        url: "https://themixly.com/wp-content/uploads/2025/12/Artboard-2-2-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Ramen Junction preview image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Ramen Junction - React & Next.js Japanese Restaurant Website Template",
    description:
      "Ramen Junction is a modern React & Next.js restaurant template for ramen, sushi, and Asian food businesses with fast performance, responsive design, and SEO-ready pages.",
    images: [
      "https://themixly.com/wp-content/uploads/2025/12/Artboard-2-2-scaled.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${coveredByYourGrace.variable} antialiased`}>
        <style>
          {`
            body {
              margin: 0;
              font-family: var(--font-geist-sans), sans-serif;
            }
            header {
              display: block;
            }
          `}
        </style>

        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
