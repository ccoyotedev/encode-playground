import { create } from "ipfs";

declare global {
  var ipfs: any;
}

global.ipfs = await create();

export {};
