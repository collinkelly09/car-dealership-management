import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function CustomersTable(props) {
    return (
        <>
            <table className="table table-light table-striped w-100">
                <thead className="">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.customers.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{ customer.first_name }</td>
                                <td>{ customer.last_name }</td>
                                <td>{ customer.phone_number }</td>
                                <td>{ customer.address }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8090/api/customers/');
      
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
        setError(null)
      } else {
        console.error('Failed to fetch customers:', response.status, response.statusText);
        setError("There are no Customers. Please try again later.")
      }
    } catch (e) {
        console.error(e);
        setError("Error occurred while fetching customers.")
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
            The list of all our customers.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/customers/new" className="btn btn-primary btn-lg px-4 gap-3">Add a New Customer</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Customers</h2>
        <div className="row">
          {customers.length > 0 ? (
            <CustomersTable customers={customers} />
          ):(
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No Customers Found</h4>
              <p>There are currently no customers in the system.</p>
              <hr />
              <p className="mb-0">
                  <Link to="/customers/new" className="btn btn-primary">Add a New Customer</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )  
}
  

export default CustomersList;
