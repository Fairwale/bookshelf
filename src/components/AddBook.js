import React from 'react';
import MenuComponent from './MenuComponent'
import EditContainer from '../EditContainer'

function AddBook(props) {


    return (
        <div>
            <MenuComponent/>
            <EditContainer isEdited={props.isEdited}/>
        </div>
    )
}

export default AddBook