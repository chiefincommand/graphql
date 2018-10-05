import React, {Component} from 'react';
import {Link } from "react-router-dom";

class Home extends Component {

    render() {
        return (
            <div class="home-component">
                <Link to="books"><h2>Book List</h2></Link>
                <Link to="authors"><h2>Author List</h2></Link>
            </div>
        );
    }
}


export default Home;