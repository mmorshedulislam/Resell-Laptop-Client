import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { AiOutlineBars } from "react-icons/ai";

const NavbarHead = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        toast.success("Sign Out Successfully.");
      })
      .catch((err) => console.log(err));
  };

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
        {user && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt={user?.displayName}
                  img={user?.photoURL}
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={"/dashboard/myorders"}>My Orders</Link>
              </Dropdown.Item>
              <Dropdown.Item>My Wishlist</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <button onClick={handleLogOut}> Sign out</button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        <Navbar.Toggle />
        {user && (
          <div>
            <label
              htmlFor="dashboard-drawer"
              className="text-2xl drawer-button lg:hidden"
            >
              <AiOutlineBars />
            </label>
          </div>
        )}
        <Navbar.Collapse>
          <Navbar.Link active={true}>
            <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to={"/advertisedProducts"}>Advertised Products</Link>
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
          {!user ? (
            <Navbar.Link>
              <Link to={"/login"}>Login</Link>
            </Navbar.Link>
          ) : (
            <Navbar.Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHead;
