import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookByIdQuery} from '../queries/Book';

class BookDetails extends Component {

    displayAuthorsBooks(book) {
        return book.author.books.map(otherBook => {
            if (book.id !== otherBook.id) {
                return (<li key={otherBook.id}>{otherBook.name}</li>);
            }
            return '';
        });
    }

    render() {
        const book = this.props.data.book;
        if (!book) {
            return ('');
        }
        return (
            <div className="book-details-component">
                <h2>Book {book.name} Details </h2>
                <div className="book-details">
                    <div>
                        <p>
                            <b>Book name: </b> {book.name}</p>
                    </div>
                    <div>
                        <p>
                            <b>Book genre: </b>{book.genre}
                        </p>
                    </div>
                    <div>
                        <p>
                            <b>Book Author: </b>{book.author.name}
                        </p>
                    </div>
                    <div>
                        <div>
                            <b>Author's other books: </b>
                            <ul>{this.displayAuthorsBooks(book)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default graphql(getBookByIdQuery, {
    options: ({match}) => {
        console.log('match', match);
        return {
            variables: {
                id: match.params.bookId
            }
        };
    }
})(BookDetails);