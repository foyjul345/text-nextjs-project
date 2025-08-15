import PostMeta from '@/components/ui/PostMeta';
import { IArticle } from '@/models/Article';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface ArticleCardPrimaryProps {
    article : IArticle
}
const ArticleCardPrimary = ({article}:ArticleCardPrimaryProps) => {
    return (
        <article>
            <figure className='mb-4'>
                <Link href={`/articles/${article._id}`}>
                <Image src={article.image} alt={article.title} width={700} height={400}
                    className='w-full h-auto object-cover rounded-lg' loading='lazy'/>
                </Link>
            </figure>
            <h3 className='text-[16px] font-bold mb-3 leading-tight'>
                <Link href={`/articles/${article._id}`} className='text-[#2E2E2E] hover:text-primary'>
                    {article.title}
                </Link>
            </h3>
            {
                article.excerpt && (
                     <p className="text-[#0000008a] mb-4 text-base leading-relax">
                        {article.excerpt}
                    </p>
                )
            }
            <PostMeta {...article.meta}/>
        </article>
    );
};

export default ArticleCardPrimary;