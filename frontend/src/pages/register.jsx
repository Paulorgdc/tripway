/**
 * @fileoverview User Registration View component.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import videoBg from "../assets/background.mp4";
import logo from "../assets/logo.png";
import "./auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await api.post("auth/register/", formData);
    alert("Conta criada com sucesso! Faça login para continuar.");
    navigate("/");
  } catch (err) {
    if (err.response?.data) {
      const data = err.response.data;
      if (typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, errs]) => `${field}: ${Array.isArray(errs) ? errs.join(", ") : errs}`)
          .join("\n");
        alert(messages || "Erro ao cadastrar. Verifique os dados.");
      } else {
        alert(data);
      }
    } else {
      alert("Erro de conexão com o servidor. O Django está rodando?");
    }
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

        <h2 className="auth-subtitle">Crie sua conta grátis</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control"
            placeholder="Seu nome"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Nome de usuário (login)"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="email"
            className="form-control"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Sua senha"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit" className="btn-auth mt-2" disabled={loading}>
            {loading ? "Criando..." : "Começar minha jornada"}
          </button>
        </form>

        <p className="mt-4 mb-0 small text-muted text-center">
          Já faz parte? <Link to="/">Entrar</Link>
        </p>
      </div>
    </div>
  );
}