/**
 * @fileoverview Login view component. Handles user authentication requests.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../auth/auth-storage";
import api from "../api/api";
import videoBg from "../assets/background.mp4";
import logo from "../assets/logo.png";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("auth/login/", { email, password });
      setAuth(response.data.user, true);
      navigate("/mytrips");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Usuário ou senha incorretos";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <video autoPlay loop muted className="auth-video">
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="auth-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="logo-text">TRIPWAY</h1>
        </div>

        <h2 className="auth-subtitle">Sua jornada começa aqui.</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="E-mail ou usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth mt-2" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 mb-0 small text-muted text-center">
          Novo aqui? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}