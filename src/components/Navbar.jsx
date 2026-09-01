// import { useState } from "react";
// import { Menu, X, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

//         <h1 className="text-2xl font-bold text-indigo-600">
//           <Link to={'/ShopSphere'}>ShopSphere</Link>
//         </h1>

//         <div className="hidden md:flex gap-8">
//           <Link to={'/ShopSphere'}>Home</Link>
//           <Link to={''}>Products</Link>
//           <Link to={'/categoriesproduct'}>Categories</Link>
//           <a href="/">Contact</a>
//         </div>

//         <div className="hidden md:flex items-center gap-4">
//           <Link to={'/cart'}><ShoppingCart /></Link>

//           <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
//             Login
//           </button>
//         </div>

//         <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
//           <a href="/">Home</a>
//           <a href="/">Products</a>
//           <a href="/">Categories</a>
//           <a href="/">Contact</a>
//         </div>
//       )}
//     </nav>
//   );
// }
// ---------------------------------------------------------
import { useState } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    setAccountOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">
          <Link to="/ShopSphere">ShopSphere</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link to="/ShopSphere">Home</Link>
          <Link to="">Products</Link>
          <Link to="/categoriesproduct">Categories</Link>
          <a href="/">Contact</a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">

          {/* Cart */}
          <Link to="/cart">
            <ShoppingCart size={22} />
          </Link>

          {/* Account */}
          {token ? (
            <div className="relative">

              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition"
              >
                <User size={18} />

                <span>{name || "Account"}</span>

                <ChevronDown
                  size={17}
                  className={`transition ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden">

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    <Link to={'/orders'}>My Orders</Link>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-indigo-700 hover:bg-indigo-50"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">

          <Link to="/ShopSphere">Home</Link>
          <Link to="">Products</Link>
          <Link to="/categoriesproduct">Categories</Link>
          <a href="/">Contact</a>

          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Cart
          </Link>

          {token ? (
            <>
              <div className="flex items-center gap-2 font-medium text-indigo-700">
                <User size={18} />
                {name || "Account"}
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="text-left"
              >
                My Profile
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="text-left"
              >
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            >
              Login
            </button>
          )}

        </div>
      )}
    </nav>
  );
}