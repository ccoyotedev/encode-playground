import "../styles/globals.css";
import type { AppProps } from "next/app";
import NotificationContextProvider from "contexts/NotificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Component {...pageProps} />
    </NotificationContextProvider>
  );
}

export default MyApp;
