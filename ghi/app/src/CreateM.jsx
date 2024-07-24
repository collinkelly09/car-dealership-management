import React, { useState } from "react";
import { Link } from 'react-router-dom';

function ManufacturerCreationForm () {
    const [manufacturer, setManufacturer] = useState('')
    function handleManufacturerChange(event){
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = manufacturer;

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(manufacturerUrl, fetchConfig);
            if (response.ok) {
                setManufacturer('');
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
                        <Link to="/manufacturers" className="btn btn-primary btn-lg px-4 gap-3">All Manufacturers</Link>
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new manufacturer</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input required placeholder="Manufacturer" onChange={handleManufacturerChange} value={manufacturer} type="text" name="manufacturer" id="manufacturer" className="form-control" />
                                <label htmlFor="manufacturer">Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManufacturerCreationForm;
