import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import SinglePage from "../../pages/SinglePage";
import AddPost from "../../pages/AddPost";
import About from "../../pages/About";
import Register from "../../pages/Register";
import Header from "../Header";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
const Root = styled.div`
  padding-top: 64px;
`;
function App() {
  const [user, setUser] = useState(null); // 透過 user 有無東西，判斷登入狀態
  const token = getAuthToken();
  useEffect(() => {
    if (token) {
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<SinglePage />} />
            <Route path="/about" element={<About />} />
            {user && <Route path="/new-post" element={<AddPost />} />}
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
