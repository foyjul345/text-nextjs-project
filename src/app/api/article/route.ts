// import { connectDB } from "@/lib/mongoDB";
// import ArticlModel, { IArticle } from "@/models/Article";
// import { FilterQuery } from "mongoose";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest){
//    try {
//          await connectDB()
//     const {searchParams} = request.nextUrl;
//     const query = searchParams.get("q")
//     const category = searchParams.get("category")

//     const filter:FilterQuery<IArticle> = {}
//     if(category){
//         filter["meta.category"] = {$regex: `^${category}$`,$options:"i"}
//     }
//     if(query){
//         filter.$or = [
//             {title : {$regex : query , $options : 'i'}},
//             {excerpt : {$regex : query , $options : 'i'}},
//             {caption : {$regex : query , $options : 'i'}},
//             {
//                 'meta.author' :  {$regex : query , $options : 'i'}
//             }
            

        
//         ]
//     }

//     // pagination
//     const pageParam = searchParams.get('page')
//     const limitParam = searchParams.get('limit')
//     if(pageParam && limitParam){
//         const page = parseInt(pageParam)
//         const limit = parseInt(limitParam)
//         const skip = (page - 1) * limit
//         const [articles,totalArticles] = await Promise.all([
//             ArticlModel.find(filter).sort({createdAt : - 1}).skip(skip).limit(limit).lean(),
//             ArticlModel.countDocuments(filter)
//         ])

//         return NextResponse.json({
//             articles,
//             totalPages : Math.ceil(totalArticles / limit)
//         })
//     }

//     const articles = await ArticlModel.find(filter).sort({createdAt : - 1}).lean()

//     return NextResponse.json(articles)
//    } catch (error : any) {
//     console.error('Error fetching articles:',error)
//     return NextResponse.json({message : "Feiled to fetch articles",error:error.message},{status:500})
//    }
// }
import { NextRequest, NextResponse } from 'next/server';

import ArticleModel, { IArticle } from '@/models/Article';
import { FilterQuery } from "mongoose";
import { connectDB } from '@/lib/mongoDB';

export async function GET(request: NextRequest) {
    try {
      await connectDB();
  
      const { searchParams } = request.nextUrl;
      const category = searchParams.get('category');
      const query = searchParams.get('q'); 
  
      // --- 1. Build the filter object ---
      const filter: FilterQuery<IArticle> = {};
      if (category) {
        filter['meta.category'] = { $regex: `^${category}$`, $options: 'i' };
      }
      if (query) {
        filter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { excerpt: { $regex: query, $options: 'i' } },
          { caption: { $regex: query, $options: 'i' } },
          { 'meta.author': { $regex: query, $options: 'i' } },
        ];
      }
      
      // --- 2. Check if pagination is requested ---
      const pageParam = searchParams.get("page");
      const limitParam = searchParams.get("limit");
  
      // **IF PAGINATION PARAMS EXIST (for infinite scroll)**
      if (pageParam && limitParam) {
        const page = parseInt(pageParam);
        const limit = parseInt(limitParam);
        const skip = (page - 1) * limit;
  
        const [articles, totalArticles] = await Promise.all([
          ArticleModel.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
          ArticleModel.countDocuments(filter) 
        ]);
    
        return NextResponse.json({ 
            articles, 
            totalPages: Math.ceil(totalArticles / limit) 
        });
      }
  
      // **IF NO PAGINATION (for your simple SearchPage)**
      const articles = await ArticleModel.find(filter)
          .sort({ createdAt: -1 })
          .lean();
  
      // Return a simple array, which is what SearchPage expects
      return NextResponse.json(articles);
  
    } catch (error: any) {
      console.error("Error fetching articles:", error);
      return NextResponse.json(
          { message: "Failed to fetch articles", error: error.message },
          { status: 500 }
      );
    }
  }

  export async function POST(request : NextRequest){
   

   try {
     await connectDB()
     const body = await request.json()
    const newArticles = new ArticleModel(body)

    await newArticles.save()
    return NextResponse.json(newArticles,{status:201})

   } catch (error:any) {
     console.error("Error fetching articles",error)
    return NextResponse.json(
      {message : "Failed to fetch articles :",error: error.message},
      {status:500}
    )
   }
  }