import SectionTitle from '@/components/ui/SectionTitle';
import { IArticle } from '@/models/Article';
import React from 'react';
import ArticleCardPrimary from './ArticleCardPrimary';
import Link from 'next/link';
import ArticleCardSecondary from './ArticleCardSecondary';
import TrendingArticlsItem from './trendingArticlsItem';


interface HomeContentSectionProps {
    editorPickPrimary: IArticle,
    editorPickSecondary: IArticle[],
    trendingArticls: IArticle[],
}

const HomeContentSection = ({ editorPickPrimary, editorPickSecondary, trendingArticls }: HomeContentSectionProps) => {
    return (
        <section className='py-12 bg-white text-gray-800'>
            <div className="flex flex-col md:flex-row ">
                {/* left side */}
                <div className='w-full md:w-9/12 px-4 mb-8 md:mb-0'>
                    <SectionTitle title={"Editor's Pick"} />
                    <div className="flex flex-col md:flex-row -mx-4">
                        {/* main futured articles */}
                        <div className="w-full md:w-1/2 px-4  mb-8 md:mb-0">
                            {
                                editorPickPrimary && <ArticleCardPrimary article={editorPickPrimary} />
                            }
                            <Link href={'/archive'} className={'inline-block mt-6 px-6 py-2.5 text-sm uppercase hover:text-white border rounded hover:bg-primary'}>All Featured</Link>
                        </div>
                        {/* small futured articles */}

                        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                            {
                                editorPickSecondary && editorPickSecondary.map((article, index) =>
                                    <ArticleCardSecondary key={index} article={article} />
                                )
                            }

                        </div>

                    </div>
                </div>
                {/* right side */}
                <div className='w-full md:w-3/12 px-4'>
                    <SectionTitle title={'Trendings'} />
                    <ol className='list-none p-0'>
                        {
                            trendingArticls.map((article, index) => (
                                <TrendingArticlsItem key={index} article={article} index={index} />
                            ))
                        }
                    </ol>
                    <Link href={'/archive'}
                        className={'inline-block mt-6 px-6 py-2.5 text-sm uppercase hover:text-primary rounded hover:underline'}>
                        See All Trendings

                    </Link>
                </div>
            </div>
        </section>

    );
};

export default HomeContentSection;