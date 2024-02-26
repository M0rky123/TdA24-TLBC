import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   description: "Teacher digital Agency - Nejlepší internetový katalog s učiteli",
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
