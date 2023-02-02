import { StaticImageData } from "next/image";


export type dataCartProduct = {
  id: number;
  description: string;
  price: number;
  currency: string;
  images: StaticImageData[];
  article: string;
};
export type initialStateTypes = {
  products: Array<{ data: dataCartProduct; count: number }> | [];
  totalCount: number;
  totalPrice: number;
};
