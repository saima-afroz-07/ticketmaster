import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'

export default class Filter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFilter: ''
        }
        this.eventHandler = this.eventHandler.bind(this)
    }
    eventHandler(event){
     console.log(event.target.value)

     this.setState({
         [event.target.value] : event.target.value
     })
     let result = this.props.responseData().filter(ticket => {
         return ticket.priority == event.target.value
     })

     if(event.target.value && (event.target.value != 'all')){
          this.props.data(result)
     } else{
        this.props.data(this.props.responseData())
     }

    }

    render(){
        return(
            <div>
                <br/>
                <label><b>Priority: </b>
                <ButtonGroup>
                    <Button name="selectedFilter" value="all" onClick={this.eventHandler} >All</Button>
                    <Button name="selectedFilter" value="high" onClick={this.eventHandler}>High</Button>
                        <Button name="selectedFilter" value="medium" onClick={this.eventHandler}>Medium</Button>
                        <Button name="selectedFilter" value="low" onClick={this.eventHandler}>Low</Button>
                </ButtonGroup>
                </label>
            </div>
        )
    }
}