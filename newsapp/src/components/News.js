import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize:5,
        category:'general'
    }
    static propTypes ={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

     constructor(){
        super();
        // console.log('Im Constructor from new component')
        this.state={articles:[],loading:false,page:1}
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        // console.log(` ${this.props.category} `)
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.articles)
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,date:parsedData.publishedAt,author:parsedData.author})

    }

   async componentDidMount(){
       this.updateNews()
    }

    handlePrevClick=async ()=>{
        this.setState({page:this.state.page-1})
        this.updateNews()
    }
    handleNextClick= async ()=>{
  
        this.setState({page:this.state.page+1})
        this.updateNews()
    }

  

  render() {
    return (
      <div className='container my-3 mx-8'>
        <h1 className='text-center'> TOP {this.props.category.toUpperCase()} NEWS</h1>          
    
        <div className="row">

        {this.state.articles?.map((element)=>{
           return (<div className='col-md-4' key={element.url}>
            <NewsItem title={element.title!==null?element.title.slice(0,45).concat('..'):""} 
            description={element.description!==null?element.description.slice(0,70).concat('..'):"Read More in details to find more interesting in this news.."}
            urlToImage={element.urlToImage} 
            url={element.url} 
            author={element.author!==null?element.author:"UnKnown"} 
            date={element.publishedAt!==null?element.publishedAt:""}/>
            </div>)
         })}

         </div>
         <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark " onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
         </div>
    </div>
    )
  }
}

export default News

