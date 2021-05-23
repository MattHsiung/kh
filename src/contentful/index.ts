import { Asset, AssetCollection } from "contentful";
import * as contentful from "contentful";
import { Document } from "@contentful/rich-text-types";

const client = contentful.createClient({
  space: "c5y1xa88y6w9",
  accessToken: "ruAbrUhSYsFQbOTdTZ2f06_qJRQ0R3Y1p_cYxwkCfas",
});

export default client;

export type ContentModel = {
  date?: string;
  title?: Document;
  workTitle: string;
  images: Array<Asset>;
};
