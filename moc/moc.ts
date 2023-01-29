import chirt1 from "../public/l_20222-w2ca33z8-lrw-98-76-97-189_a.webp";
import chirt2 from "../public/l_20222-w2ca33z8-lrw-98-76-97-189_a1.webp";
import chirt3 from "../public/l_20222-w2ca33z8-lrw-98-76-97-189_a2.webp";
import chirt4 from "../public/l_20222-w2ca33z8-lrw-98-76-97-189_a3.webp";
import chirt5 from "../public/l_20222-w2ca33z8-lrw_u.webp";
import chirt1_2 from "../public/l_20222-w2ca46z8-sld_u.webp";
import chirt2_2 from "../public/l_20222-w2ca46z8-sld-100-80-89-188_a.webp";
import chirt3_2 from "../public/l_20222-w2ca46z8-sld-100-80-89-188_a1.webp";
import chirt4_2 from "../public/l_20222-w2ca46z8-sld-100-80-89-188_a4.webp";
import chirt5_2 from "../public/l_20222-w2ca46z8-sld-100-80-89-188_a3.webp";
import chirt1_3 from "../public/l_20222-w2ck88z8-s9f-99-75-93-185_a.webp";
import chirt2_3 from "../public/l_20222-w2ck88z8-s9f-99-75-93-185_a1.webp";
import chirt3_3 from "../public/l_20222-w2ck88z8-s9f-99-75-93-185_a2.webp";
import chirt4_3 from "../public/l_20222-w2ck88z8-s9f-99-75-93-185_a3.webp";
import chirt5_3 from "../public/l_20222-w2ck88z8-s9f_u.webp";
import chirt1_4 from "../public/l_20222-w2cl27z8-sm0-96-81-93-190_a.webp";
import chirt2_4 from "../public/l_20222-w2cl27z8-sm0-96-81-93-190_a1.webp";
import chirt3_4 from "../public/l_20222-w2cl27z8-sm0-96-81-93-190_a2.webp";
import chirt4_4 from "../public/l_20222-w2cl27z8-sm0-96-81-93-190_a3.webp";
import chirt5_4 from "../public/l_20222-w2cl27z8-sm0_u.webp";
import pants from "../public/l_20222-w2j298z8-qla-99-75-93-185_a.webp";
import pants1 from "../public/l_20222-w2j298z8-qla-99-75-93-185_a1.webp";
import pants2 from "../public/l_20222-w2j298z8-qla-99-75-93-185_a2.webp";
import pants3 from "../public/l_20222-w2j298z8-qla-99-75-93-185_a3.webp";
import pants4 from "../public/l_20222-w2j298z8-qla_u.webp";
import { StaticImageData } from "next/image";

export type mocTypes = {
  description: string;
  price: number;
  currency: string;
  images: StaticImageData[];
  id: number;
  article: string;
};
export const mocProducts: mocTypes[] = [
  {
    description: "Рубашка 1",
    price: 2500,
    currency: "$",
    images: [chirt1, chirt2, chirt3, chirt4, chirt5],
    id: 1,
    article: "0001",
  },
  {
    description: "Рубашка 2",
    price: 1955,
    currency: "$",
    images: [chirt1_2, chirt2_2, chirt3_2, chirt4_2, chirt5_2],
    id: 2,
    article: "0002",
  },
  {
    description: "Свитер 1",
    price: 2333,
    currency: "$",
    images: [chirt1_3, chirt2_3, chirt3_3, chirt4_3, chirt5_3],
    id: 3,
    article: "0003",
  },
  {
    description: "Свитер 2",
    price: 1222,
    currency: "$",
    images: [chirt1_4, chirt2_4, chirt3_4, chirt4_4, chirt5_4],
    id: 4,
    article: "0004",
  },
  {
    description: "Брюки",
    price: 3333,
    currency: "$",
    images: [pants, pants1, pants2, pants3, pants4],
    id: 5,
    article: "0005",
  },
  {
    description: "Название вашего товара будет здесь",
    price: 2500,
    currency: "$",
    images: [chirt1, chirt2, chirt3, chirt4, chirt5],
    id: 6,
    article: "0006",
  },
  {
    description: "Название вашего товара будет здесь",
    price: 2500,
    currency: "$",
    images: [chirt1, chirt2, chirt3, chirt4, chirt5],
    id: 7,
    article: "0007",
  },
  {
    description: "Название вашего товара будет здесь",
    price: 2500,
    currency: "$",
    images: [chirt1, chirt2, chirt3, chirt4, chirt5],
    id: 8,
    article: "0008",
  },
];
