import React, { Component } from 'react';
import axios from 'axios'
import Table from './components/table-display/table'
import Form from './components/forms/form'
import Search from './components/search/search'
import Filter from './components/filter/filter'

import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tickets : [],
      responseData : []
    }
    this.ticketsData = this.ticketsData.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.responseData = this.responseData.bind(this)
    this.formUpdate = this.formUpdate.bind(this)
    this.searchUpdate = this.searchUpdate.bind(this)
    this.filterUpdate = this.filterUpdate.bind(this)
  }

  ticketsData(){
    return this.state.tickets;
  }

  updateStatus(data){

    console.log(data)

    let array = (this.state.tickets.map(ticket =>{
        return ticket.id
    }))
    console.log(array)

    let index = array.indexOf(data.id)
    console.log(index)

    let arrayUpdate = this.state.tickets;
    console.log(arrayUpdate)
    arrayUpdate.splice(index,1,data)
    console.log(arrayUpdate)

    
    
    this.setState({
        tickets: arrayUpdate,
        responseData:arrayUpdate
      
    })
  }
  formUpdate(data){
 this.setState(prevState => {
   console.log(prevState)
   return {
     ticket: prevState.tickets.concat(data),
     responseData: prevState.responseData.concat(data)
   }
 })
  }
  searchUpdate(data){
    // console.log(data)
    this.setState({
      tickets: data
    })
  }
  
  filterUpdate(data){
    //console.log(data)
    this.setState({
      tickets: data
    })
  }

  responseData(){
    return this.state.responseData;
  }
  

  componentDidMount(){
    axios.get(`http://dct-api-data.herokuapp.com/tickets/?api_key=d5d02fdf834f329e`).then(response => {
      this.setState({
        tickets: response.data,
        responseData: response.data
      })
    }).catch(function(err){
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <center><h1>Ticket Master</h1></center>
        <Search data= {this.searchUpdate} responseData= {this.responseData}  />
        <br/>
        <Filter data = {this.filterUpdate} responseData={this.responseData}/>
        <br/>
        <Table data={this.ticketsData} updateStatus={this.updateStatus} />
        <br/>
        <Form data ={this.formUpdate} />    
      </div>
    );
  }
}

export default App;
