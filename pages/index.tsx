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
        <h1>Encode Solidity Bootcamp Homework</h1>
        <h3>- By Caleb Brown</h3>
      </div>
    </Layout>
  );
};

export default Home;
