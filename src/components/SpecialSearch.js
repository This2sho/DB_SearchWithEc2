import React, { Component } from 'react';
import axios from 'axios';


class SpecialSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      update : false,
    }
  }

  _SearchA = async (e) => {
    e.preventDefault();
    const name ="";
    const productID ="";
    const supplierName ="";
    const data ={
      name : name,
      productID : productID,
      supplierName : supplierName
    };
    const search_A = await axios('/search/A', {
      method : 'POST',
      headers: new Headers(),
      data: data
    })

    if(search_A.data[0] === undefined) {
      alert('찾으시는 데이터가 없습니다.');
    }else{
      alert('검색을 완료하였습니다.');
      return this.setState({ list : search_A.data[0] })
    }
  }

  _SearchB = async (e) => {
    e.preventDefault();
    const date = document.getElementsByName('search_date')[0].value.trim();
    const num = document.getElementsByName('search_num')[0].value.trim();
    if(date===''){
      alert("날짜를 입력해주세요.");
      return;
    }
    if(num===''){
      alert("원하는 개수를 입력해주세요.");
      return;
    }
    const data ={
      num : num,
      date : date
    };
    const search_B = await axios('/search/B', {
      method : 'POST',
      headers: new Headers(),
      data: data
    })
    if(search_B.data[0] === undefined) {
      alert('찾으시는 데이터가 없습니다.');
    }else{
      alert('검색을 완료하였습니다.');
      return this.setState({ list : search_B.data[0] })
    }
  }

  _SearchC = async (e) => {
    e.preventDefault();
    const num = document.getElementsByName('search_count')[0].value.trim();
    if(num===''){
      alert("원하는 횟수를 입력해주세요.");
      return;
    }
    const data ={
      num : num
    };
    const search_C = await axios('/search/C', {
      method : 'POST',
      headers: new Headers(),
      data: data
    })
    if(search_C.data[0] === undefined) {
      alert('찾으시는 데이터가 없습니다.');
    }else{
      alert('검색을 완료하였습니다.');
      console.log(search_C.data)
      return this.setState({ list : search_C.data[0] })
    }
  }
  
  render() {
    const { list } = this.state;
    return(
      <div className='SpecialSearch'>
        <br />
        <div className='A'>
          <form method='POST' onSubmit={this._SearchA}>
            <h4 style={{ color : '#6E6E6E'}}>A.	남자보다 여자가 많이 산 상품의 이름&nbsp;&nbsp;
            <input type='submit' value='SearchA'/></h4>
          </form>
            <h4 style={{ color : '#6E6E6E'}}>B. 주어진 날 이전에 가장 많은 거래(금액기준)가 이루어진 k가지 상품</h4> 
              <form method='POST' onSubmit={this._SearchB}>
                <input type='date' maxLength='15' name='search_date' />
                &nbsp;&nbsp;
                <input type='number' placeholder="원하는 개수(k)를 입력하세요." maxLength='10' name='search_num' />
                &nbsp;&nbsp;
                <input type='submit' value='SearchB'/>
              </form> 
              <h4 style={{ color : '#6E6E6E'}}>C. 하나의 supplier에서 m 번 이상의 제품을 산 고객의 이름</h4> 
              <form method='POST' onSubmit={this._SearchC}>
                <input type='number' placeholder="횟수(m)을 입력하세요." maxLength='10' name='search_count' />
                &nbsp;&nbsp;
                <input type='submit' value='SearchC'/>
              </form>
              <br /> <br />
              <div>
                <h4 style={{ color : '#6E6E6E'}}> Special Search List </h4>
              </div>  
        </div>
        <div> 
            <div > 
              <div style={{ border : 'solid 1px black', width : '80%', marginLeft : '16%', textAlign : 'left' }}>
                <div style={{ display : 'grid', gridTemplateColumns : '25% 35% 28%', textAlign : 'center' }}>
                  <div> Name </div>
                  <div> ProductID or Count </div>
                  <div> SupplierName </div>
                </div>
              </div>

              {list.length !== 0
                ? list.map( (el, key) => {
                  return(
                    <div key={key} style={{ display : 'grid', lineHeight : '60px', gridTemplateColumns : '25% 35% 28%', width : '80%', marginLeft : '16%'}}>
                      <div> {el.name} {el.customerName}</div>
                      <div> {el.productID} {el['count(customerName)']}</div>
                      <div> {el.supplierName} </div>
                    </div>
                  )
                })
              : null}
            </div>
        </div>
      </div>
    )
  }

 
}

export default SpecialSearch;