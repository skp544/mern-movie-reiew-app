import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";

const Navbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className=" bg-secondary shadow-sm s shadow-gray-500">
      <Container className="p-3">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img src="/logo.png" alt="logo" className=" h-10" />
          </Link>
          <ul className="flex items-center space-x-6">
            <li>
              <button
                onClick={toggleTheme}
                className=" dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill size={24} className="text-secondary" />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle px-4 py-1 bg-transparent text-xl rounded outline-none focus:border-white transition-all text-white"
                placeholder="Search..."
              />
            </li>
            <li className=" font-semibold text-xl">
              <Link
                to={"/auth/sign-in"}
                className={
                  "text-white hover:text-dark-subtle transition-all duration-200"
                }
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
