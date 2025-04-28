import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketServices"


export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
  const [employees, setEmployees] = useState([])
  const [assignedEmployee, setAssignedEmployee] = useState({})

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setEmployees(employeesArray)
    })
  }, [])


  useEffect(() => {

    const foundEmployee = employees.find(
      (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
    )

    setAssignedEmployee(foundEmployee)
  }, [employees, ticket])


  const handleClaim = () => {

    const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

    const newEmployeeeTicket = {
      employeeId: currentEmployee.id,
      serviceTicketId: ticket.id
    }

    assignTicket(newEmployeeeTicket).then(() => {
      getAndSetTickets()
    })
    
  }

const handleClose = () => {
  const closedTicket = {
    id:ticket.id,
    userId: ticket.userId,
    description: ticket.description,
    emergency: ticket.emergency,
    dateCompleted: new Date(),
  }
  updateTicket(closedTicket).then(() => {
    getAndSetTickets()
  })
}

const handleDelete =  () => {
  deleteTicket(ticket.id).then(() => {
    getAndSetTickets()    
  } )
}
 
  return (
    <section className="ticket" >
      <header className="ticket-info">#{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
        </div>
        <div>
          <div className="ticket-info">emergency</div>
          <div>{ticket.emergency ? "yes" : "no"}</div>
        </div>
        <div className="btn-container">
          {/* If logged in user is an employ ee, and there's no employee ticket associated with the service ticket,
               then a button to claim the ticket should display*/}
          {currentUser.isStaff && !assignedEmployee ? (
            <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
          ) : (
            ""
          )}
          {/*IF the logged in user is the assigned employee for the ticket 
               and there us no dateCompleted, the button to close the ticket should display */}
          {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
            <button className="btn btn-warning" onClick={handleClose}>Close</button>) : (
            " "
          )}
          {! currentUser.isStaff ? (<button className="btn btn-warning" onClick={handleDelete}>Delete</button>) : (
            " "
          ) }
        </div>
      </footer>
    </section>
  )
}