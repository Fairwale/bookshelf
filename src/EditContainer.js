import React from 'react'
import EditComponent from './components/EditComponent'
import Validate from './Validate'

class Edit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            headline: "",
            authors: [{
                firstName: "",
                lastName: ""
            }],
            numberOfPages: "",
            publisher: "",
            pubYear: "",
            dateOfCirculation: "",
            image: "",
            isbn: ""
        }
    }

    componentDidMount() {
        if (this.props.isEdited) {
            const data = JSON.parse(localStorage.getItem(`${this.props.match.params.id}`))
            localStorage.removeItem(`${this.state.id}`)
            this.setState({
                id: data.id,
                headline: data.headline,
                authors: data.authors,
                numberOfPages: data.numberOfPages,
                publisher: data.publisher,
                pubYear: data.pubYear,
                dateOfCirculation: data.dateOfCirculation,
                image: data.files,
                isbn: data.isbn
            })
        }
    }

    /**
     * Generating id before putting item into local storage
     * Nothing fancy here. The idea is just to have current largest id + 1
     * @returns {number} the id itself
     */
    generateId() {
        let id;
        if (localStorage.length === 0) id = 1;
        else {
            let array = Object.keys(localStorage).map(item => {
                if (item !== 'sorted') return parseInt(item)
            })
            // we sort the array of all available ids in ascending order take first element and increment it
            id = array.sort((a, b) => b - a)[0] + 1
        }
        return id
    }

    /**
     * handling changes in fields in edit form (except author fields)
     * @param event
     */
    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value,
            id: this.props.isEdited ? this.state.id : this.generateId()
        });
    }

    /**
     * This function is validating data in the form when the user clicks save and saves data into storage
     * if everything is correctly entered
     * @param event
     */
    handleClickSave = event => {

        if (!Validate(this.state.headline, this.state.authors, this.state.numberOfPages,
            this.state.publisher, this.state.pubYear, this.state.dateOfCirculation, this.state.isbn)) {
            event.preventDefault()
        } else {
            if (localStorage.getItem('sorted') !== null && localStorage.getItem(`${this.state.id}`) === null) {

                let keys = JSON.parse(localStorage.getItem('sorted'))
                keys.push(parseInt(this.state.id))
                localStorage.setItem('sorted', JSON.stringify(keys))

            }
            localStorage.setItem(`${this.state.id}`, JSON.stringify(this.state))
        }
    }

    /**
     * Handling remove of author fields
     * @param idx
     * @returns {Function} Updating state after author is removed
     */
    handleRemoveAuthor = idx => () => {
        this.setState({
            authors: this.state.authors.filter((s, sidx) => idx !== sidx)
        });
    };

    /**
     * Handling changes in author fields
     * @param idx
     * @param parameter function works both for firstName and lastName
     * @returns {Function} Updating state after author is edited
     */
    handleAuthorNameChange = (idx, parameter) => evt => {
        const newAuthors = this.state.authors.map((author, sidx) => {
            if (idx !== sidx) return author;
            return {...author, [parameter]: evt.target.value};
        });

        this.setState({authors: newAuthors});
    };

    /**
     * Updating state (adding new object) after the 'add author' click
     */
    handleAddAuthor = () => {
        this.setState({
            authors: this.state.authors.concat([{
                firstName: "",
                lastName: ""
            }])
        });
    };

    handleFile = file => {
        this.setState({files: file})
    }


    render() {

        return (
            <EditComponent
                id={this.state.id}
                handleChange={this.handleChange}
                handleClickSave={this.handleClickSave}
                handleAuthorNameChange={this.handleAuthorNameChange}
                handleAddAuthor={this.handleAddAuthor}
                handleRemoveAuthor={this.handleRemoveAuthor}
                handleFile={this.handleFile}
                headline={this.state.headline}
                authors={this.state.authors}
                numberOfPages={this.state.numberOfPages}
                publisher={this.state.publisher}
                pubYear={this.state.pubYear}
                dateOfCirculation={this.state.dateOfCirculation}
                isbn={this.state.isbn}
                isEdited={this.props.isEdited}
            />
        )
    }


}

export default Edit
