import React, { useEffect, useState } from "react";
import Dashboard from "./../src/modules/admin/pages/DashboardPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return <Dashboard />;
};

export default App;
