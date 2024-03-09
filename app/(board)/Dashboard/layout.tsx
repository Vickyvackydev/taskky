import Dashboard from "@/components/dashboard";
import "./globals.css";
import AuthGuard from "@/context/AuthGuard";
import { SearchProvider } from "@/context/searchContext";

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
        {/* <AuthContextProvider> */}

        <AuthGuard>
          <SearchProvider>
            <Dashboard>
              <main className="transition-all duration-500">{children}</main>
            </Dashboard>
          </SearchProvider>
        </AuthGuard>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  );
}
