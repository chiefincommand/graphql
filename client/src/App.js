import React, {Component} from 'react';
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AppApolloClient from './services/ApolloClient';
import {ApolloProvider} from 'react-apollo';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={AppApolloClient}>
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
            </ApolloProvider>
        );
    }
}

export default App;
