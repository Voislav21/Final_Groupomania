import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./newsWindow.scss";

const NewsWindow = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const API_URL = "https://api.collectapi.com/news/getNews?country=tr&tag=general";
    const API_KEY = "apikey 1PTssK24XYYbW4uPJZbJIR:3ZOziozn9TMv9nhGMDXkuV";

    axios.get(API_URL, {
      headers: {
        'content-type': 'application/json',
        'authorization': `apikey ${API_KEY}`,
      }
    })
      .then((response) => {
        setNewsData(response.data.result)
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <div className="news-window">
      <h2>Latest News</h2>
      <Slider {...carouselSettings}>
        {newsData.map((article) => (
          <div key={article.title}>
            <a href={article.url} target="._blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <img src={article.urlToImage} alt="" />
            </a>
          </div>
        ))}
      </Slider>
    </div >
  );
};

export default NewsWindow;