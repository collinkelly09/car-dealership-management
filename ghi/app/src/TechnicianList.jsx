import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CreateTable(props) {
  return (
    <>
      <table className="table table-light table-striped w-100">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {props.technicians.map((tech) => {
            return (
              <tr key={tech.id}>
                <td>{tech.employee_id}</td>
                <td>{tech.first_name}</td>
                <td>{tech.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function TechnicianList() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/technicians/");

      if (response.ok) {
        const data = await response.json();
        setTechs(data.technicians);
        setLoading(true);
      } else {
        throw new Error(
          `Failed to fetch technicians: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
      setError("Error occurred while fetching technicians.");
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
          <p className="lead mb-4">The list of all our Technicians.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/technicians/new"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Add a New Technician
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Technicians</h2>
        <div className="row">
          {techs.length > 0 ? (
            <CreateTable technicians={techs} />
          ) : (
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No technicians Found</h4>
              <p>There are currently no technicians in the system.</p>
              <hr />
              <p className="mb-0">
                <Link to="/technicians/new" className="btn btn-primary">
                  Add a New Technician
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TechnicianList;
