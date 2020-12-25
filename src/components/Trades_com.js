import React, { Component } from 'react';
import axios from 'axios';

class Trade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      update : false,
    }
  }

  componentDidMount() {
    this._getTrade();
  }

  _addTrade = async(e) =>{
    const transactionNumber = document.getElementsByName('input_transactionNumber')[0].value.trim();
    const productID = document.getElementsByName('input_productID')[0].value.trim();
    const price = document.getElementsByName('input_price')[0].value.trim() * 1;
    const date = document.getElementsByName('input_date')[0].value.trim();
    const customerName = document.getElementsByName('input_customerName')[0].value.trim();
    e.preventDefault();

    if(transactionNumber === '') {
      alert("거래번호를 입력해주세요.");
      return;
    }
    if(productID === '') {
      alert("상품 번호를 입력해주세요.");
      return;
    }
    if(price === '') {
      alert("가격을 입력해주세요.");
      return;
    }
    if(date === '') {
      alert("날짜를 입력해주세요.");
      return;
    }
    if(customerName === '') {
      alert("고객이름을 입력해주세요.");
      return;
    }
    const data = { 
      transactionNumber : transactionNumber,
      productID : productID,
      price : parseFloat(price),
      date : date,
      customerName : customerName
    };

    const add_Trade = await axios('/add/Trade', {
      method : 'POST',
      headers: new Headers(),
      data : data
    })

    if(add_Trade.data) {
      alert('거래 데이터를 추가했습니다.');
      this._getTrade();
    }
  }

  _getTrade = async () => {
      const res = await axios.get('/get/Trade');
  
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);
  
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }
  
    _searchTrade = async(e) =>{
      
      const transactionNumber = document.getElementsByName('search_transactionNumber')[0].value.trim();
      const productID = document.getElementsByName('search_productID')[0].value.trim();
      const price = document.getElementsByName('search_price')[0].value.trim() * 1;
      const date = document.getElementsByName('search_date')[0].value.trim();
      const customerName = document.getElementsByName('search_customerName')[0].value.trim();
      
      e.preventDefault();
      const data = { 
        transactionNumber : transactionNumber,
        productID : productID,
        price : price,
        date : date,
        customerName : customerName};
  
      const search_Trade = await axios('/search/Trade', {
        method : 'POST',
        headers: new Headers(),
        data : data
      })
  
      if(search_Trade.data[0] === undefined) {
        alert('찾으시는 Trade가 없습니다.');
      }else{
        alert('검색을 완료하였습니다.');
        return this.setState({ list : search_Trade.data })
      }
    }

    render() {
      const { list } = this.state;
  
      return(
        <div className='Trade'>
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Trades Create </h4>
                <form method='POST' onSubmit={this._addTrade}>
                  <input type='text' placeholder="거래번호를 입력해주세요" maxLength='20' name='input_transactionNumber' />
                  <input type='text' placeholder="상품번호를 입력해주세요" maxLength='20' name='input_productID' />
                  <input type='number' step='0.0001' placeholder="가격을 입력해주세요" maxLength='20' name='input_price' />
                  <input type='date' maxLength='15' name='input_date' />
                  <input type='text' placeholder="고객이름을 입력해주세요" maxLength='20' name='input_customerName' />
                  <input type='submit' value='Add' />
                </form>
          </div>
  
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Trades Search </h4>
                <form method='POST' onSubmit={this._searchTrade}>
                  <input type='text' placeholder="검색할 거래번호를 입력해주세요" maxLength='20' name='search_transactionNumber' />
                  <input type='text' placeholder="검색할 상품번호를 입력해주세요" maxLength='20' name='search_productID' />
                  <input type='number' step='0.0001' placeholder="검색할 가격을 입력해주세요" maxLength='20' name='search_price' />
                  <input type='date' maxLength='15' name='search_date' />
                  <input type='text' placeholder="검색할 고객이름을 입력해주세요" maxLength='20' name='search_customerName' />
                  <input type='submit' value='Search' />
                </form>
          </div>
  
          <br /> <br />
            <div>
              <h4 style={{ color : '#6E6E6E'}}> Trades List </h4>
  
                <div style={{ border : 'solid 1px black', width : '90%', marginLeft : '7%', textAlign : 'left' }}>
                  <div style={{ display : 'grid', gridTemplateColumns : '20% 20% 15% 20% 25%', textAlign : 'center' }}>
                    <div> TransactionNumber </div>
                    <div> ProductID </div>
                    <div> Price </div>
                    <div> Date </div>
                    <div> CustomerName </div>
                  </div>
                </div>
  
              {list.length !== 0
                ? list.map( (el, key) => {
                  return(
                    <div key={key} style={{ display : 'grid', lineHeight : '60px', gridTemplateColumns : '20% 20% 15% 20% 25%', width : '90%', marginLeft : '7%'}}>
                      <div> {el.transactionNumber} </div>
                      <div> {el.productID} </div>
                      <div> {el.price} </div>
                      <div> {el.date} </div>
                      <div> {el.customerName} </div>
                    </div>
                  )
                })
              
                : null}
            </div>
        </div>
      )
    }
}

export default Trade;