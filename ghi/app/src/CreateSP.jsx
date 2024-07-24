import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

function SalespersonCreationForm () {
    const [employeeId, setEmployeeId] = useState('')
    function handleEmployeeIDChange(event){
        const value = event.target.value;
        setEmployeeId(value);
    }
    const [first, setFirst] = useState('')
    function handleFirstChange(event){
        const value = event.target.value;
        setFirst(value);
    }
    const [last, setLast] = useState('')
    function handleLastChange(event){
        const value = event.target.value;
        setLast(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.employee_id = employeeId;
        data.first_name = first;
        data.last_name = last;

        const employeeUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(employeeUrl, fetchConfig);
            if (response.ok) {
                setEmployeeId('');
                setFirst('');
                setLast('');
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
                <h1 className="display-5 fw-bold">CarCar</h1>
                <div className="col-lg-6 mx-auto">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/salespeople" className="btn btn-primary btn-lg px-4 gap-3">All Salespeople</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input required placeholder="Id" onChange={handleEmployeeIDChange} value={employeeId} type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee ID</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="First" onChange={handleFirstChange} value={first} type="text" name="first_name" id="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Last" onChange={handleLastChange} value={last} type="text" name="last_name" id="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalespersonCreationForm;
