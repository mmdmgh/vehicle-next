import { AuthProvider } from "./Provider";
import "./global.css";
import Navbar from "./Components/Navbar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-100 absolute top-0 -z-10 h-screen w-full">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
