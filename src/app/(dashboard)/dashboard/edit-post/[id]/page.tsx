'use client';

import PostForm, { PostFormType } from '@/components/form/PostForm';
import { uploadImageToCloudinary } from '@/lib/uploadImageToCloudinary';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const EditPage = () => {
    const router = useRouter()
    const { id } = useParams();
    const [initialData, setInitialData] = useState<PostFormType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    console.log(initialData)



   useEffect(() => {
           if(!id) return;
           async function fetchPost() {
               try {
                   const res = await fetch(`/api/article/${id}`);
                   if(!res.ok) {
                       throw new Error("Failed to fetch post data");
                   }
   
                   const post = await res.json();
                   setInitialData({
                       title: post.title,
                       author: post.meta.author,
                       category: post.meta.category,
                       excerpt: post.excerpt,
                       status: post.status || "draft",
                       tags: post.tags || [],
                       image: post.image || "",
                   })
   
                   setLoading(false);
   
               } catch (error) {
                    console.error("Error fetching post data:", error);
                setError("Post not found or failed to load.");
               }finally {
                setLoading(false);
            }
           }
           fetchPost();
       }, [id])

       
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!initialData) return <p className="text-red-500">No post data found.</p>;
    const handleUpdatePost = async (data:PostFormType ,imageFile: File | null) => {
        try {
            let imageUrl = "";
            if (imageFile) {
              imageUrl = await uploadImageToCloudinary(imageFile);
            }
        
            const today = new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
        
            const postData = {
              ...data,
              status : data.status ? data.status === true : data.status === false,
              ...(imageUrl && {image : imageUrl}) ,
              caption: data.title,
              tags: data.tags ,
              meta: {
                author: data.author || "Unknown Author",
                authorHref: `/authors/${data.author.toLowerCase().replace(/\s+/g, '-')}`,
                category: data.category || "Uncategorized",
                categoryHref: `/categories/${data.category.toLowerCase()}`,
                date: today,
                readingTime: `${Math.ceil(data.excerpt.split(" ").length / 200)} min read`,
                authorAvatarUrl: "https://placehold.co/100x100", // 🟡 এটা আপাতত placeholder, চাইলে user info থেকে আনতে পারেন
                displaySection: "General", // optional
              },
            };
        
            const res = await fetch(`/api/article/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });
        
            if (!res.ok) {
              const err = await res.json();
              console.error("API Error:", err);
              throw new Error(err.message || "Failed to add post");
            }
        
            router.push("/");
          } catch (error) {
            alert("Failed to add post. Please try again.");
            console.error("Error adding post:", error);
          }
    }

    return (
         <section className="max-w-4xl">
             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
             <PostForm onSubmit={handleUpdatePost} initialData={initialData} />
        </section>
    );
};

export default EditPage;

// 'use client';

// import PostForm, { PostFormType } from '@/components/form/PostForm';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const Page = () => {
//     const { id } = useParams();
//     const [initialData, setInitialData] = useState<PostFormType | undefined>(undefined);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (!id) return;

//         const fetchPost = async () => {
//             try {
//                 const res = await fetch(`/api/article/${id}`);
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch post data");
//                 }

//                 const post = await res.json();

//                 setInitialData({
//                     title: post.title,
//                     author: post.meta.author,
//                     category: post.meta.category,
//                     excerpt: post.excerpt,
//                     status: post.status,
//                     tags: post.tags,
//                     image: post.image || "",
//                 });

//             } catch (err) {
//                 console.error("Error fetching post data:", err);
//                 setError("Post not found or failed to load.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [id]);

//     const handleUpdatePost = async () => {
//         // TODO: Implement update post logic
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (!initialData) return <p className="text-red-500">No post data found.</p>;

//     return (
//         <section className="max-w-4xl">
//             <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
//             <PostForm onSubmit={handleUpdatePost} initialData={initialData} />
//         </section>
//     );
// };

// export default Page;
