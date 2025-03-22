import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "e0cdf2ea62e94fccb775cd4c6a07144d";
const PAGE_SIZE = 8;
const QUERY = "finance";

const Home = () => {
  const [clicked, setClicked] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  // Fetch News API Data
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=${QUERY}&from=${today}&to=2024-09-01&pageSize=${PAGE_SIZE}&page=${pageNumber}&apiKey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
          const filteredArticles = data.articles.filter(
            (article) => article.urlToImage && article.content !== "[Removed]"
          );

          setNewsArticles(filteredArticles);
          setTotalPages(Math.ceil(data.totalResults / PAGE_SIZE));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [pageNumber]);

  // Handle Click Event
  const handleClick = (article) => setClicked(article);

  // Handle Pagination
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-gray-200">
      <div className="container mx-auto p-4">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {newsArticles.length > 0 ? (
            newsArticles.map((article, index) => (
              <Link key={index} to="/clickednews">
                <div
                  onClick={() => handleClick(article)}
                  className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl h-full cursor-pointer"
                >
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={article.urlToImage}
                    alt="News Thumbnail"
                  />
                  <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-800">{article.title}</h1>
                    <p className="text-md text-gray-600 mt-2">{article.description}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">Loading News...</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-lg">
            {pageNumber} of {totalPages}
          </span>
          <button
            className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            onClick={() => changePage(pageNumber + 1)}
            disabled={pageNumber >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
