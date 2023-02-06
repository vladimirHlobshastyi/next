import "./../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store.tsx";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
