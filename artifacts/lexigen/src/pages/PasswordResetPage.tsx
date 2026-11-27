import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function PasswordResetPage() {
  const { t } = useTranslation();
  const token = new URLSearchParams(window.location.search).get("token")?.trim() ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("registrationGate.resetPasswordMismatch"));
      return;
    }
    if (
      password.length < 8 ||
      !/^[a-zA-Z0-9@#$&!]+$/.test(password) ||
      !/[@#$&!]/.test(password)
    ) {
      setError(t("registrationGate.resetPasswordRequirements"));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) {
        throw new Error(
          response.status === 400 && token
            ? t("registrationGate.resetLinkExpired")
            : data.error ?? t("registrationGate.resetLinkExpired"),
        );
      }
      setComplete(true);
      window.history.replaceState({}, "", window.location.pathname);
    } catch (submitError) {
      setError(submitError instanceof Error
        ? submitError.message
        : t("registrationGate.resetLinkExpired"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-background shadow-[0_0_80px_rgba(139,92,246,0.18)]">
        <header className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent px-8 py-8 text-center">
          <p className="mb-2 text-sm font-black tracking-[0.25em] text-primary">LEXIGENZ</p>
          <h1 className="text-2xl font-black">{t("registrationGate.resetPassword")}</h1>
        </header>

        <div className="space-y-5 px-8 pb-8 pt-6">
          {complete ? (
            <div className="space-y-5 text-center">
              <p className="text-sm text-muted-foreground">
                {t("registrationGate.resetPasswordUpdated")}
              </p>
              <Link href="/signin">
                <Button className="w-full">{t("registrationGate.loginBtn")}</Button>
              </Link>
            </div>
          ) : !token ? (
            <div className="space-y-5 text-center">
              <p className="text-sm text-muted-foreground">
                {t("registrationGate.resetLinkExpired")}
              </p>
              <Link href="/signin">
                <Button className="w-full">{t("registrationGate.resetRequestNew")}</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="reset-password" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t("registrationGate.resetNewPasswordLabel")}
                </label>
                <input
                  id="reset-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 w-full rounded-xl border border-input bg-muted/30 px-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reset-password-confirm" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t("registrationGate.resetConfirmPasswordLabel")}
                </label>
                <input
                  id="reset-password-confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="h-11 w-full rounded-xl border border-input bg-muted/30 px-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                {t("registrationGate.resetPasswordRequirements")}
              </p>

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={loading} className="h-12 w-full rounded-2xl font-bold">
                {loading
                  ? t("registrationGate.resetSavingPassword")
                  : t("registrationGate.resetSavePassword")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
