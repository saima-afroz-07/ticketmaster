import React from 'react'
import axios from 'axios'

export default class Row extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tickets : [],
            checkedItems : new Map()
        }
        this.checkboxHandler = this.checkboxHandler.bind(this)

    }


   checkboxHandler(event){
       console.log(event.target.checked)

       let name = event.target.name // name is user.id
       let isChecked = event.target.checked // it will give status

       console.log(name, isChecked)

       this.setState(prevState => ({
           checkedItems: prevState.checkedItems.set(name, isChecked)
       })) // then we are setting the status

       console.log(this.props.data)

       console.log(this.props.data.status)

       if(event.target.checked){ // ? isChecked
           this.props.data.status = 'completed'
       } else {
           this.props.data.status = 'open'
       }

       axios.put(`http://dct-api-data.herokuapp.com/tickets/${this.props.data.ticket_code}/?api_key=d5d02fdf834f329e`, this.props.data).then(response => {
           console.log(response.data)
           this.props.statusUpdate(response.data)
       })

    }

    status(user){
        if(user.status == 'open'){
            return false
        } else {
            return true
        }
    }

    render(){
        let user = this.props.data
        

        return (
          <tr  key={user.id}>
              <td>{user.ticket_code}</td>
              <td>{user.name}</td>
              <td>{user.department}</td>
              <td>{user.priority}</td>
              <td>{user.message}</td>
              <td><input 
              type="checkbox" 
              checked={this.status(user) || this.state.checkedItems.get(user.id)} 
              name={user.id} 
              onChange={this.checkboxHandler} /></td>
          </tr>
        )
    }

}