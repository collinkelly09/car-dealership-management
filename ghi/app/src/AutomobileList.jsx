import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CreateTable(props) {
  return (
    <>
      <table className="table table-light table-striped w-100">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {props.automobiles.map((auto) => {
            let sold = auto.sold ? "Yes" : "No";

            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{sold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function AutomobileList() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8100/api/automobiles/");

      if (response.ok) {
        const data = await response.json();
        setAutos(data.autos);
        setLoading(true);
      } else {
        throw new Error(
          `Failed to fetch automobiles: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
      setError("Error occurred while fetching automobiles.");
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
          <p className="lead mb-4">The list of all our Automobiles.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              to="/automobiles/new"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Add a New Automobiles
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Automobiles</h2>
        <div className="row">
          {autos.length > 0 ? (
            <CreateTable automobiles={autos} />
          ) : (
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No automobiles Found</h4>
              <p>There are currently no automobiles in the system.</p>
              <hr />
              <p className="mb-0">
                <Link to="/automobiles/new" className="btn btn-primary">
                  Add a New Automobile
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AutomobileList;
