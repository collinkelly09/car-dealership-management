import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import NotFound404 from './404'
import SalespeopleList from "./Salespeople";
import SalespersonCreationForm from "./CreateSP";
import CustomersList from "./Customers";
import CustomerCreationForm from "./CreateC";
import TechnicianList from "./TechnicianList";
import TechForm from "./TechForm";
import AppointmentList from "./AppointmentList";
import ApptForm from "./AppointmentForm";
import AppointmentHistory from "./AppointmentHistory";
import SalesList from './Sales'
import SalesByIDList from './SPHistory'
import NewSaleForm from './NewSale'
import ManufacturersList from './Manufacturers'
import ManufacturerCreationForm from './CreateM'
import ModelsList from './Models'
import ModelsCreationForm from './CreateModel'
import AutoForm from "./AutomobileForm";
import AutomobileList from "./AutomobileList";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonCreationForm />} />
          </Route>
          <Route path="/customers">
            <Route path="" element={<CustomersList />} />
            <Route path="new" element={<CustomerCreationForm />} />
          </Route>
					<Route path="/sales">
						<Route path="" element={<SalesList />}  />
						<Route path="history" element={<SalesByIDList />} />
						<Route path="new" element={<NewSaleForm />} />
					</Route>
					<Route path="/manufacturers">
						<Route path="" element={<ManufacturersList />}  />
						<Route path="new" element={<ManufacturerCreationForm />} />
					</Route>
					<Route path="/models">
						<Route path="" element={<ModelsList />}  />
						<Route path="new" element={<ModelsCreationForm />} />
					</Route>
					<Route path="*" element={<NotFound404 />} />
          <Route path="/technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechForm />} />
          </Route>
          <Route path="/appointments" >
            <Route path="" element={<AppointmentList />} />
            <Route path="new" element={<ApptForm />} />
            <Route path="history" element={<AppointmentHistory />} />
          </Route>
          <Route path="/automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutoForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
