import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ModelsTable(props) {
    return (
        <>
            <table className="table table-light table-striped w-100">
                <thead className="">
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{ model.name }</td>
                                <td>{ model.manufacturer.name }</td>
                                <td><img src={ model.picture_url } style={{width: "5em"}} className="rounded" alt="..." /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function ModelsList() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8100/api/models/');
      
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
        setError(null)
      } else {
        console.error('Failed to fetch models:', response.status, response.statusText);
        setError("There are no vehicle models. Please try again later.")
      }
    } catch (e) {
        console.error(e);
        setError("Error occurred while fetching vehicle models.")
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
            The list of all our vehicle models.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/models/new" className="btn btn-primary btn-lg px-4 gap-3">Add a New Vehicle Model</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Vehicle Models</h2>
        <div className="row">
          {models.length > 0 ? (
            <ModelsTable models={models} />
          ):(
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No Vehicle Models Found</h4>
              <p>There are currently no vehicle models in the system.</p>
              <hr />
              <p className="mb-0">
                  <Link to="/models/new" className="btn btn-primary">Add a New Vehicle Model</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )  
}
  

export default ModelsList;