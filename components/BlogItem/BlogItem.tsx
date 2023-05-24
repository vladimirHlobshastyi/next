import Image from 'next/image';
import { useRouter } from 'next/router';
import useFormattedDate from '../../hooks/useFormattedDate';
import { blogPostsTypes } from '../../mock/mock';
import style from './BlogItem.module.scss';

const BlogItem = ({ blogData, pageNumber }: { blogData: blogPostsTypes; pageNumber: number }) => {
  const router = useRouter();

  return (
    <div
      className={style.blogContainer}
      onClick={() => router.push(`${pageNumber}/${blogData.id.toString()}`)}
    >
      <div className={style.blogLogo}>
        <Image src={blogData.imageUrl} alt="logo of blog" width={200} height={200} />
      </div>
      <div className={style.blogInfo}>
        <div className={style.blogInfoData}>{useFormattedDate(blogData.date)}</div>
        <div className={style.blogInfoTitle}>{blogData.description}</div>
      </div>
    </div>
  );
};

export default BlogItem;
