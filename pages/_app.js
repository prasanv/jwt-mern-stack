import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <Component {...pageProps} />
        <Footer></Footer>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
