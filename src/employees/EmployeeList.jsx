import { useState, useEffect } from "react"
import { getStaffUsers } from "../services/userService.jsx"
import "./Employees.css"
import { Link } from "react-router-dom"
import { User } from "../users/User"


export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((employeeArray) => {
            setEmployees(employeeArray)
        })

    }, [])


    return (
            <div className="employees">
            {employees.map((employeeObj) => {
                return (<Link to ={`/employees/${employeeObj.id}`} key={employeeObj.id}>
                    <User user={employeeObj} key={employeeObj} />
                </Link>
                )
            })}
        </div>
    )
}

