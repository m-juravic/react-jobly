import userContext from "./userContext";
import { useContext, useLocation } from "react";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * Renders the header and navigation
 *
 * TODO:
 * - Show active class
 *
 * */

function Header({ handleLogout }) {
  const { user } = useContext(userContext);

  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Jobly</Navbar.Brand>
        <Navbar.Toggle aria-controls="jobly-nav" />
        <Navbar.Collapse id="jobly-nav">

          <Nav className="ms-auto">

            {!user &&
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            }

            {user &&
              <>
                <Nav.Link href="/companies">Companies</Nav.Link>
                <Nav.Link href="/jobs">Jobs</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>

                <NavDropdown title={user.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} href="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;