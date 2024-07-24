import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

function AppointmentList() {
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cancelAppt = async (id) => {
    const apptUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(apptUrl, fetchConfig);

      if (response.ok) {
        getData();
      } else {
        throw new Error(
          `Failed to cancel appointment: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const finishAppt = async (id) => {
    const apptUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
    const fetchConfig = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(apptUrl, fetchConfig);

      if (response.ok) {
        getData();
      } else {
        throw new Error(
          `Failed to finish appointment: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

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
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {props.appointments.map((appt) => {
              const formatDate = moment(appt.date_time).format("MM/DD/YYYY");
              const dateTime = new Date(appt.date_time);
              const formatTime = moment(dateTime).format("LT");
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
                  <td>
                    <span>
                      <button
                        className="btn btn-primary"
                        style={{ border: "none", backgroundColor: "red" }}
                        onClick={() => cancelAppt(appt.id)}
                      >
                        Cancel
                      </button>
                    </span>
                    <span>
                      <button
                        className="btn btn-primary"
                        style={{ border: "none" }}
                        onClick={() => finishAppt(appt.id)}
                      >
                        Finish
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments/");

      if (response.ok) {
        const data = await response.json();
        const filteredData = data.appointments.filter(
          (appt) => appt.status == "CREATED"
        );
        setAppts(filteredData);
        setLoading(true);
      } else {
        throw new Error(
          `Failed to fetch appointments: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
      setError("Error occurred while fetching appointments.");
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

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Service Appointments.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/appointments/new"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Set up an Appointment
            </Link>
            <Link
              className="btn btn-primary btn-lg px-4 gap-3"
              to="/appointments/history"
            >
              Appointment History
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Service Appointments</h2>
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
                  Add a New Appointment
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AppointmentList;
