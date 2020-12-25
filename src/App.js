import React, { Component} from 'react';
import './App.css';
import ActiveTab from "./ActiveTab";


class App extends Component {
  render() {
    return(
      <div className='App' style={{textAlign:'center'}}>
        <h3> 데이터 베이스 과제 2 </h3>
        <h4> 201624535 이건호</h4>
        <h4> 아래의 원하는 메뉴를 눌러주세요</h4>
        <ActiveTab/>
        </div>
    )
  }
}

export default App;