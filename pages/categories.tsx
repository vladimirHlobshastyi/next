import style from '../styles/category.module.scss'
import Link from 'next/link'

type categoryTypes = { name: string, id: string }

const Categories = ({ categories }: { categories: categoryTypes[] }) => {

    return <div className={style.container}>
        <div className={style.title}>Категории</div>
        <div className={style.categoryWrapper}>
            {categories.map((item) => {
                return <div className={style.categoryWrapperItem} key={item.id}>
                    <Link href={`/category/${item.id}`} >{item.name}</Link>
                </div>
            })

            }
        </div>
    </div>
}

export async function getStaticProps() {

    const getCategories = await fetch(
        `${process.env.API_URL}/api/categories`
    );

    const categories: categoryTypes[] = await getCategories.json();

    return {
        props: { categories },
        revalidate: 86400,
    };
}

export default Categories