import { ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-body-tertiary w-100  shadow-sm">
      <nav className="navbar navbar-expand-lg container d-flex justify-content-between align-items-center">
        <h1 className="navbar-brand mb-0 fs-3">
          <NavLink className="link-underline-light" to="/">
            E-commerce
          </NavLink>
        </h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="mx-auto my-3 my-lg-0" style={{ maxWidth: "45vw" }}>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center mt-2 mt-lg-0">
            <Link to="/cart" className="mx-3">
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
