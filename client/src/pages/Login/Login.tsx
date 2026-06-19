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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        <form className="auth-form-wrapper" onSubmit={handleSubmit}>
          <h1 className="auth-title">Saisissez vos identifiants</h1>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-fields">
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <a href="/forgot-password" className="auth-forgot">
              Mot de passe oublié ?
            </a>

            <label className="auth-remember" htmlFor="remember">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Mémoriser mon mot de passe
            </label>
          </div>

          <div className="auth-footer">
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="auth-switch">
              Pas encore de compte ? <a href="/sign-in">Créer un compte</a>
            </p>
          </div>
        </form>
      </div>

      <div className="auth-visual" />
    </div>
  );
}
