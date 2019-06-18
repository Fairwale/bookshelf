import React from 'react';
import {Link} from "react-router-dom";

function BookItem(props) {

    const authors = props.data.authors.map(item => `${item.firstName} ${item.lastName}`)


    return (
        <div className="bookblock">
            <p>Headline: {props.data.headline}</p>
            <p>Authors: {authors.join(', ')}</p>
            <p>Number of Pages: {props.data.numberOfPages}</p>
            {props.data.publisher!==""? <p>Publisher: {props.data.publisher}</p> : <p/>}
            {props.data.pubYear!==""? <p>Year of Publication: {props.data.pubYear}</p> : <p/>}
            {props.data.dateOfCirculation!==""? <p>Date of circulation: {props.data.dateOfCirculation}</p> : <p/>}
            {props.data.isbn!==""? <p>ISBN: {props.data.isbn}</p> : <p/>}
            <img src={props.data.files ? props.data.files.base64 : ""}
                 alt={props.data.headline} style={{height: 250, width: 250}}/>
            <div>

                <Link to={`/edit/${props.data.id}`}>
                    <button className='formbutton'>Edit</button>
                </Link>
                <Link to={'/'}>
                    <button className='formbutton' onClick={() => props.handleDelete(props.data.id)}>Delete</button>
                </Link>
            </div>
        </div>
    )
}

export default BookItem