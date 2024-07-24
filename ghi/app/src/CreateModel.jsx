import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ModelsCreationForm () {
  const [manufacturers, setManufacturers] = useState([]);
  const fetchData = async () => {
      const url = "http://localhost:8100/api/manufacturers/";
      const response = await fetch(url);

      if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
      }
  }

  const [name, setName] = useState('')
  function handleNameChange(event){
      const value = event.target.value;
      setName(value);
  }

  const [picture, setPicture] = useState('')
  function handlePictureChange(event){
      const value = event.target.value;
      setPicture(value);
  }

  const [manufacturer, setManufacturer] = useState('')
  function handleManufacturerChange(event){
      const value = event.target.value;
      setManufacturer(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {};
      data.name = name;
      data.picture_url = picture
      data.manufacturer_id = manufacturer

      const modelsUrl = "http://localhost:8100/api/models/";
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'},
      };
      try {
          const response = await fetch(modelsUrl, fetchConfig);
          if (response.ok) {
              setName('');
              setPicture('');
              setManufacturer('');
          } else {
              console.error(`Error: ${response.status} ${response.statusText}`);
          }
      } catch (error) {
          console.error('Fetch error:', error);
      }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <>
          <div className="px-4 py-5 my-5 mt-0 text-center bg-success">
                  <h1 className="display-5 fw-bold">CarCar</h1>
                  <div className="col-lg-6 mx-auto">
                      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                      <Link to="/models" className="btn btn-primary btn-lg px-4 gap-3">All Models</Link>
                      </div>
                  </div>
              </div>
          <div className="row">
              <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                      <h1>Create a new models</h1>
                      <form onSubmit={handleSubmit} id="create-models-form">
                          <div className="form-floating mb-3">
                              <input required placeholder="Name" onChange={handleNameChange} value={name} type="text" name="name" id="name" className="form-control" />
                              <label htmlFor="name">Name</label>
                          </div>
                          <div className="form-floating mb-3">
                              <input required placeholder="Picture" onChange={handlePictureChange} value={picture} type="url" name="picture" id="picture" className="form-control" />
                              <label htmlFor="picture">Picture URL</label>
                          </div>
                          <div className="mb-3">
                            <select required onChange={handleManufacturerChange} value={manufacturer} id="manufacturer" name="manufacturer" className="form-select">
                                <option>Manufacturer</option>
                                    {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                          );
                                      })}
                              </select>
                          </div>
                          <button className="btn btn-primary">Create</button>
                      </form>
                  </div>
              </div>
          </div>
      </>
  );
}

export default ModelsCreationForm;
