import { TopBar } from "./signup/page";
import "./globals.css";

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
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
