import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery} from '../queries/Author';
import {addAuthorMutation/*, getBooksQuery*/} from '../queries/Author';


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: null
        }
    }


    saveBook(e) {
        e.preventDefault();

        this.props.addAuthorMutation({
            variables: this.state
            //,
            // refetchQueries: [
            //     {query: getBooksQuery}
            // ]
        }).then(() => {
            this.props.history.push('/authors')
        })

    }

    onChangeInput(property) {
        return (e) => {
            switch (property) {
                case 'name' :
                    this.setState({[property]: e.target.value});
                    break;
                case 'age' :
                    this.setState({[property]: parseInt(e.target.value, 10)});
                    break;

            }
        }
    }

    render() {
        return (
            <div className="add-author-component">
                <h2>Add a Book</h2>
                <form onSubmit={this.saveBook.bind(this)}>
                    <div className="form-element">
                        <label>Name</label>
                        <input type="text" onChange={this.onChangeInput('name')}/>
                    </div>
                    <div className="form-element">
                        <label>Age</label>
                        <input type="number" onChange={this.onChangeInput('age')}/>
                    </div>
                    <button>Add Author</button>
                </form>
            </div>
        );
    }
}


export default compose(
    graphql(addAuthorMutation, {name: 'addAuthorMutation'})
)(AddBook);