import "./globals.css";
import Homepage from "@/components/homepage";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Homepage>{children}</Homepage>
      </body>
    </html>
  );
}
