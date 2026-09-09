/**
 * @fileoverview Main navigation bar displaying user status and primary routes.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkedAlt, FaCompass, FaUser, FaHome } from "react-icons/fa";
import LogoutButton from "./logout-button";
import { getUser } from "../auth/auth-storage";

export default function Navbar() {
  const location = useLocation();
  const currentUser = getUser() || {};

  const userName =
    currentUser.first_name || currentUser.username || currentUser.email || "Viajante";

  return (
    <nav className="glass-nav container-fluid">
      <div className="d-flex justify-content-between align-items-center w-100 px-lg-5">
        <Link to="/home" className="nav-logo-wrap m-0 text-decoration-none">
          TRIPWAY
        </Link>

        <div className="d-flex gap-4 align-items-center header-links">
          <Link
            to="/home"
            className={`nav-link-custom ${location.pathname === "/home" ? "active" : ""}`}
          >
            <FaHome className="me-2" /> Início
          </Link>

          <Link
            to="/mytrips"
            className={`nav-link-custom ${location.pathname === "/mytrips" ? "active" : ""}`}
          >
            <FaMapMarkedAlt className="me-2" /> Minhas Rotas
          </Link>

          <Link
            to="#"
            className="nav-link-custom"
            onClick={(e) => {
              e.preventDefault();
              alert("Página de explorar em construção! 🚧");
            }}
          >
            <FaCompass className="me-2" /> Explorar Destinos
          </Link>

          <div className="user-badge d-flex align-items-center gap-2 ms-2">
            <FaUser className="text-primary" />
            <span>
              Olá, <strong>{userName}</strong>
            </span>
          </div>

          <LogoutButton className="btn btn-outline-danger btn-sm border-0" />
        </div>
      </div>
    </nav>
  );
}