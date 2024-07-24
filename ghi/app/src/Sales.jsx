import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function SalesTable(props) {
    return (
        <>
            <table className="table table-light table-striped w-100">
                <thead className="">
                    <tr>
                        <th>Employee ID</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{ sale.salesperson.employee_id }</td>
                                <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                <td>{ sale.automobile }</td>
                                <td>{ sale.price }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8090/api/sales/');
      
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
        setError(null);
      } else {
        console.error('Failed to fetch sale:', response.status, response.statusText);
        setError("There are no sales. Please try again later.")
      }
    } catch (e) {
        console.error(e);
        setError("Error occured while fetching sales.")
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
            The list of all our sales.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/sales/new" className="btn btn-primary btn-lg px-4 gap-3">Add a New Sale</Link>
            <Link to="/sales/history" className="btn btn-secondary btn-lg px-4 gap-3">Sales By Employee</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Sales</h2>
        <div className="row">
          {sales.length > 0 ? (
          <SalesTable sales={sales} />
          ):(
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No Sales Found</h4>
              <p>There are currently no sales in the system.</p>
              <hr />
              <p className="mb-0">
                  <Link to="/sales/new" className="btn btn-primary">Add a New Sale</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )  
}
  

export default SalesList;
