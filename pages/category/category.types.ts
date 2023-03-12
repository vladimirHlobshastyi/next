import { productsInCategory } from "../../moc/moc";

export type pathTypes = { params: { category: string } }[];
export type productComponentTypes = { products: productsInCategory };
export type categoryType = {
  name: string;
  id: string;
};
