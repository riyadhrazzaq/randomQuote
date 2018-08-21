import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "./index.css";

let qData = React.createContext('');
let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
    '#e74c3c', '#9b59b6', '#FB6964', '#342224',
    "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            quote: "",
            author: "",
            color: Math.floor(Math.random() * 11)
        }
        this.handleNext = this.handleNext.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }
    componentWillMount() {

        this.setState({
            index: Math.floor(Math.random() * 100)
        });
        window.addEventListener('load', this.onLoad);
    }
    handleNext() {
        console.log('next');
        this.setState({
            index: Math.floor(Math.random() * 100),
            quote: qData.quotes[this.state.index].quote,
            author: qData.quotes[this.state.index].author,
            color:Math.floor(Math.random() * 11)
        });

    }
    onLoad() {
        this.setState({
            index: Math.floor(Math.random() * 100),
            quote: qData.quotes[this.state.index].quote,
            author: qData.quotes[this.state.index].author,
        });
    }

    render() {

        axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(function (response) {
                let tempQData = JSON.stringify(response.data);   //converts to string
                qData = JSON.parse(tempQData);  //converts to array 
            });
        console.log('state:' + this.state.index);
        let boxStyle ={
            textAlign: 'center',
            fontFamily: 'Raleway, sans-serif',
            backgroundColor: colors[this.state.color],
            padding:'5px',
            borderRadius:'3px',
            width:'auto',
            boxShadow: '5px 5px 15px grey',
            transitionDuration: '2s',
        }
        let text = {
           color:'white'

        }
        let auth = {
           color:'white'
        }
        return (
            <div id={'quote-box'} style={boxStyle}>
                <p id={'text'} style={text}>{this.state.quote}</p>
                <p id={'author'}style={auth}>--{this.state.author}</p>
                <button id={'new-quote'} onClick={this.handleNext}>Next</button>
                <a className={"twitter-share-button"} id={'tweet-quote'}
                    href="https://twitter.com/intent/tweet">
                    Tweet</a>
            </div>
        );
    }
};

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
