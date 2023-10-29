import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { useEffect } from "react";
import { fetchUserInfo } from "./redux/slices/auth";
import { CircularProgress, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AddPost, FullPost, Home, Login, Register } from "./Pages";

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
          <Route element={<AddPost />} path="/posts/create" />
          <Route element={<AddPost />} path="/posts/:id/edit" />
          <Route element={<FullPost />} path="/posts/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Container>
    </>
  );
}

export default App;
