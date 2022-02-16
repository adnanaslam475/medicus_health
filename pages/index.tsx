import React, { useEffect, useState } from "react";
import Dashboard from "./../src/modules/admin/pages/DashboardPage";
// import Login from "./login"
import type { NextPage } from "next";
import Container from "../src/common/components/Container/Container";

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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>
  {/* {isLoggedIn ? <Dashboard /> : <Login />} */}
  hello world
  </>;
};

export default App;



// const Home: NextPage = () => {
//   return (
//     <Container
//       style={{
//         scrollMargin: "1rem",
//       }}
//     >
//       <h1
//         style={{
//           margin: "1rem",
//         }}
//         className="text-3xl font-bold underline"
//       >
//         Landing page
//       </h1>
//     </Container>
//   );
// };

// export default Home;
