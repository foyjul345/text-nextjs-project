import { IArticle } from "@/models/Article";
import { SeparateArticles } from "./data";

export function separateArticlesBySection(allArticles:IArticle[]){
    const separated: SeparateArticles= {
        editorPickPrimary:{} as IArticle,
        editorPickSecondary:[],
        slideArticls:[],
        mostRecentArticls:[],
        allmostRecentGridArticls:[],
        trendingArticls:[],
        gridArticls:[],
        popularArticls:[]
    }

    separated.editorPickPrimary = allArticles.find((article) => article.meta.displaySection === 'editorPickPrimary') 
    separated.editorPickSecondary = allArticles.filter((article) => article.meta.displaySection === 'editorPickSecondary') 
    separated.trendingArticls = allArticles.filter((article) => article.meta.displaySection === 'trending') 
    separated.slideArticls = allArticles.filter((article) => article.meta.displaySection === 'slider') 
    separated.gridArticls = allArticles.filter((article) => article.meta.displaySection === 'gridAndAds') 
    separated.mostRecentArticls = allArticles.filter((article) => article.meta.displaySection === 'mostRecent') 
    separated.allmostRecentGridArticls = allArticles.filter((article) => article.meta.displaySection === 'mostRecentGrid') 
    separated.popularArticls = separated.trendingArticls

    return separated;
}