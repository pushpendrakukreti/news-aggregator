import { useEffect, useState } from "react";
import { fetchNews } from "../api/news";
import Search from "../components/Search";
import Filters from "../components/Filters";
import { ClipLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import "../styles/styles.scss";

interface Article {
  title: string;
  url: string;
  image?: string;
  publishedAt?: string;
  source: string;
  category?: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ date?: string; category?: string; source?: string }>({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });
  const [resetSignal, setResetSignal] = useState(false);

  const loadNews = async (isNewSearch = false) => {
    if (!hasMore) return;

    setLoading(true);
    const { articles: newArticles, categories } = await fetchNews(searchTerm, filters);

    if (isNewSearch) {
      setArticles(newArticles.slice(0, 15));
      setPage(1);
    } else {
      const nextBatch = newArticles.slice(page * 15, (page + 1) * 15);
      setArticles((prev) => [...prev, ...nextBatch]);

      if (nextBatch.length < 15) {
        setHasMore(false);
      }
    }

    setCategories(categories);
    setLoading(false);
  };

  useEffect(() => {
    setHasMore(true);
    loadNews(true);
  }, [searchTerm, filters]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
      loadNews();
    }
  }, [inView]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilters({});
    setResetSignal((prev) => !prev);
  };

  return (
    <div className="container">
      <Search onSearch={setSearchTerm} resetSignal={resetSignal} />
      <Filters categories={categories} onFilterChange={setFilters} onReset={handleResetFilters} />

      <ul className="news-list">
        {articles.length === 0 && !loading ? (
          <li className="news-item">
            <p className="no-records">No articles available</p>
          </li>
        ) : (
          articles.map((article, index) => (
            <li key={index} className="news-item" ref={index === articles.length - 1 ? ref : null}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                {article.image && <img src={article.image} alt={article.title} />}
                <h2>{article.title}</h2>
                <p>{article.source} - {article.category}</p>
              </a>
            </li>
          ))
        )}
      </ul>

      {loading && hasMore && (
        <div className="loader-container">
          <ClipLoader size={50} color="#1e3a8a" />
        </div>
      )}
    </div>
  );
};

export default Home;
