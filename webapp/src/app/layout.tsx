"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserContext } from "@/context/UserContext";
import { getAuthFromLocalStorage } from "@/lib/authFromLocalStorage";
import { defaultSystem } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { username, jobTitle } = getAuthFromLocalStorage();

  return (
    <html lang="en">
      <head>
        <title>Rick and Morty World</title>
        <meta
          name="description"
          content="A web app to explore the Rick and Morty universe"
        />
      </head>
      <UserContext.Provider
        value={{ username: username ?? null, jobTitle: jobTitle ?? null }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable}`}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChakraProvider value={defaultSystem}>
            <Header />
            {children}
            <Footer />
          </ChakraProvider>
        </body>
      </UserContext.Provider>
    </html>
  );
}
