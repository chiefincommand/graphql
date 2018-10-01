import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery} from '../queries/Author';
import {addBookMutation, getBooksQuery} from '../queries/Book';


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors() {
        if (this.props.getAuthorsQuery) {
            const query = this.props.getAuthorsQuery;
            if (query.loading) {
                return (<option disabled>Loading authors...</option>)
            }
            if (query && query.authors) {
                return query.authors.map(author => {
                    return (<option key={author.id} value={author.id}>{author.name}</option>);
                })
            }
        }
        return (<option disabled>No authors were found</option>);

    }

    saveBook(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: this.state,
            refetchQueries: [
                {query: getBooksQuery}
            ]
        });

    }

    onChangeInput(property) {
        return (e) => {
            this.setState({[property]: e.target.value});
        }
    }

    render() {
        return (
            <div className="add-book-component">
                <h2>Add a Book</h2>
                <form onSubmit={this.saveBook.bind(this)}>
                    <div className="form-element">
                        <label>Name</label>
                        <input type="text" onChange={this.onChangeInput('name')}/>
                    </div>
                    <div className="form-element">
                        <label>Genre</label>
                        <input type="text" onChange={this.onChangeInput('genre')}/>
                    </div>
                    <div className="form-element">
                        <label>Author</label>
                        <select className="authors-list" onChange={this.onChangeInput('authorId')}>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button>Add Book</button>
                </form>
            </div>
        );
    }
}


export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);