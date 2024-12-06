import { Image } from "../common.interfaces";

export interface Artist {
  id: string;
  name: string;
  role: string;
  type: string;
  image: Image[];
  url: string;
}
