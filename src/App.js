import React, { Component } from 'react';

import './App.css';
import { render } from '@testing-library/react';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {} 


    this.performSearch("")
  }

 
    performSearch(searchTerm) {
      console.log("Perform Search")
      const urlString = "https://api.themoviedb.org/3/search/movie?api_key=0e11dba550c2721f8769af2eb1eec6b5&query=" + searchTerm
      $.ajax({
        url: urlString,
        success: (searchResults) => {
          console.log("Fetched Data successfully")
          //console.log(searchResults)
          const results = searchResults.results
          //console.log(results[0])

          var movieRows = []
          
          
          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w188_and_h282_bestv2" + movie.poster_path
            console.log(movie.poster_path)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            
            
            movieRows.push(movieRow)
          })
            this.setState({rows:movieRows})
          
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })
    }
    

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm)

  }

  render() {
    return (
      <div> 
        <table className = "titleBar">
          <tbody>
            <tr>
              <h1>
                Obama's Movie Gallery
              </h1>
            </tr>
            <tr className = "titleBar">
               <input style = {{
          fontSize: 24,
          width: "50%",
          paddingTop: ".5%",
          paddingBottom: "1%",
        
          
      }} onChange={this.searchChangeHandler.bind(this)} placeholder = "Enter movie title..."/> 
            </tr>
          </tbody>
        </table>
  
  
        
      
        {this.state.rows}
     
      <img width = "500" src = "Obama Final.png" className = "titleBar"/>
      </div>
    );
  }
}

export default App;
