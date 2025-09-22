import { RainbowButton } from "./ui/rainbow-button";
import { TypingAnimation } from "./ui/typing-animation";

const Navbar = () => {
  return (
    <nav
      className="flex w-full items-center  text-primary font-medium shadow-sm md:px-64  font-mono border-b-1
      bg-clip-padding
      backdrop-filter
      backdrop-blur-xl
      bg-opacity-10
"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2 ">
                <li>
                  <a>Submenu</a>
                </li>
                <li>
                  <a>Submenu</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a>
          <TypingAnimation className="md:text-xl text-sm capitalize font-medium   ">
            VENTURE LENS
          </TypingAnimation>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 px-1">
          <li>
            <a>Contact</a>
          </li>
          <li>
            <details>
              <summary className="">Pricing</summary>
              <ul className="p-2 bg-white">
                <li>
                  <a>Submenu</a>
                </li>
                <li>
                  <a>Submenu2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Community</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a>
          <RainbowButton className="text-xs font-light ">
            Get Started
          </RainbowButton>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
