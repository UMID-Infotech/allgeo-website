import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";

import { mainNavigation } from "../../data/navigation";

// Official AllGeo logo:
// src/assets/brand/allgeo-logo.svg
import allgeoLogo from "../../assets/brand/allgeo-logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesRef = useRef(null);
  const location = useLocation();

  const isServicesActive = location.pathname.startsWith("/services");

  /* -------------------------------------------------------
     Header scroll state
  ------------------------------------------------------- */

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------
     Close desktop dropdown on outside click / Escape
  ------------------------------------------------------- */

  useEffect(() => {
    function handlePointerDown(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* -------------------------------------------------------
     Prevent page scrolling while mobile menu is open
  ------------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeDesktopServices() {
    setServicesOpen(false);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <>
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          isScrolled
            ? "border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(8,45,87,0.07)] backdrop-blur-md"
            : "border-slate-200/60 bg-white"
        }`}
      >
        <div className="site-container flex h-[var(--header-height)] items-center justify-between">
          {/* Logo */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label="AllGeo Solutions home"
            className="flex shrink-0 items-center"
          >
            <img
              src={allgeoLogo}
              alt="AllGeo Solutions"
              className="h-auto w-[150px] object-contain sm:w-[165px] lg:w-[175px]"
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            aria-label="Primary navigation"
            className="hidden text-[14px] font-medium xl:block"
          >
            <ul className="flex items-center gap-0.5">
              {mainNavigation.map((item) => {
                /* Services Dropdown */

                if (item.children) {
                  return (
                    <li key={item.label} ref={servicesRef} className="relative">
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-haspopup="menu"
                        aria-controls="desktop-services-menu"
                        onClick={() => setServicesOpen((current) => !current)}
                        className={`flex min-h-11 appearance-none items-center gap-1 rounded-md bg-transparent px-3.5 transition-colors duration-200 ${
                          isServicesActive
                            ? "text-[var(--color-green-dark)]"
                            : "text-slate-700 hover:text-[var(--color-navy)]"
                        }`}
                      >
                        <span>{item.label}</span>

                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown */}

                      <div
                        id="desktop-services-menu"
                        className={`absolute left-1/2 top-[calc(100%+12px)] w-[330px] -translate-x-1/2 transition-all duration-200 ${
                          servicesOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(8,45,87,0.14)]">
                          {/* Dropdown heading */}

                          <div className="border-b border-slate-100 px-3 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-green)]">
                              Scientific Expertise
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[var(--color-navy)]">
                              Geoscience Services
                            </p>
                          </div>

                          {/* Service links */}

                          <ul role="menu" className="mt-1">
                            {item.children.map((child) => (
                              <li key={child.path} role="none">
                                <Link
                                  to={child.path}
                                  role="menuitem"
                                  onClick={closeDesktopServices}
                                  className="group flex items-center justify-between rounded-md px-3 py-3 text-[13px] font-medium text-slate-700 transition-colors duration-200 hover:bg-[var(--color-background-blue)] hover:text-[var(--color-navy)]"
                                >
                                  <span>{child.label}</span>

                                  <ArrowRight
                                    size={14}
                                    aria-hidden="true"
                                    className="opacity-40 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* Standard Navigation Item */

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `flex min-h-11 items-center rounded-md px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-green-dark)]"
                            : "text-slate-700 hover:text-[var(--color-navy)]"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* =================================================
              TABLET / MOBILE ACTIONS
          ================================================= */}

          <div className="flex items-center gap-1 xl:hidden">
            <button
              type="button"
              aria-label="Search website"
              className="flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-navy)] transition-colors duration-200 hover:bg-slate-100"
            >
              <Search size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-navy)] transition-colors duration-200 hover:bg-slate-100"
            >
              {mobileOpen ? (
                <X size={23} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 xl:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Background overlay */}

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-[var(--color-navy)]/20 backdrop-blur-[2px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Navigation panel */}

        <div
          className={`absolute right-0 top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] w-full max-w-[420px] overflow-y-auto border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav
            aria-label="Mobile navigation"
            className="site-container !w-full px-4 py-6"
          >
            <ul>
              {mainNavigation.map((item) => {
                /* Mobile Services */

                if (item.children) {
                  return (
                    <li key={item.label} className="border-b border-slate-100">
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-menu"
                        onClick={() =>
                          setMobileServicesOpen((current) => !current)
                        }
                        className="flex min-h-14 w-full items-center justify-between text-left text-[15px] font-semibold text-[var(--color-navy)]"
                      >
                        <span>{item.label}</span>

                        <ChevronDown
                          size={17}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        id="mobile-services-menu"
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          mobileServicesOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="mb-4 border-l-2 border-[var(--color-green)] pl-4">
                            {item.children.map((child) => (
                              <li key={child.path}>
                                <Link
                                  to={child.path}
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 text-sm text-slate-600 transition-colors duration-200 hover:text-[var(--color-green-dark)]"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}

                            <li>
                              <Link
                                to="/services"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-2 py-2.5 text-sm font-semibold text-[var(--color-green-dark)]"
                              >
                                <span>View all services</span>

                                <ArrowRight size={14} aria-hidden="true" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* Standard Mobile Link */

                return (
                  <li key={item.path} className="border-b border-slate-100">
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex min-h-14 items-center text-[15px] font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-green-dark)]"
                            : "text-[var(--color-navy)]"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* Mobile CTA */}

            {/* <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[var(--color-green)] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-green-dark)]"
            >
              <span>Request a Quote</span>

              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            </Link> */}

            {/* Mobile supporting content */}

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="section-eyebrow">AllGeo Solutions</p>

              <p className="mt-2 max-w-[280px] text-sm leading-6 text-slate-500">
                Scientific geoscience solutions for informed decisions.
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
