import React, {Component} from 'react';
import './App.css'
import Header from "../Header/Header";
import Demo from "../Demo/Demo";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className={'main'}>
          <Demo title={'Test'} data={{a: 1, c: {f: 12}}} value={{"===":[1,{"var":["c.f",1]}]}}/>
        </div>
      </div>
    );
  }
}

export default App;
