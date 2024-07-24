import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function CustomerCreationForm () {
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
    const [number, setNumber] = useState('')
    function handleNumberChange(event){
        const value = event.target.value;
        setNumber(value);
    }
    const [address, setAddress] = useState('')
    function handleAddressChange(event){
        const value = event.target.value;
        setAddress(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = first;
        data.last_name = last;
        data.phone_number = number;
        data.address = address;

        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(customerUrl, fetchConfig);
            if (response.ok) {
                setFirst('');
                setLast('');
                setNumber('');
                setAddress('');
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
                        <Link to="/customers" className="btn btn-primary btn-lg px-4 gap-3">All Customers</Link>
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Customer</h1>
                        <form onSubmit={handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input required placeholder="First" onChange={handleFirstChange} value={first} type="text" name="first_name" id="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Last" onChange={handleLastChange} value={last} type="text" name="last_name" id="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Number" onChange={handleNumberChange} value={number} type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="number">Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea required placeholder="Address" onChange={handleAddressChange} value={address} type="text" name="address" id="address" className="form-control"></textarea>
                                <label htmlFor="address">Address</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerCreationForm;
