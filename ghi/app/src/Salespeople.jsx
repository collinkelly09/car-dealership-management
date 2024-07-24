import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function SalespeopleTable(props) {
    return (
        <>
            <table className="table table-light table-striped w-100">
                <thead className="">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.salespeople.map(salesperson => {
                        return (
                            <tr key={salesperson.employee_id}>
                                <td>{ salesperson.employee_id }</td>
                                <td>{ salesperson.first_name }</td>
                                <td>{ salesperson.last_name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  async function getData() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8090/api/salespeople/');
      
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
        setError(null);
      } else {
        console.error('Failed to fetch salespeople:', response.status, response.statusText);
        setError("There are no employees. Please try again later.")
      }
    } catch (e) {
        console.error(e);
        setError("Error occurred while fetching employees.")
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
            The list of all our Salespeople on site!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/salespeople/new" className="btn btn-primary btn-lg px-4 gap-3">Add a New Salesperson</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Salespeople</h2>
        <div className="row">
          {salespeople.length > 0 ? (
            <SalespeopleTable salespeople={salespeople} />
          ):(
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No salespeople Found</h4>
              <p>There are currently no employed salespeople in the system.</p>
              <hr />
              <p className="mb-0">
                  <Link to="/salespeople/new" className="btn btn-primary">Add a New Employee</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )  
}
  

export default SalespeopleList;
