import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
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

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/play" component={Play} />
          <Route path="/app" component={AppPage} />
          <Route path="/invite" component={Invite} />
          <Route path="/premium" component={Premium} />
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
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
