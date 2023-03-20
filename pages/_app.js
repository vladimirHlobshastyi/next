import "./../styles/globals.css";
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

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  const data = await response.json();

  return { props: { categories: data }, revalidate: 86400 };
}
