import { TopBar } from "./signup/page";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
export const metadata = {
  title: "Auth",
  description: "signup/login ",
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
