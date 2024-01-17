import ProviderAuthContex from "@/services/authProvide";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderAuthContex>
      <Component {...pageProps} />
    </ProviderAuthContex>
  );
}
