// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs";

interface ResData {
  cidPath: string;
}

export const getIPFSNode = async () => {
  console.log(global.ipfs);
  if (!global.ipfs) {
    console.log("Setting up node...");
    global.ipfs = await create();
  }
  return global.ipfs;
  return await create();
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  if (req.method === "POST") {
    const node = await getIPFSNode();

    const message = req.body.message;

    const cid = await node.add(message);

    console.log(cid.path);
    return res.send({ cidPath: cid.path });
  }
};

export default handler;
