import { useState } from "react";
import "./Login.css";
import { apiFetch } from "../../hooks/apiFetch";

type Tab = "client" | "admin";

export default function Login() {
  const [tab, setTab] = useState<Tab>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint =
      tab === "admin" ? "/api/auth/login/admin" : "/api/auth/login/client";

    try {
      const res = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Identifiants incorrects.");
        return;
      }

      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      window.location.href =
        tab === "admin" ? "/dashboard-admin" : "/dashboard-client";
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${tab === "client" ? "active" : ""}`}
            onClick={() => setTab("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={`auth-tab ${tab === "admin" ? "active" : ""}`}
            onClick={() => setTab("admin")}
          >
            Admin
          </button>
        </div>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Saisissez vos identifiants</h1>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-fields">
            <div className="auth-field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <a href="/forgot-password" className="auth-forgot">
              Mot de passe oublié ?
            </a>

            <label className="auth-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Mémoriser mon mot de passe
            </label>
          </div>

          <div className="auth-footer">
            <button
              type="button"
              className="auth-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="auth-switch">
              Pas encore de compte ? <a href="/sign-in">Créer un compte</a>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-visual" />
    </div>
  );
}
