import Dashboard from "@/components/dashboard";
import "./globals.css";
import AuthGuard from "@/context/AuthGuard";
import { SearchProvider } from "@/context/searchContext";
import { ThemeProviders } from "@/Theme-Provider/themeprovider";

export const metadata = {
  title: "Dashboard",
  description: "See all your activities in your dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-bg_black">
        <AuthGuard>
          <SearchProvider>
            <ThemeProviders>
              <Dashboard>
                <main className="transition-all duration-500">{children}</main>
              </Dashboard>
            </ThemeProviders>
          </SearchProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
