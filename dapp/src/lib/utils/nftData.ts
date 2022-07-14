import axios from 'axios';

import { TNftData, TNftImage, TNftMetadata } from '@/types/nft.types';

const TOKEN_NAME = 'BBC';
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
const METADATA_PREFIX = 'QmWYZ5ibdydZZHWdnPutxrEPWkzENL8z7zMGTPBbg7uSxj';
const IMAGE_PREFIX = 'QmQF23AYjEx5R7SGtKQ3NRgeeUiY572HM6QqN2mUW2HaFU';

async function getNftMetadata(id: number): Promise<TNftMetadata> {
  const data = await axios
    .get(`${IPFS_GATEWAY}/${METADATA_PREFIX}/${id}.json`)
    .then((res) => {
      return res.data;
    });

  return {
    name: `${TOKEN_NAME} #${id}`,
    rank: data.attributes[1].value,
  };
}

async function getNftImage(id: number): Promise<TNftImage> {
  return `${IPFS_GATEWAY}/${IMAGE_PREFIX}/${id}.png`;
}

export async function getNftData(id: number): Promise<TNftData> {
  const metadata = await getNftMetadata(id);
  const image = await getNftImage(id);

  return {
    id,
    name: metadata.name,
    rank: metadata.rank,
    image,
  };
}

export async function getNftsData(ids: number[]): Promise<TNftData[]> {
  const data = await Promise.all(
    ids.map(async (id) => {
      return await getNftData(id);
    })
  );

  return data;
}
