"use client";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Layout/Sidebar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";

// Fuentes
const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en" className="h-full">
      <body className={`${montserratFont.variable} ${robotoFont.variable} antialiased h-full w-full`}>
        <Providers>
          {!isLoginPage && (
            <>
              {/* Sidebar Fijo */}
              <Sidebar />

              {/* Notificaciones Eliminadas */}

              {/* Contenedor Principal */}
			  <main className="ml-80 flex-grow max-w-[calc(100vw-10px)] min-h-screen bg-white shadow-lg p-2 overflow-hidden">
			  {children}
              </main>
            </>
          )}

          {isLoginPage && <main className="w-full min-h-screen">{children}</main>}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
