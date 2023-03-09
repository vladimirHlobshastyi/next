import style from '../styles/category.module.scss'
import Image from 'next/image'
import mocImage from '../../public/moc_image.webp'
import { IoBagOutline } from "react-icons/io5";
import Link from 'next/link'

type categoryTypes = { name: string, id: string }

const Categories = ({ categories }: { categories: categoryTypes[] }) => {

    return <div className={style.container}>
        <div className={style.title}>Категории</div>
        <div className={style.categoryWrapper}>
            {categories.map((item) => {
                debugger
                return <div className={style.categoryWrapperItem} key={item.id}>
                    <Link href={`/category/${item.id}`} >{item.name}</Link>
                </div>
            })

            }
        </div>
    </div>
}
/* type pathTypes = { params: { id: string }, }[]

type categoryTypes = { name: string, id: string }


export async function getStaticPaths() {
    const response = await fetch(`${process.env.API_URL}/api/categories`);
    const products = await response.json();

    const paths: pathTypes = products.map((category: categoryTypes) => {
        return {
            params: { id: category.id },
        };
    });

    return {
        paths,
        fallback: false,
    };
}
 */
export async function getStaticProps() {

    const getCategories = await fetch(
        `${process.env.API_URL}/api/categories`
    );

    const categories: categoryTypes[] = await getCategories.json();

    return {
        props: { categories },
    };
}

export default Categories