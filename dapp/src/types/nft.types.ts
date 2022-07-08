export interface TNftMetadata {
  name: string;
  rank: TRank;
}

export type TRank = 'Bean' | 'Alpha Bean' | 'OG';

export type TNftImage = string;

export interface TNftData {
  id: number;
  name: string;
  rank: TRank;
  image: TNftImage;
}
