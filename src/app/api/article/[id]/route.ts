import  ArticleModel  from '@/models/Article';
import { connectDB } from "@/lib/mongoDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import CommentModel from '@/models/Comment';

export async function GET(request:NextRequest,{params}:{params : Promise<{id:string}>}) {
    try {
        const {id} = await params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid article ID format"},{status:400})

        }

        
            await connectDB();

            const [article,comments] = await Promise.all([
                ArticleModel.findById(id).lean(),
                CommentModel.find({articleId:id}).sort({createdAt : -1}).lean()
            ])

            if(!article){
                return NextResponse.json({message:"Article not found"},{status:404})
            }

            const response = {
                ...article,
                comments : comments || []
            }

            return NextResponse.json(response,{status : 200})
    } catch (error :any) {
        console.error(`Error fetching article and comments`,error)
        return NextResponse.json({
            message:"Failed to fetch article and comment.",
            details:error.message
        },{
            status: 500
        })
    }
}

export async function DELETE(request:NextRequest,{params}:{params : Promise<{id:string}>}) {
    try {
        await connectDB();
        const {id} = await params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid article ID format"},{status:400})
        } 
        const deleteArticle = await ArticleModel.findByIdAndDelete(id);
        if(!deleteArticle){
            return NextResponse.json({message:"Article not found"},{status:404})
        }
        return NextResponse.json({message:"Article deleted successfully"},{status:200}) 
    }catch(error : any){
        console.error('error deleting article',error)
        return NextResponse.json({message:"Failed to delete article"},{status:500}) 
    }
    }


    export async function PUT(request:NextRequest,{params}:{params : Promise<{id:string}>}){
        try {
            await connectDB();
            const {id} = await params;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return NextResponse.json({message:"Invalid article ID format"},{status:400})
            } 
            const body = await request.json();
            const updatedArticle = await ArticleModel.findByIdAndUpdate(id,body,{new:true});
            if(!updatedArticle){
                return NextResponse.json({message:"Article not found"},{status:404})
            }
            return NextResponse.json(updatedArticle,{status:200}) 
        }catch(error : any){
            console.error('error updating article',error)
            return NextResponse.json({message:"Failed to update article"},{status:500}) 
        }
    }

