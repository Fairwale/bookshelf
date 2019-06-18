import React from 'react';

import BookItem from './components/BookItem'
import MenuComponent from './components/MenuComponent'

class MainContent extends React.Component {

    constructor() {
        super()

        let books = this.allStorage()

        this.state = {
            books: books,
            bookItems: books.map(item => <BookItem
                key={item.id}
                data={item}
                handleDelete={this.handleDelete}
            />)
        }
        this.handleClickHeadSort = this.handleClickHeadSort.bind(this);
        this.handleClickPubSort = this.handleClickPubSort.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * function that takes data from local storage
     * @returns {Array} of objects stored in localStorage (converting was done since localStorage only stores Strings)
     */
    allStorage() {

        let values = [],
            keys = Object.keys(localStorage)

        // checking if we have 'sorted' key in localStorage.
        // if sorted in the Storage than our data was previously sorted and we need to display it in the same order
        // as it was (requirement)
        if (localStorage.getItem('sorted') !== null) keys = JSON.parse(localStorage.getItem('sorted'))

        for (let i = 0; i < keys.length; i++) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));
        }

        return values;
    }

    /**
     * We can't really sort local storage, so we add array into into that saves our order and which we can later access
     * @param sortedBooks array of book objects from which we get the ids
     */
    sortStorage(sortedBooks) {
        let arrayOfIds = []
        for (let i = 0; i < sortedBooks.length; i++) {
            arrayOfIds[i] = sortedBooks[i].id
        }

        localStorage.setItem("sorted", JSON.stringify(arrayOfIds));
    }

    /**
     * Function to keep state updated
     * @param updatedBooks
     */
    updateState(updatedBooks) {
        this.setState({
            books: updatedBooks,
            bookItems: updatedBooks.map(item => <BookItem
                key={item.id}
                data={item}
                handleDelete={this.handleDelete}
            />)
        })
    }

    /**
     * Handling click on 'Sort by headline' button
     */
    handleClickHeadSort() {

        const sortedBooks = this.state.books.sort((a, b) => {
            if (a.headline < b.headline) {
                return -1;
            }
            if (a.headline > b.headline) {
                return 1;
            }
            return 0;
        })

        this.updateState(sortedBooks)

        this.sortStorage(sortedBooks)

    }

    /**
     * Handling click on 'Sort by year of publication' button
     */
    handleClickPubSort() {
        const sortedBooks = this.state.books.sort((a, b) => {
            if ((b.pubYear === "" && a.pubYear !== "") || parseInt(a.pubYear) < parseInt(b.pubYear)) {
                return -1;
            }
            if (parseInt(a.pubYear) > parseInt(b.pubYear)) {
                return 1;
            }
            return 0;
        })

        this.updateState(sortedBooks)

        this.sortStorage(sortedBooks)

    }

    /**
     * Handling click on delete item
     * We update state and remove it from local storage
     * @param id the id item getting removed
     */
    handleDelete = id => {

        if (localStorage.getItem('sorted') !== null) {
            const updatedKeys = JSON.parse(localStorage.getItem('sorted')).filter(key => key !== id)
            localStorage.setItem('sorted', JSON.stringify(updatedKeys))
        }
        localStorage.removeItem(`${id}`)

        const updatedBooks = this.state.books.filter(item => item.id !== id)

        // Deleting sorted array if there are no longer any element on the page
        if (localStorage.getItem('sorted') && JSON.parse(localStorage.getItem('sorted')).length === 0) {
            localStorage.removeItem('sorted')
        }

        this.updateState(updatedBooks)
    }

    render() {

        let button

        if (localStorage.length !== 0) {
            button =
                <div>
                    <button className="formbutton"
                            onClick={this.handleClickHeadSort}>Sort by Headline
                    </button>
                    <button className="formbutton"
                            onClick={this.handleClickPubSort}>Sort by year of Publication
                    </button>
                </div>;
        } else {
            button = <p/>
        }

        return (
            <div>
                <MenuComponent/>
                <div className="centeralign">
                    {button}
                    {this.state.bookItems}
                </div>
            </div>
        )
    }
}

export default MainContent