
import ArticlModel, { IArticle } from "@/models/Article";
import { connectDB } from "./mongoDB";
import { separateArticlesBySection } from "./ArticlesUtils";

export interface SeparateArticles {

    editorPickPrimary?:IArticle; 
    editorPickSecondary:IArticle[]; 
    trendingArticls:IArticle[]; 
    slideArticls:IArticle[]; 
    gridArticls:IArticle[]; 
    mostRecentArticls:IArticle[]; 
    allmostRecentGridArticls:IArticle[]; 
    popularArticls:IArticle[]; 
    
}


interface homePageData {
    articles : SeparateArticles ;
}
export async function getHomePageData():Promise<homePageData>{
    let allFetchedArticles: IArticle[] = []
    try {

        await connectDB();
        const articles = await ArticlModel.find({}).sort({createdAt: -1}).lean();
        allFetchedArticles = JSON.parse(JSON.stringify(articles))
        
    } catch (error) {
        console.error("Error fetching articles",error)
    }

    const separateArticles = separateArticlesBySection(allFetchedArticles)

    return {
        articles : separateArticles
    }
}