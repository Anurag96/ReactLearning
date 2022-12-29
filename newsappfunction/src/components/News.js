import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)




    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)

    }

    useEffect(() => {
        updateNews()
    }, [])


    const handlePrevClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(page - 1)
        setArticles(parsedData.articles)

    }
    const handleNextClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(page + 1)
        setArticles(parsedData.articles)
    }


    return (
        <div className='container my-3 mx-8'>
            <h1 className='text-center'> TOP {props.category.toUpperCase()} NEWS</h1>

            <div className="row">
                {articles?.map((element) => {
                    return (<div className='col-md-4' key={element.url}>
                        <NewsItem title={element.title !== null ? element.title.slice(0, 45).concat('..') : ""}
                            description={element.description !== null ? element.description.slice(0, 70).concat('..') : "Read More in details to find more interesting in this news.."}
                            urlToImage={element.urlToImage}
                            url={element.url}
                            author={element.author !== null ? element.author : "UnKnown"}
                            date={element.publishedAt !== null ? element.publishedAt : ""} />
                    </div>)
                })}

            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} className="btn btn-dark " onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}



News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

