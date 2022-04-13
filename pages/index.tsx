import type { NextPage } from "next";
import { Layout } from "components";

const Home: NextPage = () => {
  return (
    <Layout
      metadetails={{
        title: "Encode Playground",
        description: "App to showoff my Encode Homework",
      }}
    >
      <div className="container">
        <h1>Welcome to my Encode Homework.</h1>
      </div>
    </Layout>
  );
};

export default Home;
