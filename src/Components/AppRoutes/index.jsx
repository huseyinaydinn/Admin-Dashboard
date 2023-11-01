import { Route, Routes } from "react-router-dom"
import Dashboard from "../../Pages/Dashboard/index"
import Customers from "../../Pages/Customers/index"
import Orders from "../../Pages/Orders/index"
import Inventory from "../../Pages/Inventory"

function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
    )
}

export default AppRoutes