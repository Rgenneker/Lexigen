import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";
import { RegistrationGate } from "@/components/RegistrationGate";
import { InviteReminderModal } from "@/components/InviteReminderModal";
import { useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Play from "@/pages/Play";
import AppPage from "@/pages/AppPage";
import Invite from "@/pages/Invite";
import Premium from "@/pages/Premium";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Sitemap from "@/pages/Sitemap";
import HowItWorks from "@/pages/HowItWorks";

import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import TermsOfUse from "@/pages/legal/TermsOfUse";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import LegalDisclaimer from "@/pages/legal/LegalDisclaimer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children, loginOnly }: { children: React.ReactNode; loginOnly?: boolean }) {
  const { isRegistered } = useAuth();
  if (!isRegistered) return <RegistrationGate loginOnly={loginOnly} />;
  return <>{children}</>;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />

      <Navbar />

      {/* Content recommendation ad — scaled down to thumbnail strip */}
      <div style={{ width: "100%", background: "#1a1a1a", overflow: "hidden" }}>
        <div
          id="container-41d4aabb3588a1d80140791be9b04f74"
          style={{
            transformOrigin: "top left",
            transform: "scale(0.55)",
            width: "182%",   /* compensate: 1/0.55 ≈ 1.82 so content fills full width */
          }}
        />
      </div>

      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/play">
            {() => <ProtectedRoute><Play /></ProtectedRoute>}
          </Route>
          <Route path="/app">
            {() => <ProtectedRoute><AppPage /></ProtectedRoute>}
          </Route>
          <Route path="/signin">
            {() => <ProtectedRoute loginOnly><AppPage /></ProtectedRoute>}
          </Route>
          <Route path="/invite">
            {() => <ProtectedRoute><Invite /></ProtectedRoute>}
          </Route>
          <Route path="/premium">
            {() => <ProtectedRoute><Premium /></ProtectedRoute>}
          </Route>
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/sitemap" component={Sitemap} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms-of-use" component={TermsOfUse} />
          <Route path="/cookies" component={CookiePolicy} />
          <Route path="/legal" component={LegalDisclaimer} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <InviteReminderModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
