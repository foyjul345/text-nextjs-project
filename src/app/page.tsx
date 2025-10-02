import FeatureSliderSection from "@/components/section/home/FeatureSliderSection";
import GridAndArticles from "@/components/section/home/GridAndArticles";
import HomeContentSection from "@/components/section/home/HomeContentSection";
import MostRecentSection from "@/components/section/home/MostRecentSection";
import { getHomePageData } from "@/lib/data";

export default async function Home() {
const {articles} = await getHomePageData()
 // console.log("Articles Data", articles);
  const {editorPickPrimary,editorPickSecondary,trendingArticls,slideArticls,gridArticls,
    mostRecentArticls,allmostRecentGridArticls,popularArticls
  } = articles
 // console.log(articles)
  return (

    <div className="blog-container">
      {
        editorPickPrimary && editorPickSecondary.length > 0 && trendingArticls.length > 0 && (
          <HomeContentSection
          editorPickPrimary={editorPickPrimary}
          editorPickSecondary={editorPickSecondary}
          trendingArticls={trendingArticls}
          />
        )
      }
      {
        slideArticls.length > 0 && <FeatureSliderSection article={slideArticls}/>
      }
      {
        gridArticls.length > 0 && <GridAndArticles article={gridArticls}/>
      }

      {
        mostRecentArticls.length > 0 && allmostRecentGridArticls.length> 0 && popularArticls.length > 0 &&
        (
          <MostRecentSection  mostRecentArticls={mostRecentArticls} 
          allmostRecentGridArticls={allmostRecentGridArticls}
          popularArticls={popularArticls}
           />
        )
      }
    </div>

  );
}
