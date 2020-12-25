import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      update : false,
    }
  }

  componentDidMount() {
    this._getProduct();
  }

  _addProduct = async(e) =>{
    const name = document.getElementsByName('input_name')[0].value.trim();
    const productID = document.getElementsByName('input_productID')[0].value.trim();
    const supplierName = document.getElementsByName('input_supplierName')[0].value.trim();
    e.preventDefault();
    if(name === '') {
      alert("이름을 입력해주세요.");
      return;
    }
    if(productID === '') {
      alert("상품번호를 입력해주세요.");
      return;
    }
    if(productID === '') {
      alert("공급자 이름을 입력해주세요.");
      return;
    }
    const data = { 
      name : name,
      productID : productID,
      supplierName : supplierName
    };

    const add_Product = await axios('/add/Product', {
      method : 'POST',
      headers: new Headers(),
      data : data
    })

    if(add_Product.data) {
      alert('상품 데이터를 추가했습니다.');
      this._getProduct();
    }
  }

  _getProduct = async () => {
      const res = await axios.get('/get/Product');
  
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);
  
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }
  
    _searchProduct = async(e) =>{
      
      const name = document.getElementsByName('search_name')[0].value.trim();
      const productID = document.getElementsByName('search_productID')[0].value.trim();
      const supplierName = document.getElementsByName('search_supplierName')[0].value.trim();
      e.preventDefault();
  
      const data = { 
        name : name,
        productID : productID,
        supplierName : supplierName};
  
      const search_Product = await axios('/search/Product', {
        method : 'POST',
        headers: new Headers(),
        data : data
      })
  
      if(search_Product.data[0] === undefined) {
        alert('찾으시는 Product가 없습니다.');
      }else{
        alert('검색을 완료하였습니다.');
        return this.setState({ list : search_Product.data })
      }
    }

    render() {
      const { list } = this.state;
  
      return(
        <div className='Product'>
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Products Create </h4>
                <form method='POST' onSubmit={this._addProduct}>
                  <input type='text' placeholder="상품 이름을 입력해주세요" maxLength='20' name='input_name' />
                  <input type='text' placeholder="상품 번호를 입력해주세요" maxLength='20' name='input_productID' />
                  <input type='text' placeholder="공급자 이름을 입력해주세요" maxLength='30' name='input_supplierName' />
                  <input type='submit' value='Add' />
                </form>
          </div>
  
          <br />
          <div>
              <h4 style={{ color : '#6E6E6E'}}> Products Search </h4>
                <form method='POST' onSubmit={this._searchProduct}>
                  <input type='text' placeholder="검색할 상품 이름을 입력해주세요" maxLength='20' name='search_name' />
                  <input type='text' placeholder="검색할 상품 번호를 입력해주세요" maxLength='20' name='search_productID' />
                  <input type='text' placeholder="검색할 공급자 이름을 입력해주세요" maxLength='30' name='search_supplierName' />
                  <input type='submit' value='Search' />
                </form>
          </div>
  
          <br /> <br />
            <div>
              <h4 style={{ color : '#6E6E6E'}}> Products List </h4>
  
                <div style={{ border : 'solid 1px black', width : '80%', marginLeft : '16%', textAlign : 'left' }}>
                  <div style={{ display : 'grid', gridTemplateColumns : '25% 35% 28%', textAlign : 'center' }}>
                    <div> Name </div>
                    <div> ProductID </div>
                    <div> SupplierName </div>
                  </div>
                </div>
  
              {list.length !== 0
                ? list.map( (el, key) => {
                  return(
                    <div key={key} style={{ display : 'grid', lineHeight : '60px', gridTemplateColumns : '25% 35% 28%', width : '80%', marginLeft : '16%'}}>
                      <div> {el.name} </div>
                      <div> {el.productID} </div>
                      <div> {el.supplierName} </div>
                    </div>
                  )
                })
                : null}
            </div>
        </div>
      )
    }
}

export default Product;