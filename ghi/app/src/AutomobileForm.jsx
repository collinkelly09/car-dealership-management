import React, { useState, useEffect } from "react";

function AutoForm() {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  const handleColorChange = (event) => {
    const val = event.target.value;
    setColor(val);
  };

  const handleYearChange = (event) => {
    const val = event.target.value;
    setYear(val);
  };

  const handleVinChange = (event) => {
    const val = event.target.value;
    setVin(val);
  };

  const handleModelChange = (event) => {
    const val = event.target.value;
    setModel(val);
  };

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;

    const autoUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(autoUrl, fetchConfig);
      if (response.ok) {
        setColor("");
        setYear("");
        setVin("");
        setModel("");
      } else {
        throw new Error(`Failed to create vehicle ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Automobile to Inventory</h1>
          <form onSubmit={handleSubmit} id="create-tech-form">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                required
                type="text"
                name="year"
                id="year"
                placeholder="Color"
                onChange={handleColorChange}
                value={color}
              />
              <label htmlFor="year">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="year"
                name="year"
                placeholder="Year"
                onChange={handleYearChange}
                value={year}
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="vin"
                name="vin"
                placeholder="VIN"
                onChange={handleVinChange}
                value={vin}
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <select
                required
                name="model"
                id="model"
                className="form-select"
                onChange={handleModelChange}
                value={model}
              >
                <option value="">Model</option>
                {models.map((model) => {
                  return (
                    <option value={model.id} key={model.id}>
                      {model.name}
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
  );
}

export default AutoForm;
