import { Layout } from "components";
import { Button, ConsoleAlert, Input } from "components/ui/atoms";
import { useNotification } from "contexts/NotificationContext";
import { getRandomId } from "contexts/NotificationContext/actions";
import { ethers } from "ethers";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { abi } from "web3/abis/CoyoteToken.json";

const NFTPage = () => {
  const [, dispatch] = useNotification();

  const [ownerPub, setOwnerPub] = useState<string>();
  const [ownerPriv, setOwnerPriv] = useState<string>();
  const [contract, setContract] = useState<ethers.Contract>();

  const [mint, setMint] = useState<{ body: React.ReactNode }>();
  const [contractDetails, setContractDetails] = useState<{
    name: string;
    balance: number;
  }>();

  const [ownerInput, setOwnerInput] = useState("");
  const [ownersTokens, setOwnersTokens] = useState<
    {
      name: string;
      id: string;
      uri: string;
    }[]
  >([]);

  const fetchContract = () => {
    //	Smart	contract	ABI
    const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    //	Initialise	ethers	library
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545"
    );
    //	Set	variable	here	for	reuse
    const pubKey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const privKey =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    setOwnerPub(pubKey);
    setOwnerPriv(privKey);
    const wallet = new ethers.Wallet(privKey);

    // Connect
    const signer = wallet.connect(provider);

    //	Initialise	contract
    const coyoteNft = new ethers.Contract(nftAddress, abi, signer);
    setContract(coyoteNft);
  };

  const getContractDetails = async (
    nftContract: ethers.Contract,
    owner: string
  ) => {
    const name = await nftContract.name();
    const balance = await nftContract.balanceOf(owner);

    setContractDetails({ name, balance: Number(balance) });
    dispatch({
      type: "SHOW_NOTIFICATION",
      notification: {
        id: getRandomId(),
        title: "Contract Details",
        type: "CHAIN",
        body: (
          <div>
            <p>
              <b>Name: </b>
              {name}
            </p>
            <p>
              <b>Balance: </b>
              {Number(balance)}
            </p>
          </div>
        ),
        time: new Date(),
      },
    });
  };

  const handleMintToken = async (
    nftContract: ethers.Contract,
    owner: string
  ) => {
    const mint = await nftContract.mintToken(owner, "abc.com");
    const initBody = (
      <div>
        <p>
          <b>Hash: </b>
          {mint.hash}
        </p>
        <p>
          <b>Status: </b>Pending
        </p>
      </div>
    );
    setMint({ body: initBody });
    dispatch({
      type: "SHOW_NOTIFICATION",
      notification: {
        id: getRandomId(),
        title: "Mint NFT",
        type: "CHAIN",
        body: initBody,
        time: new Date(),
      },
    });
    const res = await mint.wait();
    if (res.status === 1) {
      const successBody = (
        <div>
          <p>
            <b>Hash: </b>
            {mint.transactionHash}
          </p>
          <p>
            <b>From: </b>
            {mint.from}
          </p>
          <p>
            <b>To: </b>
            {mint.to}
          </p>
          <p>
            <b>Status: </b>Success
          </p>
        </div>
      );
      dispatch({
        type: "SHOW_NOTIFICATION",
        notification: {
          id: getRandomId(),
          title: "Mint NFT",
          type: "CHAIN",
          body: successBody,
          time: new Date(),
        },
      });
      setMint({ body: successBody });
    }
  };

  const balanceOfOwner = async (
    nftContract: ethers.Contract,
    owner: string
  ) => {
    const recievedFilter = nftContract.filters.Transfer(null, owner);
    const sentFilter = nftContract.filters.Transfer(owner);

    const recievedEvents = await nftContract.queryFilter(recievedFilter);
    const recievedTokenIds = recievedEvents.map((event) => event.args?.tokenId);

    const sentEvents = await nftContract.queryFilter(sentFilter);
    const sentTokenIds = sentEvents.map((event) => event.args?.tokenId);

    sentTokenIds.forEach((tokenId: ethers.BigNumber) => {
      const index = recievedTokenIds.indexOf(
        (recievedTokenId: ethers.BigNumber) => recievedTokenId.eq(tokenId)
      );
      if (index >= 0) {
        recievedTokenIds.splice(index, 1);
      }
    });
    console.log(recievedTokenIds);

    const name = await nftContract.name();
    const usersTokensMetadetail = await Promise.all<{
      id: string;
      uri: string;
      name: string;
    }>(
      recievedTokenIds.map(async (id) => {
        const uri = await nftContract.tokenURI(id);
        return {
          id: id.toString(),
          uri,
          name,
        };
      })
    );
    console.log(usersTokensMetadetail);
    setOwnersTokens(usersTokensMetadetail);
  };

  useEffect(() => {
    fetchContract();
  }, []);

  return (
    <Layout
      metadetails={{
        title: "NFT | Encode Playground",
        description: "Page for testing minting + Viewing NFTs",
      }}
    >
      <div className="container">
        <h3>Homework 8</h3>
        <h1>Interacting with NFTs</h1>
        <p style={{ color: `rgba(0,0,0,0.6)` }}>
          DApps offer the benefits of interacting with blockchains to existing
          and novel services.
        </p>
        <p style={{ color: `rgba(0,0,0,0.6)` }}>
          A multitude of ideas are being tested and trialled with the optimal
          model for each application being determined via trial and error
        </p>
        <p style={{ color: `rgba(0,0,0,0.6)` }}>
          DApps must try to improve on the UX on top of offering novel features
          to be successful.
        </p>
        <div
          style={{
            maxWidth: "400px",
            marginTop: "2.5rem",
          }}
        >
          <h2>Coyote Token</h2>
          <div style={{ marginBottom: "1.2rem" }}>
            <Button
              disabled={!contract || !ownerPub}
              onClick={() =>
                contract && ownerPub && getContractDetails(contract, ownerPub)
              }
            >
              Get Details
            </Button>
            {contractDetails && (
              <ConsoleAlert type="CHAIN">
                <p>
                  <b>Name: </b>
                  {contractDetails.name}
                </p>
                <p>
                  <b>Balance: </b>
                  {contractDetails.balance}
                </p>
              </ConsoleAlert>
            )}
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <Button
              disabled={!contract || !ownerPub}
              onClick={() =>
                contract && ownerPub && handleMintToken(contract, ownerPub)
              }
            >
              Mint Token
            </Button>
            {mint && <ConsoleAlert type="CHAIN">{mint.body}</ConsoleAlert>}
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <Input
              label="Get accounts Coyote Tokens"
              placeholder="Public key..."
              value={ownerInput}
              onChange={(e) => setOwnerInput(e.target.value)}
              onSubmit={() => contract && balanceOfOwner(contract, ownerInput)}
            />
            <div
              style={{
                marginTop: "1.2rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.8rem",
              }}
            >
              {ownersTokens.map((token, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      border: "1px solid rgba(0,0,0,0.2)",
                      padding: "0.4rem",
                    }}
                  >
                    <p>
                      <b>Id: </b>
                      {token.id}
                    </p>
                    <p>
                      <b>Name: </b>
                      {token.name}
                    </p>
                    <p>
                      <b>URI: </b>
                      {token.uri}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NFTPage;
