import { useRouter } from 'next/router'
import style from '../../styles/blog.module.scss'
import { responsBlogType } from '../api/blog/[page]'

const Blog = ({ blogPage }: { blogPage: responsBlogType }) => {
    const router = useRouter()

    return <div className={style.container}>
        {blogPage.data.map((item) => { return <div>{item.content}</div> })}
    </div>
}
type pathType = {
    params: { id: string },
}
export async function getStaticPaths() {
    const response = await fetch(`${process.env.API_URL}/api/blog/1`);
    const blogs: responsBlogType = await response.json();

    const paths = [];
    for (let index = 1; index <= blogs.totalPages; index++) {
        paths.push({
            params: { id: index.toString() },
        });
    }

    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }: pathType) {

    const getBlogPage = await fetch(
        `${process.env.API_URL}/api/blog/${params.id}`
    );
    const blogPage = await getBlogPage.json();


    return {
        props: { blogPage }, revalidate: 86400,
    };
}
export default Blog

