import { useRouter } from 'next/router'
import { useState } from 'react'
import style from './blog.module.scss'
import { responsBlogType } from '../api/blog/[page]'
import Pagination from '../../components/Pagination/Pagination';
import BlogItem from '../../components/BlogItem/BlogItem';
import Link from 'next/link';

const Blog = ({ blogPage }: { blogPage: responsBlogType }) => {
    const router = useRouter()
    const { blogId } = router.query
    const [pageNumber, setPageNumber] = useState(Number(blogId));

    /*  useEffect(() => { router.push(`${pageNumber}`) }, [pageNumber]) */



    return (
        <div className={style.container}>
            <div className={style.blogTitle}><span>Блог</span></div>
            {blogPage.data.map((item) => {
                return <Link href={`${pageNumber}`} key={item.id} ><BlogItem blogData={item} pageNumber={pageNumber} /></Link>
            })}
            <div className={style.pagination}>
                <Pagination page={Number(blogId)} totalPage={blogPage.totalPages} callb={setPageNumber} />
            </div>
        </div>
    );


}


type pathType = {
    params: { blogId: string },
}

export async function getStaticPaths() {

    const response = await fetch(`${process.env.API_URL}/api/blog/1`);
    const blogs: responsBlogType = await response.json();

    const paths = [];
    for (let index = 1; index <= blogs.totalPages; index++) {
        paths.push({
            params: { blogId: index.toString() },
        });
    }

    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }: pathType) {

    const getBlogPage = await fetch(
        `${process.env.API_URL}/api/blog/${params.blogId}`
    );
    const blogPage = await getBlogPage.json();

    return {
        props: { blogPage }, revalidate: 86400,
    };
}
export default Blog
