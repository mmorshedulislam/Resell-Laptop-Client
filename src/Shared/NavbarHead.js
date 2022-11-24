import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const NavbarHead = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link to={"/"}>
            {" "}
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Laptop Hunter
            </span>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@mail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>My Orders</Dropdown.Item>
            <Dropdown.Item>My Wishlist</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link  active={true}>
          <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/products"}>Products</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/products"}>Dell</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/products"}>HP</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/products"}>Walton</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/login"}>Login</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHead;
