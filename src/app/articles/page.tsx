import ArticleList from '@/components/ui/ArticleList';
import { connectDB } from '@/lib/mongoDB';
import ArticlModel from '@/models/Article';
import React from 'react';

const page = async () => {
   await connectDB();
   const initaialArticles = await ArticlModel.find({}).sort({createdAt: -1}).limit(10).lean();
   console.log(initaialArticles)
    return (
        <section className='blog-container'>
            <h1 className='text-4xl font-bold mb-8'>Latest Article</h1>
                <ArticleList initaialArticles={initaialArticles} />
        </section>
    );
};

export default page;