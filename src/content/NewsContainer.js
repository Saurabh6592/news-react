import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Loading from './Images/loading.gif'

const NewsContainer = (props) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  let {category, country} = props;
  const nextPage = async() => {
    setLoading(true)
    axios
    .get(
      `https://newsapi.org/v2/top-headlines?${(country!=="null")?`country=${country}&`:``}category=${category}&page=${page+1}&pageSize=16&apiKey=02d71b24a1de4080b89712178f822fab`
      )
      .then(function (response) {
        // console.log(response);
        let ndata = response.data;
        // console.log(ndata);
        // console.log(ndata.articles);
        setArticles(ndata.articles);
      });
    setPage(page+1)
    window.scrollTo(0,0)
    setLoading(false);
  }
  const previousPage = async() => {
    setLoading(true)
    axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page-1}&pageSize=16&apiKey=02d71b24a1de4080b89712178f822fab`
      )
      .then(function (response) {
        // console.log(response);
        let ndata = response.data;
        // console.log(ndata);
        // console.log(ndata.articles);
        setArticles(ndata.articles);
      });
    setPage(page-1)
    setLoading(false);
    window.scrollTo(0,0)
  }
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=0&pageSize=16&apiKey=02d71b24a1de4080b89712178f822fab`
      )
      .then(function (response) {
        // console.log(response);
        let ndata = response.data;
        // console.log(ndata);
        // console.log(ndata.articles);
        setArticles(ndata.articles);
        setTotalPages(Math.ceil(ndata.totalResults/16));
      });
      window.scrollTo(0,0)
      setLoading(false);
    }, [category]);
  return (
    <div>
      <div className="container mb-4">
        <h2 className="container_head">{(category === 'general') ? 'Top Headlines' : (category + ' News')}</h2>
        <div className="content_news row">
          {!loading && articles &&
            articles.map(function (n) {
              return (
                <div className="col-md-3" key={n.url}>
                  <NewsCard
                    title={n.title}
                    description={ n.description }
                    imageurl={n.urlToImage}
                    url={n.url}
                    category={n.category} source={n.source.name} />
                </div>
              );
            })}
            {!articles && 
              <div className="loading"><img src={Loading} alt="" /></div>
            }
        </div>
        <div className="page_change">
        <button type="button" className="btn btn-danger" onClick={previousPage} disabled={page === 1}><i className="fas fa-chevron-left"></i> Previous</button>
        <button type="button" className="btn btn-danger" onClick={nextPage} disabled={totalPages === page}>Next <i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
