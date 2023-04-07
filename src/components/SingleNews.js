import React from 'react';

const SingleNews = ({title, url, summary, handleRemove, handleUpdate}) => {

    return (
        <article className='news'>
            <div>
                <h3 className='title'>{title}</h3>
                <h3 className='summary'>{summary}</h3>
            </div>
            <div className='action-container'>
                <a className='link' href={url} target='_blank noreferrer'>Read More</a>
                <button type='button' className='btn remove' onClick={handleRemove}>Remove</button>
                <button type='button' className='btn update' onClick={handleUpdate}>Update</button>
            </div>
        </article>
    )
        ;
};

export default SingleNews;