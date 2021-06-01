import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
function NavbarCompo() {
  const history = useHistory();
  return (
    <Navbar bg="success" expand="lg">
      <NavLink className="navbar-brand" to="/" exact>
        <Navbar.Brand href="#home">CodDev</Navbar.Brand>
      </NavLink>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink id="nav-link" to="/" exact activeClassName="active">
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
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarCompo;
