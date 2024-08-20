import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops, onClick }) => {
  return (
    <li
      className={`mx-4 cursor-pointer ${classprops}`}
      onClick={onClick}
    >
      {title}
    </li>
  );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setToggleMenu(false);
  };

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="flex-initial justify-center items-center">
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </a>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <NavBarItem
          title="Market"
          onClick={() => scrollToSection('top-10-cryptos')}
        />
        {/* <NavBarItem
          title="Exchange"
          
        /> */}
        <NavBarItem
          title="Wallets"
          onClick={() => scrollToSection('connect-wallet')}
        />
        <NavBarItem
          title="Watchlist"
          onClick={() => scrollToSection('watchlist')}
        />
        <li className="bg-[#ff9900] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#e68a00] transition duration-300 ease-in-out">
          Sign In
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-50 fixed top-0 left-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-start rounded-md bg-black bg-opacity-90 text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            <NavBarItem
              title="Market"
              classprops="my-2 text-lg"
              onClick={() => scrollToSection('top-10-cryptos')}
            />
            <NavBarItem
              title="Exchange"
              classprops="my-2 text-lg"
             
            />
            <NavBarItem
              title="Wallets"
              classprops="my-2 text-lg"
              onClick={() => scrollToSection('connect-wallet')}
            />
            <NavBarItem
              title="Watchlist"
              classprops="my-2 text-lg"
              onClick={() => scrollToSection('watchlist')}
            />
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
