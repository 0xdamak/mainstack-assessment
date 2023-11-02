import { type Metadata } from "next";
import AxiosProvider, { QueryProvider } from "../utils/Providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Mainstack - Modern Software and Embedded Payments for Entrepreneurs",
  description:
    "The all-in-one platform for entrepreneurs, creators, and businesses to showcase their work, sell products and services with global payment options. Build your community, and track analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryProvider>
      <AxiosProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </AxiosProvider>
    </QueryProvider>
  );
}
