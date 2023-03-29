import Image from "next/image";
import useFormattedDate from "../../../hooks/useFormattedDate";
import { blogPostsTypes } from "../../../moc/moc";
import { responsBlogType } from "../../api/blog/[page]";
import style from './blogPost.module.scss'

const BlogItem = ({ blogPost }: { blogPost: blogPostsTypes }) => {
    return <div className={style.container}>
        <div className={style.wrapper}>
            <div className={style.wrapperImage}><Image src={blogPost.imageUrl} alt='Image of blog' /></div>
            <div className={style.wrapperInfo}>
                <div className={style.wrapperInfoDescription}><p>{blogPost.description}</p></div>
                <div className={style.wrapperInfoContenet}> <p>{blogPost.content}</p></div>
                <div className={style.wrapperInfoDate}>{useFormattedDate(blogPost.date)}</div>
            </div>

        </div>
        <div className={style.content}>

            <p>В интернет-магазине вы можете вести блог магазина или новостную ленту – это отличный способ привлекать дополнительных покупателей из поисковых систем не только за счет коммерческих запросов, но и за счет информационных.</p>
            <p>Рассказывайте вашим покупателям о новинках в вашем магазине, или просто полезную информацию о товарах вашей тематики и новостях рынка!</p>
            <p>Желательно публиковать статьи в блоге магазина не реже, чем 1 раз в месяц.</p>
            <p>Статьи блога поддерживают следующий функционал:</p>
            <ul>
                <li>теги к статьям для дополнительной перелинковки и навигации</li>
                <li>возможность прикрепить товары к статьям</li>
                <li>возможность добавить изображение (превью) статьи</li>
                <li>комментарии пользователей</li>
            </ul>
        </div>
    </div>
}
type pathType = {
    params: { blogId: string, postId: string },
}
export async function getStaticPaths() {

    const response = await fetch(`${process.env.API_URL}/api/blog/1`);
    const blogs: responsBlogType = await response.json();

    const paths = [] as pathType[];
    for (let index = 1; index <= blogs.totalPages; index++) {

        const response = await fetch(`${process.env.API_URL}/api/blog/${index}`);
        const blogs: responsBlogType = await response.json();
        blogs.data.forEach((item) => {

            paths.push({
                params: { blogId: index.toString(), postId: item.id.toString() },
            })
        })


    }
    console.log('====================================');
    console.log(paths);
    console.log('====================================');
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }: pathType) {

    const getBlogPage = await fetch(
        `${process.env.API_URL}/api/blog/${params.blogId}`
    );
    const blogPost: responsBlogType = await getBlogPage.json();
    const filterBlog = blogPost.data.filter((item) => item.id.toString() === params.postId)
    console.log('================filterBlog====================');
    console.log(filterBlog);
    console.log('=================filterBlog===================');
    console.log('================blogPost====================');
    console.log(blogPost);
    console.log('=================blogPost===================');
    if (filterBlog.length === 0) {
        return { notFound: true };
    }
    return {
        props: { blogPost: filterBlog[0] }, revalidate: 86400,
    };
}
export default BlogItem