import React from 'react';

const NewsCard = (props) => {
    let { title, description, imageurl, url, source } = props;
    return (
        <div>
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
                <img src={(imageurl) ? imageurl : "https://www.niddk.nih.gov/-/media/Images/Components/Default-Social-Media-Images/News-Card.png"} className="card-img-top news-img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title.slice(0, 40) + "......"}</h5>
                    <p className="card-text">{(description) ? description.slice(0, 100) + "....." : "..."}</p>
                    <a href={url} className="btn btn-danger report" target="_blank" rel="noreferrer">View Full Report</a>
                    <div className="card_bottom">
                        <div className="date">{"-   " + source}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard

