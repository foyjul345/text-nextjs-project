import DeleteButton from '@/components/ui/DeleteButton';
import { connectDB } from '@/lib/mongoDB';
import ArticlModel, { IArticle } from '@/models/Article';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const POST_PER_PAGE = 10

const MangePost = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
    await connectDB();
    const currentPage = parseInt((await searchParams).page || "1")
    if (currentPage < 1) redirect("dashboard/manage-posts?page=1")
    console.log(currentPage)

    const skip = (currentPage - 1) * POST_PER_PAGE;
    // get post and total post  count
    const [rowPosts, totalPosts] = await Promise.all([
        // fetch posts from database
        ArticlModel.find().sort({ cretedAt: -1 }).skip(skip).limit(POST_PER_PAGE).lean(),
        // fetch total post count from database
        ArticlModel.countDocuments()
    ]);

    const posts: IArticle[] = JSON.parse(JSON.stringify(rowPosts))
    const totalPags = Math.ceil(totalPosts / POST_PER_PAGE)

    return (
        <div className='max-w-4xl'>
            <h1 className="text-3xl font-bold mb-6">
                Managed Posts
            </h1>
            {
                posts.length === 0 ? (
                    <p className="text-gray-500">No Post Found.</p>) : (
                    <>
                        <table className='min-w-full shadow-md rounded-md overflow-hidden'>
                            <thead className='bg-gray-900 text-gray-100'>
                                <tr>
                                    <th className='text-left p-3'>Title</th>
                                    <th className='text-left p-3'>Author</th>
                                    <th className='text-left p-3'>Category</th>
                                    <th className='text-left p-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map((post) => (
                                        <tr key={post._id} className='border-b'>
                                            <td className="p-3">
                                                <Link href={`/articles/${post._id}`} className='hover:text-primary hover:underline cursor-pointer'>{post.title}</Link>
                                            </td>
                                            <td className="p-3">
                                                {post.meta.author}
                                            </td>
                                            <td className="p-3">
                                                {post.meta.category}
                                            </td>
                                            <td className="p-3 flex gap-4">
                                                <Link href={`/dashboard/edit-post/${post._id}`} className='text-blue-600 hover:underline'>Edit</Link>
                                                <DeleteButton id={post._id} />
                                            </td>
                                        </tr>

                                    ) )
                                }
                            </tbody>
                        </table>
                        {/* pagination */}
                        <div className='mt-6 flex justify-center gap-4'>
                            {
                                Array.from({length : totalPags},(_,i) => i + 1).map((page) => (
                                    <Link key={page} href={`?page=${page}`} className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white`}>
                                        {page}
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MangePost;