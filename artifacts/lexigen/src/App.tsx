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
import CreateContest from "@/pages/bee/CreateContest";
import InvitePage from "@/pages/bee/InvitePage";
import ContestPage from "@/pages/bee/ContestPage";
import BeeProfilePage from "@/pages/bee/BeeProfilePage";
import WorldChampionship from "@/pages/bee/WorldChampionship";
import CreateTournament from "@/pages/bee/CreateTournament";
import TournamentPage from "@/pages/bee/TournamentPage";
import StatsPage from "@/pages/bee/StatsPage";
import AdminPage from "@/pages/bee/AdminPage";
import SpectatorPage from "@/pages/bee/SpectatorPage";
import Leaderboard from "@/pages/Leaderboard";
import AppPage from "@/pages/AppPage";
import Invite from "@/pages/Invite";
import Premium from "@/pages/Premium";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Sitemap from "@/pages/Sitemap";
import HowItWorks from "@/pages/HowItWorks";

import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import WordPage from "@/pages/word/WordPage";
import CategoryPage from "@/pages/word/CategoryPage";
import VocabularyListPage from "@/pages/word/VocabularyListPage";
import HubPage from "@/pages/word/HubPage";
import VocabularyHubPage from "@/pages/tools/VocabularyHubPage";
import WordleWordsPage from "@/pages/tools/WordleWordsPage";
import ScrabbleWordsPage from "@/pages/tools/ScrabbleWordsPage";
import SpellingBeeWordsPage from "@/pages/tools/SpellingBeeWordsPage";
import CrosswordWordsPage from "@/pages/tools/CrosswordWordsPage";
import SynonymFinderPage from "@/pages/tools/SynonymFinderPage";
import WordFinderPage from "@/pages/tools/WordFinderPage";
import AnagramSolverPage from "@/pages/tools/AnagramSolverPage";
import DictionaryPage from "@/pages/tools/DictionaryPage";
import WordOfTheDayPage from "@/pages/tools/WordOfTheDayPage";
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

      {/* Sponsored content strip */}
      <div className="w-full border-b border-border">
        <div id="container-41d4aabb3588a1d80140791be9b04f74" />
      </div>

      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/play">
            {() => <ProtectedRoute><Play /></ProtectedRoute>}
          </Route>
          <Route path="/bee/create">
            {() => <ProtectedRoute><CreateContest /></ProtectedRoute>}
          </Route>
          <Route path="/bee/invite/:token">
            {(p) => <InvitePage token={p.token} />}
          </Route>
          <Route path="/bee/play/:contestId">
            {(p) => <ProtectedRoute><ContestPage contestId={Number(p.contestId)} /></ProtectedRoute>}
          </Route>
          <Route path="/bee/profile">
            {() => <ProtectedRoute><BeeProfilePage /></ProtectedRoute>}
          </Route>
          <Route path="/bee/world-championship" component={WorldChampionship} />
          <Route path="/bee/tournament/create">
            {() => <ProtectedRoute><CreateTournament /></ProtectedRoute>}
          </Route>
          <Route path="/bee/tournament/:id">
            {(p) => <ProtectedRoute><TournamentPage tournamentId={Number(p.id)} /></ProtectedRoute>}
          </Route>
          <Route path="/bee/watch/:contestId">
            {(p) => <SpectatorPage contestId={Number(p.contestId)} />}
          </Route>
          <Route path="/bee/stats">
            {() => <ProtectedRoute><StatsPage /></ProtectedRoute>}
          </Route>
          <Route path="/bee/admin">
            {() => <ProtectedRoute><AdminPage /></ProtectedRoute>}
          </Route>
          <Route path="/leaderboard">
            {() => <ProtectedRoute><Leaderboard /></ProtectedRoute>}
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
          <Route path="/word/:slug/synonyms">{(p) => <WordPage slug={p.slug} type="synonyms" />}</Route>
          <Route path="/word/:slug/antonyms">{(p) => <WordPage slug={p.slug} type="antonyms" />}</Route>
          <Route path="/word/:slug/in-a-sentence">{(p) => <WordPage slug={p.slug} type="in-a-sentence" />}</Route>
          <Route path="/word/:slug/advanced-alternatives">{(p) => <WordPage slug={p.slug} type="advanced-alternatives" />}</Route>
          <Route path="/word/:slug">{(p) => <WordPage slug={p.slug} type="definition" />}</Route>
          <Route path="/words/:type/:value" component={CategoryPage} />
          <Route path="/vocabulary/:slug" component={VocabularyListPage} />
          <Route path="/hub/:hub" component={HubPage} />
          <Route path="/vocabulary" component={VocabularyHubPage} />
          <Route path="/wordle-words" component={WordleWordsPage} />
          <Route path="/scrabble-words" component={ScrabbleWordsPage} />
          <Route path="/spelling-bee-words" component={SpellingBeeWordsPage} />
          <Route path="/crossword-words" component={CrosswordWordsPage} />
          <Route path="/synonym-finder" component={SynonymFinderPage} />
          <Route path="/word-finder" component={WordFinderPage} />
          <Route path="/anagram-solver" component={AnagramSolverPage} />
          <Route path="/dictionary" component={DictionaryPage} />
          <Route path="/word-of-the-day" component={WordOfTheDayPage} />
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
