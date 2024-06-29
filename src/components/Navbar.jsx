import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import { close, menu, github } from "../assets";
import { navLinks } from "../constants";
import { styles } from "../styles";

import client from "../Client";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [developer, setDeveloper] = useState();

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "hero"]{
      name,
      header_name,
      github,
      lists,
      icon{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setDeveloper(data[0]))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {developer?.icon?.asset?.url && (
            <img
              src={developer?.icon?.asset?.url}
              alt={developer.header_name}
              className="w-9 h-9 object-contain"
            />
          )}

          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            {developer?.header_name}
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                if (nav.id != "github") {
                  setActive(nav.title);
                }
              }}
            >
              {nav.id == "blog" ? (
                <Link to={"/blogs"} className="flex gap-1 align-middle">
                  {nav.title}
                </Link>
              ) : (
                <a href={`#${nav.id}`}>{nav.title}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {nav.id == "blog" ? (
                    <Link to={"/blogs"}>{nav.title}</Link>
                  ) : (
                    <a href={`/#${nav.id}`}>{nav.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
