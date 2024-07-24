import React, { useEffect, useState } from "react";

function ApptForm() {
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tech, setTech] = useState("");
  const [reason, setReason] = useState("");
  const [techs, setTechs] = useState([]);

  const handleVinChange = (event) => {
    const val = event.target.value;
    setVin(val);
  };

  const handleCustomerChange = (event) => {
    const val = event.target.value;
    setCustomer(val);
  };

  const handleDateChange = (event) => {
    const val = event.target.value;
    setDate(val);
  };

  const handleTimeChange = (event) => {
    const val = event.target.value;
    setTime(val);
  };

  const handleTechChange = (event) => {
    const val = event.target.value;
    setTech(val);
  };

  const handleReasonChange = (event) => {
    const val = event.target.value;
    setReason(val);
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");

    if (response.ok) {
      const data = await response.json();
      setTechs(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateTime = new Date(`${date} ${time}`)
    const data = {};
    data.vin = vin;
    data.customer = customer;
    data.date_time = dateTime;
    data.technician = tech;
    data.reason = reason;

    const techUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(techUrl, fetchConfig);
      if (response.ok) {
        setVin("");
        setCustomer("");
        setDate("");
        setTime("");
        setTech("");
        setReason("");
      } else {
        throw new Error(
          `Failed to create appointment: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Appointment</h1>
          <form onSubmit={handleSubmit} id="create-tech-form">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                required
                type="text"
                name="vin"
                id="vin"
                placeholder="Automobile VIN"
                onChange={handleVinChange}
                value={vin}
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="customer"
                name="customer"
                placeholder="Customer"
                onChange={handleCustomerChange}
                value={customer}
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="Date"
                className="form-control"
                id="date"
                name="date"
                placeholder="Employee ID"
                onChange={handleDateChange}
                value={date}
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="time"
                className="form-control"
                id="time"
                name="time"
                placeholder="Time"
                onChange={handleTimeChange}
                value={time}
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="form-floating mb-3">
              <select
                required
                name="tech"
                id="tech"
                className="form-select"
                value={tech}
                onChange={handleTechChange}
              >
                <option value="">Choose a Tech</option>
                {techs.map((tech) => {
                  return (
                    <option key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="reason"
                name="reason"
                placeholder="Reason"
                onChange={handleReasonChange}
                value={reason}
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApptForm;
