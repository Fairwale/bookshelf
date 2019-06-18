import {Link} from "react-router-dom";
import React from "react";

function MenuComponent() {
    return (
        <div>
            <div className="centeralign">
                <Link to={'/'}>
                    <button className='formbutton'> Home</button>
                </Link>
                <Link to={'/add'}>
                    <button className='formbutton'>Add Book</button>
                </Link>
            </div>
            <hr/>
        </div>
    )
}


export default MenuComponent