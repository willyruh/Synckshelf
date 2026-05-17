import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SynckShelf | Inventory Intelligence Platform",
  description:
    "AI-powered perishable inventory management. Reduce waste, maximize profit with predictive logistics.",
  keywords: ["inventory management", "perishable goods", "AI forecasting", "supply chain"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-on-background antialiased">
        {children}
      </body>
    </html>
  );
}
