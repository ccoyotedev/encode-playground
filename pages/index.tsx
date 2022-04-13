import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const [postData, setPostData] = useState("");
  const [cidPath, setCidPath] = useState();

  const [fetchPath, setFetchPath] = useState("");
  const [returnedData, setReturnedData] = useState();

  const handlePostToIPFS = async (value: string) => {
    const res = await fetch("/api/ipfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: value }),
    });
    const json = await res.json();
    setCidPath(json.cidPath);
  };

  const fetchDataFromIPFS = async (path: string) => {
    const res = await fetch(`/api/ipfs/${path}`, {
      method: "GET",
    });
    const json = await res.json();
    setReturnedData(json.data);
  };

  return (
    <div className={styles.container}>
      <div>
        <input value={postData} onChange={(e) => setPostData(e.target.value)} />
        <button disabled={!postData} onClick={() => handlePostToIPFS(postData)}>
          Post data
        </button>
        {cidPath && (
          <div>
            <h2>Cid Path</h2>
            <p>{cidPath}</p>
          </div>
        )}
      </div>
      <div>
        <input
          value={fetchPath}
          onChange={(e) => setFetchPath(e.target.value)}
        />
        <button
          disabled={!fetchPath}
          onClick={() => fetchDataFromIPFS(fetchPath)}
        >
          Fetch
        </button>
        {returnedData && (
          <div>
            <h2>Returned data</h2>
            <p>{returnedData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
