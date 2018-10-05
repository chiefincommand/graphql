import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/Author';

class AuthorList extends Component {
    displayAuthors() {
        const data = this.props.data;
        if (data.loading) {
            return (<span>Loading authors...</span>)
        } else if (data.authors) {
            return data.authors.map(author => {
                return (<li key={author.id}><Link to={`/authors/${author.id}`}>{author.name}</Link></li>);
            })
        }
        return (<div className="app-msg">No authors were found</div>);

    }

    render() {
        return (
            <div className="author-list-component">
                <h2>Author List</h2>
                <ul className="author-list">
                    {this.displayAuthors()}
                </ul>
                <Link to="/authors/add" >Add new author</Link>
            </div>
        );
    }
}

export default graphql(getAuthorsQuery)(AuthorList);