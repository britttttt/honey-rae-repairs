import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketServices"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { FilterBar } from "./TicketFilter"

export const TicketList = ({currentUser}) => {

  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      if (currentUser.isStaff) {
      setAllTickets(ticketsArray)
       } else {
        const customerTickets = ticketsArray.filter(
          (ticket) => ticket.userId === currentUser.id)
          setAllTickets(customerTickets)
       }
    })
  }

  useEffect(() => {
   getAndSetTickets()
  }, [currentUser]) //ONLY runs on initial render of component / prevents infinite loop

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets]) //will run on Initial Render and if ShowEmergencyOnly changes

 useEffect(() => {
  const foundTickets = allTickets.filter((ticket) => ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
    setFilteredTickets(foundTickets)
 }, [searchTerm, allTickets])

 useEffect(() => {
  if (showOpenOnly) {
    const openTickets = allTickets.filter(ticket => ticket.dateCompleted === '')
    setFilteredTickets(openTickets)
  } else {
    setFilteredTickets(allTickets)
  }
 }, [showOpenOnly, allTickets])

  return (
    <div className="tickets-container">
      
      <FilterBar setShowEmergencyOnly={setShowEmergencyOnly} 
      setShowOpenOnly = {setShowOpenOnly}
      setSearchTerm={setSearchTerm}
      currentUser={currentUser}
      />

      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return <Ticket 
          ticket={ticketObj} 
          currentUser={currentUser} 
          getAndSetTickets={getAndSetTickets}
          key={ticketObj.id} 
          />
        })}
      </article>
    </div>
  )
}

