import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    //Array Destructuring
    let { title, description, urlToImage, url, author, date } = this.props;

    return (
      <div className='my-3'>
        <div className="card my-3 mx-3">
          <img src={!urlToImage ? "https://i.blogs.es/e2e57c/captura-de-pantalla-2022-12-23-a-las-14.48.07/840_560.jpeg" : urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()} </small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More..</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
