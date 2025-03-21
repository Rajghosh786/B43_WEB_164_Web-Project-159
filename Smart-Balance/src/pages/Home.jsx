import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [clicked, setClicked] = useState(null); 
  const [newsApi, setNewsApi] = useState([]); 
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [philter, setPhilter] = useState([]);

  var date = new Date();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  let today = `${yyyy}-${mm}-${dd}`;
  let finance = "finance";
  
  var url = `https://newsapi.org/v2/everything?` +
    `q=${finance}&` +
    `from=${today}&` +
    `to=2024-09-01&` +
    `pageSize=8&` + 
    `page=${pageNumber}&` +   
    "apiKey=e0cdf2ea62e94fccb775cd4c6a07144d";

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setNewsApi(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 8)); 
        setPhilter(data.articles.filter(article => article.urlToImage !== null && article.content !== "[Removed]"));
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, [pageNumber]);

  const handleSubmit = (e) => {
    setClicked(e);
  };

  const changePage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) {
      setPageNumber(pageNum);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-gray-200">
      <div className="container mx-auto p-4">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {philter.length > 0 ? (
            philter.map((e, index) => (
              <Link key={index} to="/clickednews">
                <div
                  onClick={() => handleSubmit(e)}
                  className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl h-full"
                >
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={e.urlToImage}
                    alt="Unable to load image"
                  />
                  <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-800">{e.title}</h1>
                    <p className="text-md text-gray-600 mt-2">{e.description}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {e.publishedAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">Loading News...</div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-lg">{pageNumber} of {totalPages}</span>
          <button
            className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => changePage(pageNumber + 1)}
            disabled={pageNumber === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Home;
