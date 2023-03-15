import { StaticImageData } from "next/image";

export type dataCartProduct = {
  description: string;
  price: number;
  currency: string;
  images: StaticImageData[];
  id: string;
  article: string;
};

export type initialStateTypes = {
  products: Array<{ data: dataCartProduct; count: number }> | [];
  totalCount: number;
  totalPrice: number;
};
