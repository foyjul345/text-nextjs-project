import { Article, ArticleMeta } from "@/types/articles";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IArticle extends Omit<Article,'_id'>,Document{
    _id:string,
    meta:ArticleMeta
}

const articleSchema:Schema<IArticle> = new Schema<IArticle>({
    title:{type:String,required:true},
    image:{type:String,required:true},
    excerpt:{type:String},
    caption:{type:String,required:false},
    meta:{
        author:{type:String,required:true},
        authorHref:{type:String,required:true},
        category:{type:String,required:true},
        categoryHref:{type:String,required:true},
        date:{type:String,required:true},
        readingTime:{type:String,required:true},
        displaySection:String,
        authorAvatarUrl:{type:String,required:true},
    },
    tags:{type:[String]}
},{
    timestamps:true
})

const ArticlModel:Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>("Article",articleSchema)
export default ArticlModel;

