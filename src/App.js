import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin/admin";
import Allusers from "./components/admin/AllUsers";
import Login from "./components/Login/Login";
import { AdminAuth } from "./Redux/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/agent" element={<Allusers />} /> */}
        <Route
          path="/"
          element={
            <AdminAuth>
              <Allusers />
            </AdminAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
