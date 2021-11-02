import React, { Component} from 'react';
import Customers_Com from "./components/Customers_com";
import Products_Com from "./components/Products_com";
import Trades_Com from "./components/Trades_com";
import SpecialSearch from "./components/SpecialSearch";

const Obj = {
  0: <Customers_Com />,
  1: <Products_Com />,
  2: <Trades_Com />,
  3: <SpecialSearch />,
};

export default class ActiveTab extends Component {
  state = {
    activeId: 0,
  };

  

  clickHandler = (id) => {
    this.setState({ activeId: id });
  };

  render() {
    return (
      <wrapper>
        <div style={{ border : 'solid 1px black', width : '100%', textAlign : 'center' }}>
          <div style={{ display : 'grid', gridTemplateColumns : '25% 25% 25% 25%', textAlign : 'center' , color : '#0B3861',cursor:'pointer', textDecorationLine: 'underline' }}>
            <div style={{ border : 'solid 1px black', width : '100%', textAlign : 'center' }}>
              <div className="Customer_Tab" onClick={() => this.clickHandler(0)}><h4>Customers</h4></div>
            </div>
            <div style={{ border : 'solid 1px black', width : '100%', textAlign : 'center' }}>
              <div className="Products_Tab"onClick={() => this.clickHandler(1)}><h4>Products</h4></div>
            </div>
            <div style={{ border : 'solid 1px black', width : '100%', textAlign : 'center' }}>
              <div className="Trades_Tab"onClick={() => this.clickHandler(2)}><h4>Trades</h4></div>
            </div>
            <div style={{ border : 'solid 1px black', width : '100%', textAlign : 'center' }}>
              <div className="SpecialSearch_Tab"onClick={() => this.clickHandler(3)}><h4>SpecialSearch</h4></div>
            </div>
          </div>
        </div>
        <div className="contents">{Obj[this.state.activeId]}</div>
      </wrapper>
    );
  }
}

