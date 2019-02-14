import React from 'react'

import Row from './row'

export default class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tickets: []
        }
        this.statusUpdate = this.statusUpdate.bind(this)
    }

    statusUpdate(data){
        this.props.updateStatus(data)
      }

    render(){

        let tickets = this.props.data()
        console.log(tickets)
        
        return (
            <div>
                <h2>Listings tickets - {tickets.length} </h2>
                <table border="1">
                    <thead>
                        <tr>
                         <th>Code</th>
                         <th>Name</th>
                         <th>Department</th>
                         <th>Priority</th>
                         <th>Message</th>
                         <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => {
                            return (
                                <Row key={ticket.id}
                                    data={ticket}
                                    statusUpdate={this.statusUpdate}
                                    allTickets={tickets}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}