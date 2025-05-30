import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { FavoriteProvider } from "../context/FavoriteContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoriteProvider>
      <Navbar foods={pageProps.foods || []} />
      <div className="background-wrapper" />
      <div className="background-blur-overlay" />
      <Component {...pageProps}  foods={pageProps.foods || []} />
    </FavoriteProvider>
  );
}
