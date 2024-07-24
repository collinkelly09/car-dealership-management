import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const CreateTable = (props) => {
  return (
    <>
      <table className="table table-light table-striped w-100">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {props.appointments.map((appt) => {
            const formatDate = new Date(appt.date_time).toLocaleDateString(
              "en-US"
            );
            const formatTime = new Date(appt.date_time).toLocaleTimeString(
              "en-US"
            );
            return (
              <tr key={appt.id}>
                <td>{appt.vin}</td>
                <td>{appt.vip}</td>
                <td>{appt.customer}</td>
                <td>{formatDate}</td>
                <td>{formatTime}</td>
                <td>
                  {appt.technician.first_name} {appt.technician.last_name}
                </td>
                <td>{appt.reason}</td>
                <td>{appt.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function AppointmentHistory() {
  const [appts, setAppts] = useState([]);
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleVinChange = (event) => {
    const val = event.target.value;
    setVin(val);
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments/");

      if (response.ok) {
        const data = await response.json();
        setAppts(data.appointments);
        setLoading(true)
      } else {
        throw new Error(
          `Failed to fetch appointments: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
      setError("Error occurred while fetching appointments.")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleSearch = (vin) => {
    if (vin === "") {
      getData();
    } else {
      const filtered = appts.filter((appt) => appt.vin.indexOf(vin) !== -1);
      setAppts(filtered);
    }
  };

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Appointments History.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/appointments/new"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Set up an Appointment
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Appointments History</h2>
        <div className="input-group mb-3">
          <input
            required
            onChange={handleVinChange}
            value={vin}
            id="employee"
            name="employee"
            placeholder="Search By VIN"
            className="form-control"
          />
          <button className="btn btn-primary" onClick={() => handleSearch(vin)}>
            Search
          </button>
        </div>

        <div className="row">
          {appts.length > 0 ? (
            <CreateTable appointments={appts} />
          ) : (
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No appointments Found</h4>
              <p>There are currently no appointments in the system.</p>
              <hr />
              <p className="mb-0">
                <Link to="/appointments/new" className="btn btn-primary">
                  Set up an Appointment
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AppointmentHistory;
