import Dashboard from "@/components/dashboard";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Dashboard",
  description: "See your all your activities in your dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Dashboard>
            <main className="transition-all duration-500">{children}</main>
          </Dashboard>
        </AuthContextProvider>
      </body>
    </html>
  );
}
