import { useQuery } from "@tanstack/react-query";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const NavbarHead = () => {
  const { user, logOut } = useContext(AuthContext);
  const { data: userData } = useQuery({
    queryKey: ["user", user],
    queryFn: () =>
      fetch(`http://localhost:5000/user?email=${user?.email}`).then((res) =>
        res.json()
      ),
  });

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut()
      .then(() => {
        toast.success("Sign Out Successfully.");
      })
      .catch((err) => console.log(err));
  };
  console.log(userData);
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
        {user && <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img={userData?.image}
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userData?.name}</span>
              <span className="block truncate text-sm font-medium">
                {userData?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>My Orders</Dropdown.Item>
            <Dropdown.Item>My Wishlist</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <button onClick={handleLogOut}> Sign out</button>
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>}
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
          <Navbar.Link>
            <Link to={"/login"}>Login</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHead;
