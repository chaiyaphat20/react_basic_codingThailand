import { useCallback, useEffect } from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
//redux
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { updateProfile } from "../redux/actions/authAction";



function NavbarCompo() {
  const history = useHistory();
  // const userStore = useContext(UserStoreContext);

  //redux
  const dataFromRedux = useSelector((state) => state);
  const { authState, cartState } = dataFromRedux;
  const { profile } = authState;
  const { total } = cartState;

  const dispatch = useDispatch();

  const getProfile = useCallback(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const profileValue = JSON.parse(localStorage.getItem("user"));
    if (profileValue) {
      // userStore.updateProfile(profileValue);
      dispatch(updateProfile(profileValue));
    }
  }, [dispatch]);
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const logout = () => {
    localStorage.clear();
    // userStore.updateProfile(null);  /context api

    dispatch(updateProfile(null));
    history.replace("/");
  };

  let comp = "";
  if (profile) {
    comp = profile.name;
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
            to="/cart"
            exact
            activeClassName="active"
          >
            Cart {total} ????????????
          </NavLink>

          <NavLink
            className="nav-link"
            to="/member"
            exact
            activeClassName="active"
          >
            For Member {comp}
          </NavLink>

          <NavDropdown
            title="WorkShop Pagination + CRUD"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => history.replace("/hospital")}>
              ???????????????????????????????????????????????? (Pagination)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => history.replace("/category")}>
              ???????????????????????????????????? (CRUD)
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
                <p style={{ color: "white" }}>?????????????????????????????????</p>
              </NavLink>
              <NavLink
                className="mr-3 nav-like"
                to="/login"
                activeClassName="active"
              >
                <p style={{ color: "white" }}>?????????????????????????????????</p>
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
                  {profile.name} role:{" "}
                  {profile.role}
                </p>
              </NavLink>
              <NavLink
                className="mr-3 nav-like"
                to="/"
                activeClassName="active"
                onClick={logout}
              >
                <Button>??????????????????????????????</Button>
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarCompo;
