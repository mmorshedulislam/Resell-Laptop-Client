import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { AiOutlineBars } from "react-icons/ai";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import useBuyer from "../hooks/useBuyer";
import axios from "axios";

const NavbarHead = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/brands`)
      .then((data) => setBrands(data.data));
  }, []);

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
    <div className="max-w-7xl mx-auto">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link to={"/"}>
            {" "}
            <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
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
                <Avatar alt={"User"} img={user?.photoURL} rounded={true} />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>

              {/* Is Admin */}
              {isAdmin && (
                <>
                  <Dropdown.Item>
                    <Link to={"/dashboard/sellers"}>All Sellers</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/dashboard/buyers"}>All Buyers</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/dashboard/reporteditems"}>Reported Items</Link>
                  </Dropdown.Item>
                </>
              )}

              {/* Is Buyer */}
              {isBuyer && (
                <>
                  <Dropdown.Item>
                    <Link to={"/dashboard/myorders"}>My Orders</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/dashboard/mywishlist"}>My Wishlist</Link>
                  </Dropdown.Item>
                </>
              )}
              {/* Is Seller */}
              {isSeller && (
                <>
                  <Dropdown.Item>
                    <Link to={"/dashboard/mybuyers"}>My Buyers</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/dashboard/myproducts"}>My Products</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/dashboard/addproducts"}>Add a Products</Link>
                  </Dropdown.Item>
                </>
              )}
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
          <Navbar.Link>
            <Link className="font-semibold" to={"/"}>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link className="font-semibold" to={"/advertisedProducts"}>
              Ads Products
            </Link>
          </Navbar.Link>
          {brands.map((brand) => (
            <Navbar.Link key={brand._id}>
              <Link
                to={`/brand/${brand._id}`}
                className="uppercase font-semibold"
              >
                {brand.brand}
              </Link>
            </Navbar.Link>
          ))}
          <Navbar.Link>
            <Link className="font-semibold" to={"/blogs"}>
              Blogs
            </Link>
          </Navbar.Link>
          {!user ? (
            <Navbar.Link>
              <Link className="font-semibold" to={"/login"}>
                Login
              </Link>
            </Navbar.Link>
          ) : (
            <Navbar.Link>
              <Link className="font-semibold" to={"/dashboard"}>
                Dashboard
              </Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHead;
