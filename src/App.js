// EXTERNAL DEPENDENCIES
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

// LOCAL VARIABLES
const url = 'https://talaikis.com/api/quotes/random/';

const wrapper = {
  height: '100vh',
  textAlign: 'center',
  width: '100vw'
}

const paperWrapper = {
  alignItems: "center",
  display: 'flex',
  height: '100vh',
  justifyContent: 'center'
}

const paper = {
  padding: 15,
  width: 500
}

// COMPONENT DEFINITION
export default class App extends Component {
  state = {
    author: '',
    quote: ''
  }

  getQuote = () => {
    axios.get(url).then(res => {
      this.setState({
        author: res.data.author,
        quote: res.data.quote
      })
    })
  }

  componentDidMount() {
    this.getQuote();
  }

  handleShuffle = () => {
    this.getQuote();
  }

  handleTweet = () => {
    console.log('%c tweet', 'color: #308e7b');
  }

  render() {
    const { author, quote } = this.state;
    const populateTweet = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
    return (
      <div style={wrapper}>
        <CssBaseline />
        <div style={paperWrapper}>
          <Paper style={paper}>
            <p>{quote ? quote : <CircularProgress />}</p>
            <p>{author ? `- ${author}` : CircularProgress}</p>
            <button type="button" onClick={this.handleShuffle}> New Quote </button>
            <button type="button"> <a class="twitter-share-button" href={populateTweet}>Tweet Quote</a> </button>
          </Paper>
        </div>
      </div>
    );
  }
}