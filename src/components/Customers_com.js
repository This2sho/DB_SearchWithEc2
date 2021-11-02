import React, { Component } from 'react';
import axios from 'axios';

class Customer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      update : false,
    }
  }

  componentDidMount() {
    this._getCustomer();
  }

  _addCustomer = async(e) =>{
    const name = document.getElementsByName('input_name')[0].value.trim();
    const phone = document.getElementsByName('input_phone')[0].value.trim();
    const address = document.getElementsByName('input_address')[0].value.trim();
    const gender = document.getElementsByName('input_gender')[0].value.trim();
    e.preventDefault();

    if(name === '') {
      alert("이름을 입력해주세요.");
      return;
    }
    if(phone === '') {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    if(address === '') {
      alert("주소를 입력해주세요.");
      return;
    }
    if(gender === '') {
      alert("성별을 입력해주세요.");
      return;
    }

    const data = { 
      name : name,
      phone : phone,
      address : address,
      gender : gender,
    };

    const add_customer = await axios('/add/Customer', {
      method : 'POST',
      headers: new Headers(),
      data : data
    })

    if(add_customer.data) {
      alert('고객 데이터를 추가했습니다.');
      window.location.reload();
    }
  }

  _getCustomer = async () => {
      const res = await axios.get('/get/Customer');
  
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);
  
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }
  
    _searchCustomer = async(e) =>{
      
      const name = document.getElementsByName('search_name')[0].value.trim();
      const phone = document.getElementsByName('search_phone')[0].value.trim();
      const address = document.getElementsByName('search_address')[0].value.trim();
      const gender = document.getElementsByName('search_gender')[0].value.trim();
      e.preventDefault();
  
      const data = { 
        name : name,
        phone : phone,
        address : address,
        gender : gender};
  
      const search_customer = await axios('/search/Customer', {
        method : 'POST',
        headers: new Headers(),
        data : data
      })
  
      if(search_customer.data[0] === undefined) {
        alert('찾으시는 Customer가 없습니다.');
      }else{
        alert('검색을 완료하였습니다.');
        return this.setState({ list : search_customer.data })
      }
    }

    render() {
      const { list } = this.state;
  
      return(
        <div className='Customer'>
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Customers Create </h4>
                <form method='POST' onSubmit={this._addCustomer}>
                  <input type='text' placeholder="이름을 입력해주세요" maxLength='20' name='input_name' />
                  <input type='text' placeholder="휴대폰번호를 입력해주세요" maxLength='20' name='input_phone' />
                  <input type='text' placeholder="주소를 입력해주세요" maxLength='30' name='input_address' />
                  <input type='text' placeholder="성별을 입력해주세요" maxLength='10' name='input_gender' />
                  <input type='submit' value='Add' />
                </form>
          </div>
  
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Customers Search </h4>
                <form method='POST' onSubmit={this._searchCustomer}>
                  <input type='text' placeholder="검색할 이름을 입력해주세요" maxLength='20' name='search_name' />
                  <input type='text' placeholder="검색할 휴대폰번호를 입력해주세요" maxLength='20' name='search_phone' />
                  <input type='text' placeholder="검색할 주소를 입력해주세요" maxLength='30' name='search_address' />
                  <input type='text' placeholder="검색할 성별을 입력해주세요" maxLength='10' name='search_gender' />
                  <input type='submit' value='Search' />
                </form>
          </div>
  
          <br /> <br />
            <div>
              <h4 style={{ color : '#6E6E6E'}}> Customers List </h4>
  
                <div style={{ border : 'solid 1px black', width : '80%', marginLeft : '10%', textAlign : 'left' }}>
                  <div style={{ display : 'grid', gridTemplateColumns : '30% 25% 30% 15%', textAlign : 'center' }}>
                    <div> Name </div>
                    <div> Phone </div>
                    <div> Address </div>
                    <div> Gender </div>
                  </div>
                </div>
  
              {list.length !== 0
                ? list.map( (el, key) => {
                  return(
                    <div key={key} style={{ display : 'grid', lineHeight : '60px', gridTemplateColumns : '30% 25% 30% 15%', width : '80%', marginLeft : '10%'}}>
                      <div> {el.name} </div>
                      <div> {el.phone} </div>
                      <div> {el.address} </div>
                      <div> {el.gender} </div>
                    </div>
                  )
                })
              
                : null}
            </div>
        </div>
      )
    }
}

export default Customer;