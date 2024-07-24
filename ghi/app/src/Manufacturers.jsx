import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ManufacturerTable(props) {
    return (
        <>
            <table className="table table-light table-striped w-100">
                <thead className="">
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{ manufacturer.name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8100/api/manufacturers/');

      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
        setError(null)
      } else {
        console.error('Failed to fetch manufacturers:', response.status, response.statusText);
        setError("There are no manufacturers. Please try again later.")
      }
    } catch (e) {
        console.error(e);
        setError("Error occurred while fetching manufacturers.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className='alert alert-danger'>{error}</div>
  }

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The list of all our manufacturers.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/manufacturers/new" className="btn btn-primary btn-lg px-4 gap-3">Add a New manufacturer</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Manufacturers</h2>
        <div className="row">
          {manufacturers.length > 0 ? (
            <ManufacturerTable manufacturers={manufacturers} />
          ):(
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No manufacturers Found</h4>
              <p>There are currently no manufacturers in the system.</p>
              <hr />
              <p className="mb-0">
                  <Link to="/customers/new" className="btn btn-primary">Add a New Manufacturer</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}


export default ManufacturersList;
