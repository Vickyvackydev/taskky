import "./globals.css";
import Homepage from "@/components/homepage";

export const metadata = {
  title: "Task",
  description: "Welcome to our page",
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
