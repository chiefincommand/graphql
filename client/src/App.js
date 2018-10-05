import React, {Component} from 'react';
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AppApolloClient from './services/ApolloClient';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import BookDetails from './components/BookDetails';
import AuthorList from './components/AuthorList';
import Home from './components/Home';
import AddAuthor from './components/AddAuthor';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={AppApolloClient}>
                <BrowserRouter>
                    <div className="app">
                        <div className="app-header">
                            <h2 className="app-title">Library</h2>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </div>
                        <div className="app-body">
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/books" component={BookList}/>
                            <Route exact path="/authors" component={AuthorList}/>
                            <Route path="/authors/add" component={AddAuthor}/>
                            <Route path="/books/add" component={AddBook}/>
                            <Route path="/books/:bookId" component={BookDetails}/>
                        </div>
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

/*
<div className="app">
                    <div className="app-header">
                        <h2 className="app-title">Books and Authors</h2>
                    </div>
                    <div className="app-body">
                        <BookList/>
                        <hr/>
                        <AddBook/>
                    </div>
                </div>
 */

export default App;
