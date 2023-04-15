import React, { useState } from 'react';
import { CRYPTO_NEWS_URL, getCrptoOptions } from '../../api';

const News = ({ data }) => {
  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    const response = await fetch(`${CRYPTO_NEWS_URL}/top/5`, getCrptoOptions());
    const news = await response.json();
    setNewsData(
      news.data.map((item) => ({
        title: item.title,
        description: item.description,
      }))
    );
  };

  return (
    <div>
      <button onClick={fetchNews}>Get News</button>
      {newsData.length > 0 &&
        newsData.map((news, index) => (
          <div key={index}>
            <h2>{news.title}</h2>
            <p>{news.description}</p>
          </div>
        ))}
    </div>
  );
};

export default News;
