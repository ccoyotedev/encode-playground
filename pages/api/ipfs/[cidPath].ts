// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import all from "it-all";

import { getIPFSNode } from "./index";

interface ResData {
  data: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  if (req.method === "GET") {
    const node = await getIPFSNode();

    const { cidPath } = req.query;
    const data = Buffer.concat(await all(node.cat(cidPath)));

    return res.send({ data: data.toString() });
  }
};

export default handler;
