import { TopBar } from "./signup/page";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
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
        {/* <AuthProvider> */}
        <TopBar />
        <main>{children}</main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
