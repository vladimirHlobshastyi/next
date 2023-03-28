/* import "./../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

export default function MyApp({ Component, pageProps, categories }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout categories={categories}>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  const data = await response.json();
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { categories: data, pageProps };
};
 */

import "./../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
