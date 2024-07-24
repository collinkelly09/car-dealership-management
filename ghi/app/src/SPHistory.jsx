import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function SalesTable(props) {
  return (
    <>
      <table className="table table-light table-striped w-100">
        <thead className="">
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {props.sales.map((sale) => {
            return (
              <tr key={sale.id}>
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

function SalesByIDList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [employee, setEmployee] = useState('');
  function handleEmployeeChange(event){
      const value = event.target.value;
      setEmployee(value);
      if (value) {
        fetchSalesForEmployee(value);
      } else {
        setSales([])
      }
  }
  
  const [sales, setSales] = useState([]);
  async function fetchSalesForEmployee(employee_id) {
    try {
      const response = await fetch(`http://localhost:8090/api/sales/`);
      if (response.ok) {
        const data = await response.json();
        const employeeSales = data.sales.filter(sale => sale.salesperson.employee_id === employee_id);
        setSales(employeeSales);
      } else {
        console.error("Failed to fetch sales:", response.status, response.statusText);
        setSales([])
      }
    } catch (e) {
      console.error(e);
      setSales([]);
    }
  }

  const [salespeople, setSalespeople] = useState([]);
  async function getData() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/api/salespeople/");

      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
        setError(null);
      } else {
        console.error(
          "Failed to fetch salespeople:",
          response.status,
          response.statusText
        );
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
          <p className="lead mb-4">Sales based on a specific Salesperson.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/sales" className="btn btn-primary btn-lg px-4 gap-3">
              All Sales
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <select required onChange={handleEmployeeChange} value={employee} id="employee" name="employee" className="form-select m-3">
          <option value="">Choose an employee</option>
          {salespeople.map((salesperson) => {
            return (
              <option key={salesperson.employee_id} value={salesperson.employee_id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            );
          })}
        </select>

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
      </div>
    </>
  )
}

export default SalesByIDList;
