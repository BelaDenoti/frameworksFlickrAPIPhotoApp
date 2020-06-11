import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
      pictures: [], 
      indexValue: 0,
      textInput: 'cat',
    };
  }

  componentDidMount(){
  this.ReloadeImages(); 
  } // here i should have set the state of indexValue to 0, because i forget this, and everytime the array of pictures are updated, i forget to reset the index. 

  ReloadeImages = () => {
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=add62e430ba23c9987c34897be9c4f8d&tags='+this.state.textInput+'&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    }).then(function(j){
      let picArray = j.photos.photo.map((pic) => { 
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        var title = pic.title;
        return( 
          <div>   
              {title}
          <img alt="dogs" className="picturesEqualFormat" src={srcPath}></img>
          </div>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))

   
  }
    
  nextHandler = () => {
    var currentIndex = this.state.indexValue;
    if(currentIndex === this.state.lenght){
      currentIndex = 0;
   
    } else {
      currentIndex++;
    }
    this.setState({indexValue: currentIndex});
  }

  previousHandler = () => {
    var currentIndex = this.state.indexValue;
    if(currentIndex <= 0){
      currentIndex = 1;
      
    } else {
      currentIndex--;
    }
    this.setState({indexValue: currentIndex});
  }

  HandelChange = (event) => {
    const searchChange = event.target.value;
    if(searchChange !== ''){
      this.setState({textInput: searchChange});
    }
    if(searchChange === ''){
      this.setState({textInput: 'horse'});
    }
  }

  Delay = (function(){
    var timer = 0;
    return function(callback, ms){ 
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
    };
  })();

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome</h1>
        </header>
      <body>
          Picture#{this.state.indexValue}
        <div className="photo">
          {this.state.pictures[this.state.indexValue]}
        </div>
      
        <input className="textInput"
          onChange={this.HandelChange} 
          onKeyUp={() => this.Delay(function(){this.ReloadeImages();}
            .bind(this), 1000)}
          ></input>
        <div>
    <button onClick={this.previousHandler}> Previous</button> {/*Using the onclick event listener, which is set to run a jave script expression*/}
          <button onClick={this.nextHandler}> Next</button> {/*Using the onclick event listener, which is set to run a javescrip expression*/}
        </div>
      </body>
      </div>
    );
  }
}





export default App;