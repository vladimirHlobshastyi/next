import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import HeadComponent from "../components/Head/HeadComponent";
import NavBar from "../components/NavBar/NavBar"
import Pagination from "../components/Pagination/Pagination";
import style from './../styles/posts.module.scss'


type postsType = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Posts = ({ posts }: { posts: postsType[][] }) => {
    const [page, setPage] = useState(1)

    return <div className={style.postsContainer}>
        <HeadComponent description='test project, post link'
            viewport='width=device-width, initial-scale=1'
        />
        <NavBar />
        <div className={style.wrapperPosts}>
            {posts[page - 1].map((post) => <div className={style.wrapperPostsContent}>
                <Link href={`users/${post.userId}`}>{post.title}</Link>
            </div>)}
        </div>
        <Pagination page={page} totalPage={posts.length} callb={setPage} />
        <Footer />
    </div>
}

export default Posts

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()
    const doDataChunks = (arrayData: postsType[]) => {
        const result = [];
        for (let i = 0; i < arrayData.length; i += 20) {
            const chunk = arrayData.slice(i, i + 20);
            result.push(chunk);
        }
        return result;
    }
    return {
        props: { posts: doDataChunks(posts) },
    }
}