import React from 'react'

export default class Search extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            searchBox: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })

        let result = this.props.responseData().filter(ticket => {
            return ticket.ticket_code == event.target.value
        })

        if(event.target.value){
            this.props.data(result)
        } else {
            this.props.data(this.props.responseData())
        }
    }

    render(){
        return (
            <div>
                <label> <b>Search: </b>
                <input type="text" name="searchBox" placeholder="search" onBlur={this.handleChange}  />

                </label>

            </div>
        )
    }
}