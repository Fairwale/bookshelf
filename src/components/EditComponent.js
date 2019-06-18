import React from 'react';
import {Link} from "react-router-dom";

import FileBase64 from 'react-file-base64'

function EditComponent(props) {

    return (
        <div className="centeralign">
            <form className='form'>
                <label className='label'>Headline: </label>
                <input
                    type="text"
                    className='input'
                    name="headline"
                    value={props.headline}
                    placeholder="Headline"
                    onChange={props.handleChange}
                />

                {/* Dynamically generating Author elements if more than author needed */}
                {props.authors.map((author, idx) => {

                    let button

                    if (idx !== 0) {
                        button = <button type="button"
                                         className="adddelete"
                                         onClick={props.handleRemoveAuthor(idx)}>Delete Author</button>
                    } else {
                        button = <p/>
                    }

                    return (
                        <div>
                            <label className='label'>Author First Name: </label>
                            <input
                                className='input'
                                type="text"
                                placeholder={`Author #${idx + 1} First name`}
                                value={author.firstName}
                                onChange={props.handleAuthorNameChange(idx, 'firstName')}
                            />

                            <label className='label'>Author Last Name: </label>
                            <input
                                className='input'
                                type="text"
                                placeholder={`Author #${idx + 1} Last name`}
                                value={author.lastName}
                                onChange={props.handleAuthorNameChange(idx, 'lastName')}
                            />


                            {button}
                        </div>

                    )
                })}

                <button type="button" className="adddelete" onClick={props.handleAddAuthor}>Add Author</button>

                <br/>

                <label className='label'>Number of pages: </label>
                <input
                    className='input'
                    name="numberOfPages"
                    value={props.numberOfPages}
                    placeholder="Number of Pages"
                    onChange={props.handleChange}
                />
                <label className='label'>Publisher: </label>
                <input
                    className='input'
                    name="publisher"
                    value={props.publisher}
                    placeholder="Publisher"
                    onChange={props.handleChange}
                />
                <label className='label'>Year of publication: </label>
                <input
                    className='input'
                    name="pubYear"
                    value={props.pubYear}
                    placeholder="Year of Publication"
                    onChange={props.handleChange}
                />
                <label className='label'>Date of Circulation: </label>
                <input
                    className='input'
                    name="dateOfCirculation"
                    value={props.dateOfCirculation}
                    placeholder="Date of Circulation"
                    onChange={props.handleChange}
                />
                <label className='label'>ISBN: </label>
                <input
                    className='input'
                    name="isbn"
                    value={props.isbn}
                    placeholder="ISBN"
                    onChange={props.handleChange}
                />

                {/* https://github.com/BosNaufal/react-file-base64 */}
                <FileBase64
                    multiple={false}
                    onDone={props.handleFile}
                />


                <br/>
                <Link to={'/'}><input className='formbutton' type="submit" value="Save"
                                      onClick={props.handleClickSave}/></Link>

                <br/>
                <Link to={'/'}>
                    <button className='formbutton' type="button">Cancel</button>
                </Link>
            </form>


        </div>
    )
}

export default EditComponent