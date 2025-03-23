import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const NYTIMES_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

interface Article {
  title: string;
  url: string;
  image?: string;
  publishedAt?: string;
  source: string;
  category?: string;
}

export const fetchNews = async (
  query: string = "breaking news",
  filters?: { date?: string; category?: string; source?: string }
): Promise<{ articles: Article[]; categories: string[] }> => {
  try {
    const searchQuery = query.trim() !== "" ? query : "breaking news";
    console.log(`Fetching news for query: ${searchQuery}`);

    const params: any = { q: searchQuery, sortBy: "popularity", apiKey: NEWS_API_KEY, pageSize: 100 };

    if (filters?.date) params["from"] = filters.date;

    const [newsApiRes, guardianRes, nytRes] = await Promise.all([
      axios.get(`${NEWS_API_URL}?q=${searchQuery}&sortBy=popularity&apiKey=${NEWS_API_KEY}&pageSize=100`),
      axios.get(`${GUARDIAN_API_URL}?q=${searchQuery}&api-key=${GUARDIAN_API_KEY}`),
      axios.get(`${NYTIMES_API_URL}?q=${searchQuery}&api-key=${NYTIMES_API_KEY}`),
    ]);

    let categoriesSet = new Set<string>();

    let articles: Article[] = [
      ...newsApiRes.data.articles.map((article: any) => {
        const category = extractCategoryFromTitle(article.title);
        if (category) categoriesSet.add(category);
        return {
          title: article.title,
          url: article.url,
          image: article.urlToImage || "",
          publishedAt: article.publishedAt,
          source: "NewsAPI",
          category,
        };
      }),
      ...guardianRes.data.response.results.map((article: any) => {
        const category = article.pillarName || "General";
        categoriesSet.add(category);
        return {
          title: article.webTitle,
          url: article.webUrl,
          image: "",
          publishedAt: article.webPublicationDate,
          source: "The Guardian",
          category,
        };
      }),
      ...nytRes.data.response.docs.map((article: any) => {
        const category = article.type_of_material || "General";
        categoriesSet.add(category);
        return {
          title: article.headline.main,
          url: article.web_url,
          image: article.multimedia?.[0]?.url ? `https://www.nytimes.com/${article.multimedia[0].url}` : "",
          publishedAt: article.pub_date,
          source: "NYTimes",
          category,
        };
      }),
    ];

    if (filters?.category) {
      articles = articles.filter((article) => article.category === filters.category);
    }

    if (filters?.date) {
      const filterDate = new Date(filters.date);
      articles = articles.filter((article) => article.publishedAt && new Date(article.publishedAt) >= filterDate);
    }

    if (filters?.source) {
      articles = articles.filter((article) => article.source === filters.source);
    }

    return { articles, categories: Array.from(categoriesSet) };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [], categories: [] };
  }
};

const extractCategoryFromTitle = (title: string): string | null => {
  const keywords = {
    technology: ["tech", "AI", "software", "computer"],
    business: ["market", "stock", "finance", "economy"],
    health: ["COVID", "medicine", "healthcare", "doctor"],
    sports: ["football", "cricket", "tennis", "NBA"],
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((word) => title.toLowerCase().includes(word))) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }

  return "General";
};
