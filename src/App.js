import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Admin from "./components/admin/admin";
import Overview from "./components/admin/Overview";
import AllUsers from "./components/admin/AllUsers";
import Agent from "./components/admin/agent_route";
import Settings from "./components/admin/AccountSettings";
import Login from "./components/Login/Login";
import { AdminAuth } from "./Redux/auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/agent" element={<Overview />} /> */}
        <Route
          path="/"
          element={
            <AdminAuth>
              <Overview />
            </AdminAuth>
          }
        />
        <Route
          path="/all-agent"
          element={
            <AdminAuth>
              <AllUsers />
            </AdminAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminAuth>
              <Settings />
            </AdminAuth>
          }
        />
        <Route
          path="/agent"
          element={
            <AdminAuth>
              <Agent />
            </AdminAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
