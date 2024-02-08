import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetaData } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark scroll-smooth">
      <body
        className={cn(
          "relative h-full font-sans antialiased bg-background",
          inter.className,
          ""
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1 bg-[url('/Background.png')] bg-no-repeat bg-left-bottom">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
