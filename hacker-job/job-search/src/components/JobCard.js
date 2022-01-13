import React, { useState } from 'react';


const JobCard = ({ item }) => {

    const [showDetails, toggleShowDetails] = useState(false);

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {item.title}
                </p>
                <button className="card-header-icon" aria-label="more options" onClick={() => {
                    toggleShowDetails(!showDetails)
                }}>
                    <span className="icon">
                        <i className={`fas ${!showDetails ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true"></i>
                    </span>
                </button>
            </header>

            {
                !!showDetails && <div className="card-content">
                    <div className="content">
                        {item.description}
                        <br />
                        <time datetime="2016-1-1">{item.pubDate}</time>
                    </div>
                </div>
            }

            <footer className="card-footer">
                <a href={item.link} target='_blank' className="card-footer-item">Link</a>
            </footer>
        </div>
    )
}

export default JobCard;