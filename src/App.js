// EXTERNAL DEPENDENCIES
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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

const authorStyles = {
  margin: '15px 0',
  textAlign: 'right',
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

  render() {
    const { author, quote } = this.state;
    const populateTweet = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
    return (
      <div style={wrapper}>
        <CssBaseline />
        <div style={paperWrapper}>
          <Paper style={paper}>
            <div>{quote ? `"${quote}"` : <CircularProgress />}</div>
            <div style={authorStyles}>{author ? `- ${author}` : null}</div>
            <Button color="primary" onClick={this.handleShuffle}> New Quote </Button>
            <Button color="primary" href={populateTweet} >Tweet Quote </Button>
          </Paper>
        </div>
      </div>
    );
  }
}