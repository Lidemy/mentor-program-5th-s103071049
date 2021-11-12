import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0 32px;
  box-sizing: border-box;
`;
const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;
const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  box-sizing: border-box;
  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.1);
  `}
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 64px;
  }
`;
export default function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的第一個部落格</Brand>
        <NavbarList>
          <Nav $active={location.pathname === "/"} to="/">
            首頁
          </Nav>
          {user && (
            <Nav $active={location.pathname === "/new-post"} to="/new-post">
              發布文章
            </Nav>
          )}
          <Nav $active={location.pathname === "/about"} to="/about">
            關於我們
          </Nav>
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && (
          <Nav $active={location.pathname === "/login"} to="/login">
            登入
          </Nav>
        )}
        {!user && (
          <Nav $active={location.pathname === "/register"} to="/register">
            註冊
          </Nav>
        )}
        {user && (
          <Nav onClick={handleLogout} to="/">
            登出
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
