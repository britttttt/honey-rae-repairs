import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav} from "../nav/EmployeeNav"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerDetails } from "../components/tickets/customers/CustomerDetails"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { EmployeeList } from "../employees/EmployeeList"
import { CustomerList } from "../components/tickets/customers/CustomersList"
import { EmployeeForm } from "../components/forms/EmployeeForm"

export const EmployeeViews = ({currentUser}) => {
    return ( 
    
    <Routes>

        <Route path="/" element={
          <>
            <EmployeeNav />
  
            <Outlet />
          </>
        }>
          <Route index element={<Welcome />} />
          <Route path="tickets" element={<TicketList  currentUser={currentUser}/>} />
          <Route path="employees">
            <Route index element={<EmployeeList />} />
            <Route path=":employeeId" element={<EmployeeDetails />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path=":customerId" element={<CustomerDetails />} />
          </Route>
          <Route path="/profile"  element={<EmployeeForm  currentUser={currentUser} />} />
        </Route>
      </Routes>
      )
}