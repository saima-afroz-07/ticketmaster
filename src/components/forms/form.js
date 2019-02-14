import React from 'react'
import axios from 'axios'

export default class SubmitForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            department:'',
            priority:'',
            message:''
        }
        this.eventHandler = this.eventHandler.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    eventHandler(event){
        console.log(event.target.name)
        console.log(event.target.value)

        this.setState({
            [event.target.name]: event.target.value
        })
    } 
    submitHandle(e){
      
       e.preventDefault()

       let newTicket ={
           name: this.state.name,
           department: this.state.department,
           priority: this.state.priority,
           message: this.state.message
       }
       console.log(newTicket)
       axios.post(`http://dct-api-data.herokuapp.com/tickets/?api_key=d5d02fdf834f329e`, newTicket).then(response => {
           this.props.data(response.data)
       })

       e.target.reset()

    }

    resetField(event){
        console.log(event)
        event.target.reset()
    }

    render(){
        return (
            <div>
                
                <form onSubmit={this.submitHandle}>
                <fieldset>
                    <legend>ADD FORM</legend>
                <label> Name:
                    <input type="text" name="name" onChange={this.eventHandler} />
                </label>
                <br/>
                <label> Department: </label>
                <select name="department" onChange={this.eventHandler}>
                    <option value="">Select</option>
                    <option value="hr">HR</option>
                    <option value="technical">Technical</option>

                </select>
                <br/>
                <label for="priority">Priority: </label>
                <input type="radio" id="high" name="priority" value="high" onChange={this.eventHandler} />
                <label for="high"> high </label>
                <input type="radio" id="medium" name="priority" value="medium" onChange={this.eventHandler}/>
                <label for="medium"> medium</label> 
                <input type="radio" id="low" name="priority" value="low" onChange={this.eventHandler}/>
                <label for="low"> low</label> 
                <br/>

                <label> Message: 
                <textarea name="message" onChange={this.eventHandler}></textarea>
                </label>
                <br/>
               <input type="submit" />
               <input type="reset" />
                </fieldset>

                </form>

            </div>
        )
    }
}
