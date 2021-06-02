import { useCallback, useContext, useEffect } from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { UserStoreContext } from "../context/UseContext";

function NavbarCompo() {
  const history = useHistory();
  const userStore = useContext(UserStoreContext);

 
  const getProfile = useCallback(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    const profileValue = JSON.parse(localStorage.getItem("user"));
    if (profileValue) {
      userStore.updateProfile(profileValue);
    }
  }, []);
    useEffect(() => {
    getProfile();
    
  }, [getProfile]);

  const logout = () =>{
    localStorage.clear()
    userStore.updateProfile(null)
    history.replace("/")
  }
  
  return (
    <Navbar bg="success" expand="lg">
      <NavLink className="navbar-brand" to="/" exact>
        <Navbar.Brand href="#home">CodDev</Navbar.Brand>
      </NavLink>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            id="nav-link"
            to="/"
            className="nav-link"
            exact
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            to="/product"
            exact
            activeClassName="active"
          >
            Product
          </NavLink>
          <NavLink
            className="nav-link"
            to="/about"
            exact
            activeClassName="active"
          >
            About
          </NavLink>

          <NavLink
            className="nav-link"
            to="/member"
            exact
            activeClassName="active"
          >
            For Member
          </NavLink>

          <NavDropdown
            title="WorkShop Pagination + CRUD"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => history.replace("/hospital")}>
              ข้อมูลสถานพยาบาล (Pagination)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => history.replace("/category")}>
              หมวดหมู่ข่าว (CRUD)
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!userStore.profile ? (
            <>
              <NavLink
                className="mr-3 nav-like"
                to="/register"
                activeClassName="active"
              >
                <p style={{ color: "white" }}>สมัครสมาชิก</p>
              </NavLink>
              <NavLink
                className="mr-3 nav-like"
                to="/login"
                activeClassName="active"
              >
                <p style={{ color: "white" }}>เข้าสู้ระบบ</p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="mr-3 nav-like"
                to="/register"
                activeClassName="active"
              >
                <p style={{ color: "white" }}>
                  {userStore.profile.name} role: {userStore.profile.role}
                </p>
              </NavLink>
              <NavLink
                className="mr-3 nav-like"
                to="/"
                activeClassName="active"
                onClick={logout}
              >
                <Button>ออกจากระบบ</Button>
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarCompo;
