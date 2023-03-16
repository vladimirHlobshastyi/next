import { searchProductResult } from "../pages/api/search/[search]";

const getSerchedProducts = async (value: string) => {
  try {
    const request = await fetch(`${process.env.API_URL}/api/search/${value}`);
    const data: searchProductResult = await request.json();
    return data;
  } catch (error) {
    console.error(error + "<<<<<");
    throw new Error("Failed to get searched products");
  }
};

export default getSerchedProducts;
