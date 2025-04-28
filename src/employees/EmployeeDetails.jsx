import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllEmployees } from "../services/employeeService"
import "./Employees.css"
 






export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()

    useEffect(() => {
        getAllEmployees(employeeId).then((data) => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [employeeId])



    return (<section className="employee">
        <header className="employee-header">{employee.user?.fullName}</header>
        <div>
            <span className="employee-info"> Email: {employee.user?.email}</span>
        </div>
        <div>
            <span className="employee-info">Specialty: {employee.specialty}</span>
        </div>
        <div>
            <span className="employee-info">Rate: ${employee.rate} /hr </span>
        </div>
    </section>
    )
}