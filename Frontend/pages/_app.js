import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';

import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;