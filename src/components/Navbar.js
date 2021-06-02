import { useCallback, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown ,Button} from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

function NavbarCompo() {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const getProfile = useCallback(async () => {
    const profileValue = JSON.parse(localStorage.getItem("user"));
    console.log("Nav Bar" , profileValue)
    if (profileValue) {
      setProfile(profileValue.data);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
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
          {!profile ? (
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
                  {profile.user.name} role: {profile.user.role}
                </p>
              </NavLink>
              <NavLink
                className="mr-3 nav-like"
                to="/login"
                activeClassName="active"
                onClick={async () => (
                  localStorage.clear(),
                  history.replace('/'),
                  history.go(0)
                )}
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
