/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar/Navbar";
import { UserProvider } from "./UserContext/UserProvider";
import { usePathname } from "next/navigation";
import { UsersProvider } from "./UsersContext/UsersProvider";
import { CasinoProvider } from "./CasinoContext/CasinoProvider";
import { CoinsProvider } from "./CoinsContext/CoinsProvider";

const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: 'REDTRON',
//   description: 'Casino Online',
// }

export default function RootLayout({ children }) {
  const path = usePathname();

  return (
    <html lang="en">
      <head>
        <title>REDTRON - Casino Online</title>
        <meta name="description" content="Casino Online" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <UsersProvider>
            <CasinoProvider>
              <CoinsProvider>
                {children}
                {path !== "/" ? <Navbar /> : null}
              </CoinsProvider>
            </CasinoProvider>
          </UsersProvider>
        </UserProvider>
      </body>
    </html>
  );
}
