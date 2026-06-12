import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDailyWord,
  useGetStreak,
  useListBadges,
  useListJournalEntries,
  useCreateJournalEntry,
  useDeleteJournalEntry,
  useGetStatsSummary,
  useGetArchetype,
  useCheckIn,
  getListJournalEntriesQueryKey,
  getGetStreakQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Flame, Star, Trophy, BookOpen, Gamepad2, Trash2, Zap, Calendar } from "lucide-react";

const LANGUAGE_CODES: Record<string, string> = {
  English: "en", Spanish: "es", Portuguese: "pt", French: "fr", German: "de",
  Dutch: "nl", Italian: "it", Arabic: "ar", Afrikaans: "af", Zulu: "zu",
  Xhosa: "xh", Farsi: "fa", Russian: "ru", "Bahasa Malay": "ms",
  Vietnamese: "vi", Tagalog: "tl", Japanese: "ja", Cantonese: "yue", "Chinese (Mandarin)": "zh"
};

const MOODS = ["determined", "curious", "hopeful", "reflective", "energetic", "calm", "playful"];

export default function AppPage() {
  const [sentence, setSentence] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();
  const langCode = LANGUAGE_CODES[language] || "en";

  const birthDate = "1998-06-15";

  const { data: dailyWord, isLoading: wordLoading } = useGetDailyWord(
    { language: langCode },
    { query: { queryKey: ["daily-word", langCode] } }
  );
  const { data: streak, isLoading: streakLoading } = useGetStreak();
  const { data: badges } = useListBadges();
  const { data: journalEntries } = useListJournalEntries();
  const { data: stats } = useGetStatsSummary();
  const { data: archetype } = useGetArchetype(
    { birthDate },
    { query: { queryKey: ["archetype", birthDate], enabled: true } }
  );

  const createEntry = useCreateJournalEntry();
  const deleteEntry = useDeleteJournalEntry();
  const checkIn = useCheckIn();

  const handleSaveEntry = () => {
    if (!sentence.trim() || !dailyWord?.word?.word) return;
    createEntry.mutate(
      { data: { word: dailyWord.word.word, sentence, mood: selectedMood || undefined } },
      {
        onSuccess: () => {
          setSentence("");
          setSelectedMood("");
          queryClient.invalidateQueries({ queryKey: getListJournalEntriesQueryKey() });
          toast({ title: "Saved to journal!", description: "Your sentence has been added." });
        },
      }
    );
  };

  const handleCheckIn = () => {
    checkIn.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetStreakQueryKey() });
        toast({ title: "Checked in!", description: "Your streak has been updated." });
      },
    });
  };

  const handleDeleteEntry = (id: number) => {
    deleteEntry.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListJournalEntriesQueryKey() });
        toast({ title: "Entry deleted." });
      },
    });
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <h1 className="text-4xl font-bold tracking-tighter mt-1">Your Daily Word</h1>
          </div>
          <Button
            onClick={handleCheckIn}
            disabled={checkIn.isPending}
            className="rounded-full bg-accent hover:bg-accent/90 font-bold px-6 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            data-testid="button-check-in"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {checkIn.isPending ? "Checking in..." : "Check In Today"}
          </Button>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Streak", value: stats?.currentStreak ?? "-", icon: Flame, color: "text-orange-400" },
            { label: "Words Learned", value: stats?.wordsLearned ?? "-", icon: BookOpen, color: "text-primary" },
            { label: "Badges", value: stats?.badgesEarned ?? "-", icon: Star, color: "text-yellow-400" },
            { label: "Games Played", value: stats?.gamesPlayed ?? "-", icon: Gamepad2, color: "text-accent" },
            { label: "Journal Entries", value: stats?.journalEntries ?? "-", icon: Zap, color: "text-green-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl border border-border bg-card text-center"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color}`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Word Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
          >
            {wordLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : dailyWord ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold uppercase tracking-widest mb-3">
                      Word of the Day
                    </Badge>
                    <h2
                      className="text-5xl md:text-6xl font-bold tracking-tighter"
                      data-testid="text-daily-word"
                    >
                      {dailyWord.word.word}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">{dailyWord.word.partOfSpeech} · {dailyWord.word.difficulty}</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed" data-testid="text-definition">
                  {dailyWord.word.definition}
                </p>
                <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
                  "{dailyWord.word.exampleSentence}"
                </blockquote>
              </div>
            ) : (
              <p className="text-muted-foreground">No word available today.</p>
            )}
          </motion.div>

          {/* Archetype Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl border border-border bg-card space-y-4"
          >
            <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30 text-xs font-bold uppercase tracking-widest">
              Your Archetype
            </Badge>
            {archetype ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{archetype.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg leading-tight" data-testid="text-archetype-name">{archetype.name}</h3>
                    <div className="w-16 h-1 rounded-full mt-1" style={{ backgroundColor: archetype.color }} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{archetype.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Strengths</p>
                  <div className="flex flex-wrap gap-1.5">
                    {archetype.strengths.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Streak + Badges Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-orange-400" />
              <h3 className="font-bold text-lg">Streak</h3>
            </div>
            {streakLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : streak ? (
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold" data-testid="text-streak-count">{streak.currentStreak}</span>
                  <span className="text-muted-foreground mb-1.5">days</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((streak.currentStreak / streak.nextMilestone) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-primary rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {streak.currentStreak} / {streak.nextMilestone} days to next milestone · Longest: {streak.longestStreak} days
                </p>
              </div>
            ) : null}
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h3 className="font-bold text-lg">Badges</h3>
            </div>
            {badges && badges.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30"
                    title={badge.description}
                    data-testid={`badge-${badge.id}`}
                  >
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs font-semibold">{badge.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Check in daily to earn your first badge.</p>
            )}
          </motion.div>
        </div>

        {/* Sentence Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-8 rounded-3xl border border-border bg-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-xl">Sentence Builder</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Write a sentence using{" "}
            <strong className="text-foreground">{dailyWord?.word?.word ?? "today's word"}</strong>.
            This is the most powerful way to make a word yours.
          </p>

          {/* Mood selector */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">How are you feeling today?</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(mood => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood === selectedMood ? "" : mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedMood === mood
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/30"
                  }`}
                  data-testid={`mood-${mood}`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder={`Use "${dailyWord?.word?.word ?? "the word"}" in a sentence that means something to you...`}
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            className="rounded-xl mb-4 resize-none min-h-[100px]"
            data-testid="textarea-sentence"
          />
          <Button
            onClick={handleSaveEntry}
            disabled={!sentence.trim() || createEntry.isPending}
            className="rounded-full bg-primary hover:bg-primary/90 font-bold px-6"
            data-testid="button-save-sentence"
          >
            {createEntry.isPending ? "Saving..." : "Save to Journal"}
          </Button>
        </motion.div>

        {/* Journal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl border border-border bg-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-xl">Word Journal</h3>
          </div>
          {journalEntries && journalEntries.length > 0 ? (
            <div className="space-y-4">
              {journalEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-2xl border border-border hover:border-primary/30 transition-all group"
                  data-testid={`journal-entry-${entry.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">{entry.word}</span>
                        {entry.mood && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{entry.mood}</span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">"{entry.sentence}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                      data-testid={`button-delete-journal-${entry.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Your journal is empty.</p>
              <p className="text-sm mt-1">Write your first sentence above to start tracking your growth.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
