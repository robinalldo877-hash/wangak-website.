import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WANGAK | Band",
  description: "Website resmi band WANGAK."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
