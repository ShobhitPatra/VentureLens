"use client";
import Link from "next/link";
import { ShinyButton } from "./ui/shiny-button";
import { TypingAnimation } from "./ui/typing-animation";
import { useAuthWithConvex } from "@/hooks/useWithConvex";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { user, loading } = useAuthWithConvex();
  return (
    <nav
      className="flex w-full items-center  text-primary font-medium shadow-sm md:px-64 py-2 font-mono border-b-1
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
        <Link className="flex" href="/" about="">
          <TypingAnimation className="md:text-xl text-sm capitalize font-medium   ">
            VENTURE
          </TypingAnimation>
          <TypingAnimation className="md:text-xl text-sm capitalize font-medium text-orange-500  ">
            LENS
          </TypingAnimation>
        </Link>
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
        {user ? (
          <details className="dropdown">
            <summary className="p-4 btn bg-white hover:bg-gray-100 border-[0.5px] border-gray-300 text-gray-700 rounded-2xl m-1">
              {user.email}
              <span>
                <DropdownMenuIcon />
              </span>
            </summary>
            <ul className="bg-gray-100 menu dropdown-content rounded-box z-1 w-32  shadow-sm text-gray-800 ">
              <li>
                <button onClick={() => signOut()} className="rounded-md">
                  Logout
                  <span>
                    <LogOut size={14} />
                  </span>
                </button>
              </li>
              <li>
                <Link href={"/history"}>History</Link>
              </li>
            </ul>
          </details>
        ) : (
          <Link href="/auth">
            <ShinyButton className="shadow-md shadow-orange-500/80 border-[0.5px] text-gray-700 border-gray-300 hover:border-none bg-white hover:bg-orange-400 hover:text-white text-sm font-semibold ">
              Get Started
            </ShinyButton>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
