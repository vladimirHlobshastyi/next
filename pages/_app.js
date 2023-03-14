import "./../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store.tsx";

export default function MyApp({ Component, pageProps, categories }) {
  return (
    <Provider store={store}>
      <Layout categories={categories}>
        <Component {...pageProps}  />
      </Layout>
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

