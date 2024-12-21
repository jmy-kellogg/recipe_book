import Layout from "../components/layout";

export default function RecipeBook({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
