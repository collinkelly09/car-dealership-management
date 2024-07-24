import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function NewSaleForm () {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const fetchCars = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const unsold = data.autos.filter(autos => !autos.sold)
      setCars(unsold);
    }
  }
  const [car, setCar] = useState('')
  function handleCarChange(event){
      const value = event.target.value;
      setCar(value);
  }

  useEffect(() => {
    fetchCars();
  }, []);


  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setEmployees(data.salespeople);
    }
  }
  const [employee, setEmployee] = useState('')
  function handleEmployeeChange(event){
      const value = event.target.value;
      setEmployee(value);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);


  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }
  const [customer, setCustomer] = useState('')
  function handleCustomerChange(event){
      const value = event.target.value;
      setCustomer(value);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [price, setPrice] = useState('')
  function handlePriceChange(event){
      const value = event.target.value;
      setPrice(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {};
      data.automobile = car;
      data.salesperson = employee;
      data.customer = customer;
      data.price = price;

      const salesUrl = "http://localhost:8090/api/sales/";
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'},
      };
      try {
          const response = await fetch(salesUrl, fetchConfig);
          if (response.ok) {

            const carUrl = `http://localhost:8100/api/automobiles/${data.automobile}/`;
            const updateConfig = {
              method: 'put',
              body: JSON.stringify({sold:true}),
              headers: {'Content-Type': 'application/json'},
            };
            const updateResponse = await fetch(carUrl, updateConfig);
            if (updateResponse.ok) {
              console.log("Car marked as sold");
            } else {
              console.error("Failed to mark as sold")
            }

            setCar('');
            setEmployee('');
            setCustomer('');
            setPrice('');

            fetchCars();
          } else {
              console.error(`Error: ${response.status} ${response.statusText}`);
              navigate('/404')
          }
      } catch (error) {
          console.error('Fetch error:', error);
          navigate('/404')
      }
  }

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/sales" className="btn btn-primary btn-lg px-4 gap-3">
              All Sales
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                  <h1>Create a new sale</h1>
                  <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="form-floating mb-3">
                      <select required onChange={handleCarChange} value={car} id="car" name="car" className="form-select">
                        <option value="">Choose an Automobile VIN</option>
                        {cars.map((car) => {
                          return (
                            <option key={car.vin} value={car.vin}>
                              {car.vin}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <select required onChange={handleEmployeeChange} value={employee} id="employee" name="employee" className="form-select">
                        <option value="">Choose a salesperson</option>
                        {employees.map((employee) => {
                          return (
                            <option key={employee.employee_id} value={employee.employee_id}>
                              {employee.first_name} {employee.last_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <select required onChange={handleCustomerChange} value={customer} id="customer" name="customer" className="form-select">
                        <option value="">Choose a customer</option>
                        {customers.map((customer) => {
                          return (
                            <option key={customer.id} value={customer.id}>
                              {customer.first_name} {customer.last_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input required placeholder="Price" onChange={handlePriceChange} value={price} type="text" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create Sale</button>
                  </form>
              </div>
          </div>
      </div>
    </>
  );
}

export default NewSaleForm;
