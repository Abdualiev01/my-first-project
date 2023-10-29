import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { useEffect } from "react";
import { fetchUserInfo } from "./redux/slices/auth";
import { CircularProgress, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  const dispatch = useDispatch();
  const isReady = useSelector((state) => state.auth.status) !== "loading";

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  if (!isReady) {
    return (
      <center>
        <CircularProgress />
      </center>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </Container>
    </>
  );
}

export default App;
