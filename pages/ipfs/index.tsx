import { Layout } from "components";
import { IPFSPost, IPFSGet } from "components/sections";

const IPFSPage = () => {
  return (
    <Layout
      metadetails={{
        title: "IPFS | Encode Playground",
        description: "Page for testing IPFS",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "700px" }}>
          <h3>Homework 7</h3>

          <h1>Decentralised Storage</h1>

          <p style={{ color: `rgba(0,0,0,0.6)` }}>
            Decentralised storage providers allow participants to store data
            online without fear of location-based restrictions.
          </p>
          <p style={{ color: `rgba(0,0,0,0.6)` }}>
            Data stored in this manner is uniquely identified based on the
            contents to avoid clashing. This also acts as a retrieval mechanism
            to ensure you're getting the promised information.
          </p>
          <p style={{ color: `rgba(0,0,0,0.6)` }}>
            Data stored in free decentralised storage should be treated as
            volatile as it may not be stored for extended periods of time,
            especially if it's not being accessed.
          </p>
          <p style={{ color: `rgba(0,0,0,0.6)` }}>
            Immutable storage is available from third-party providers or by
            'pinning' data
          </p>
        </div>
        <div style={{ maxWidth: "500px", marginTop: "24px" }}>
          <h2>IPFS</h2>

          <IPFSPost />
          <IPFSGet />
        </div>
      </div>
    </Layout>
  );
};

export default IPFSPage;
