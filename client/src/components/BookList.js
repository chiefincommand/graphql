import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/Book';
import {Link } from "react-router-dom";

// import {getBooksQuery} from '../services/QueryService';

class BookList extends Component {

    displayBooks() {
        const data = this.props.data;
        if (data.loading) {
            return (<span>Loading books...</span>)
        } else if (data.books) {
            return data.books.map(book => {
                return (<li key={book.id}><Link to={`/books/${book.id}`}>{book.name}</Link></li>);
            })
        }
        return (<div className="app-msg">No books were found</div>);

    }

    render() {
        return (
            <div className="book-list-component">
                <h2>Book List</h2>
                <ul className="book-list">
                    {this.displayBooks()}
                </ul>
                <Link to="/books/add" >Add new book</Link>
            </div>
        );
    }
}


export default graphql(getBooksQuery)(BookList);