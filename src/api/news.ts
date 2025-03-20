import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const NYTIMES_API_URL = "https://api.nytimes.com/svc/topstories/v2/home.json";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

export const fetchNews = async (category: string = "general") => {
    try {
        const [newsApiRes, guardianRes, nytRes] = await Promise.all([
            axios.get(NEWS_API_URL, { params: { category, apiKey: NEWS_API_KEY, country: "us" } }),
            axios.get(GUARDIAN_API_URL, { params: { section: category, "api-key": GUARDIAN_API_KEY, "show-fields": "headline,trailText,thumbnail" } }),
            axios.get(NYTIMES_API_URL, { params: { "api-key": NYTIMES_API_KEY } }),
        ]);

        return [
            ...newsApiRes.data.articles.map((article: any) => ({ title: article.title, url: article.url, image: article.urlToImage, source: "NewsAPI" })),
            ...guardianRes.data.response.results.map((article: any) => ({ title: article.webTitle, url: article.webUrl, image: article.fields.thumbnail || "", source: "The Guardian" })),
            ...nytRes.data.results.map((article: any) => ({ title: article.title, url: article.url, image: article.multimedia?.[0]?.url || "", source: "NYTimes" })),
        ];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
