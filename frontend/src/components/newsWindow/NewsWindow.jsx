import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./newsWindow.scss";

const NewsWindow = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const API_URL = "https://newsdata.io/api/1/news?apikey=pub_36515a7b0067c31bc4202efe6cd2553c077bb&q=tech ";

    axios.get(API_URL)
      .then((response) => {
        setNewsData(response.data.articles)
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