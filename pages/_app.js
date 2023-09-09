import Layout from "@/components/Layout";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

/**
 * The function exports a React component that wraps the provided Component with an AuthProvider and a
 * Layout component.
 * @returns a JSX element. It is wrapping the `Component` with the `AuthProvider` and `Layout`
 * components. The `AuthProvider` component is likely responsible for providing authentication-related
 * functionality to the `Component`, while the `Layout` component is responsible for providing a
 * consistent layout or structure to the `Component`.
 */
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
