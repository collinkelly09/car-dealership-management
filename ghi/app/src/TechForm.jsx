import React, { useState } from "react";

function TechForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleFirstNameChange = (event) => {
    const val = event.target.value;
    setFirstName(val);
  };

  const handleLastNameChange = (event) => {
    const val = event.target.value;
    setLastName(val);
  };

  const handleEmployeeId = (event) => {
    const val = event.target.value;
    setEmployeeId(val);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.employee_id = employeeId;

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
        const response = await fetch(techUrl, fetchConfig)
        if (response.ok) {
            setFirstName('')
            setLastName('')
            setEmployeeId('')
        } else {
            throw new Error(`Failed to create technician: ${response.status} ${response.statusText}`)
        }
    } catch (e) {
        console.error(e)
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Technician</h1>
          <form onSubmit={handleSubmit} id="create-tech-form">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                required
                type="text"
                name="first-name"
                id="first-name"
                placeholder="First Name"
                onChange={handleFirstNameChange}
                value={firstName}
              />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="last-name"
                name="last-name"
                placeholder="Last Name"
                onChange={handleLastNameChange}
                value={lastName}
              />
              <label htmlFor="last-name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="employee-id"
                name="employee-id"
                placeholder="Employee ID"
                onChange={handleEmployeeId}
                value={employeeId}
              />
              <label htmlFor="employee-id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechForm;
