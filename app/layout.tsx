import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const JosefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={JosefinSans.className}>{children}</body>
    </html>
  );
}
