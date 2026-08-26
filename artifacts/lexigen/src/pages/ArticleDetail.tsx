import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2, Check, BookOpen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ARTICLES, CATEGORY_COLORS } from "@/data/articles";
import NotFound from "@/pages/not-found";
import { usePageMeta } from "@/hooks/usePageMeta";
import { FRENCH_ARTICLE_METADATA, MANDARIN_ARTICLE_METADATA } from "@/i18n/article-metadata";
import { FRENCH_CORE_ARTICLE_BODIES } from "@/i18n/french-article-content";
import { MANDARIN_CORE_ARTICLE_BODIES } from "@/i18n/mandarin-article-content";

function MemoryScienceBody() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p>{t("invite.articleMemoryScienceBody.intro")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleMemoryScienceBody.networksHeading")}
      </h3>
      <p>{t("invite.articleMemoryScienceBody.networksParagraph")}</p>
      <p>{t("invite.articleMemoryScienceBody.activeRecallParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleMemoryScienceBody.ownSentenceHeading")}
      </h3>
      <p>{t("invite.articleMemoryScienceBody.ownSentenceParagraph")}</p>
      <p>{t("invite.articleMemoryScienceBody.journalParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleMemoryScienceBody.reviewHeading")}
      </h3>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li>{t("invite.articleMemoryScienceBody.reviewStepOne")}</li>
        <li>{t("invite.articleMemoryScienceBody.reviewStepTwo")}</li>
        <li>{t("invite.articleMemoryScienceBody.reviewStepThree")}</li>
      </ol>
      <p>{t("invite.articleMemoryScienceBody.conclusion")}</p>
    </div>
  );
}

function LanguageHabitsBody() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p>{t("invite.articleLanguageHabitsBody.intro")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleLanguageHabitsBody.smallExposureHeading")}
      </h3>
      <p>{t("invite.articleLanguageHabitsBody.smallExposureParagraph")}</p>
      <p>{t("invite.articleLanguageHabitsBody.smallExposureSecondParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleLanguageHabitsBody.stableRoutineHeading")}
      </h3>
      <p>{t("invite.articleLanguageHabitsBody.stableRoutineParagraph")}</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>{t("invite.articleLanguageHabitsBody.routineStepOne")}</li>
        <li>{t("invite.articleLanguageHabitsBody.routineStepTwo")}</li>
        <li>{t("invite.articleLanguageHabitsBody.routineStepThree")}</li>
        <li>{t("invite.articleLanguageHabitsBody.routineStepFour")}</li>
      </ul>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleLanguageHabitsBody.structureHeading")}
      </h3>
      <p>{t("invite.articleLanguageHabitsBody.structureParagraph")}</p>
      <p>{t("invite.articleLanguageHabitsBody.conclusion")}</p>
    </div>
  );
}

function SocialLearningBody() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p>{t("invite.articleSocialLearningBody.intro")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleSocialLearningBody.competitionHeading")}
      </h3>
      <p>{t("invite.articleSocialLearningBody.competitionParagraph")}</p>
      <p>{t("invite.articleSocialLearningBody.bestCompetitionParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleSocialLearningBody.socialInteractionHeading")}
      </h3>
      <p>{t("invite.articleSocialLearningBody.socialInteractionParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleSocialLearningBody.gameHeading")}
      </h3>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li>{t("invite.articleSocialLearningBody.gameStepOne")}</li>
        <li>{t("invite.articleSocialLearningBody.gameStepTwo")}</li>
        <li>{t("invite.articleSocialLearningBody.gameStepThree")}</li>
        <li>{t("invite.articleSocialLearningBody.gameStepFour")}</li>
      </ol>
      <p>{t("invite.articleSocialLearningBody.conclusion")}</p>
    </div>
  );
}

function CodeSwitchingBody() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p>{t("invite.articleGenZLanguageBody.intro")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleGenZLanguageBody.registerHeading")}
      </h3>
      <p>{t("invite.articleGenZLanguageBody.registerParagraph")}</p>
      <p>{t("invite.articleGenZLanguageBody.codeSwitchingParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleGenZLanguageBody.repertoireHeading")}
      </h3>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>{t("invite.articleGenZLanguageBody.repertoireStepOne")}</li>
        <li>{t("invite.articleGenZLanguageBody.repertoireStepTwo")}</li>
        <li>{t("invite.articleGenZLanguageBody.repertoireStepThree")}</li>
        <li>{t("invite.articleGenZLanguageBody.repertoireStepFour")}</li>
      </ul>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articleGenZLanguageBody.precisionHeading")}
      </h3>
      <p>{t("invite.articleGenZLanguageBody.precisionParagraph")}</p>
      <p>{t("invite.articleGenZLanguageBody.conclusion")}</p>
    </div>
  );
}

function PersonalGrowthBody() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <p>{t("invite.articlePersonalGrowthBody.intro")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articlePersonalGrowthBody.precisionHeading")}
      </h3>
      <p>{t("invite.articlePersonalGrowthBody.precisionParagraph")}</p>
      <p>{t("invite.articlePersonalGrowthBody.precisionSecondParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articlePersonalGrowthBody.confidenceHeading")}
      </h3>
      <p>{t("invite.articlePersonalGrowthBody.confidenceParagraph")}</p>
      <h3 className="text-xl font-black mt-8 mb-3">
        {t("invite.articlePersonalGrowthBody.usefulVocabHeading")}
      </h3>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li>{t("invite.articlePersonalGrowthBody.usefulVocabStepOne")}</li>
        <li>{t("invite.articlePersonalGrowthBody.usefulVocabStepTwo")}</li>
        <li>{t("invite.articlePersonalGrowthBody.usefulVocabStepThree")}</li>
        <li>{t("invite.articlePersonalGrowthBody.usefulVocabStepFour")}</li>
      </ol>
      <p>{t("invite.articlePersonalGrowthBody.conclusion")}</p>
    </div>
  );
}

function ArticleDetailInner({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const article = ARTICLES.find((a) => a.id === id)!;
  const hasInviteArticleLocalization = i18n.language === "es" || i18n.language === "fr" || i18n.language === "zh";
  const frenchMetadata = i18n.language === "fr" ? FRENCH_ARTICLE_METADATA[id] : undefined;
  const frenchBody = i18n.language === "fr" ? FRENCH_CORE_ARTICLE_BODIES[id] : undefined;
  const mandarinMetadata = i18n.language === "zh" ? MANDARIN_ARTICLE_METADATA[id] : undefined;
  const mandarinBody = i18n.language === "zh" ? MANDARIN_CORE_ARTICLE_BODIES[id] : undefined;
  const localizedArticle = hasInviteArticleLocalization
    ? {
        "why-context-beats-repetition": {
          category: t("invite.articleMemoryScienceTag"),
          title: t("invite.articleMemoryScienceTitle"),
          excerpt: t("invite.articleMemoryScienceExcerpt"),
          body: <MemoryScienceBody />,
        },
        "the-21-day-word-habit": {
          category: t("invite.articleLanguageHabitsTag"),
          title: t("invite.articleLanguageHabitsTitle"),
          excerpt: t("invite.articleLanguageHabitsExcerpt"),
          body: <LanguageHabitsBody />,
        },
        "learning-with-others": {
          category: t("invite.articleSocialLearningTag"),
          title: t("invite.articleSocialLearningTitle"),
          excerpt: t("invite.articleSocialLearningExcerpt"),
          body: <SocialLearningBody />,
        },
        "owning-every-register": {
          category: t("invite.articleGenZLanguageTag"),
          title: t("invite.articleGenZLanguageTitle"),
          excerpt: t("invite.articleGenZLanguageExcerpt"),
          body: <CodeSwitchingBody />,
        },
        "word-power-is-life-power": {
          category: t("invite.articlePersonalGrowthTag"),
          title: t("invite.articlePersonalGrowthTitle"),
          excerpt: t("invite.articlePersonalGrowthExcerpt"),
          body: <PersonalGrowthBody />,
        },
      }[id]
    : undefined;
  // French is intentionally all-or-nothing for public article details: a
  // missing route record must be visible during development, never shown as
  // an English article to a French reader.
  if (i18n.language === "fr" && (!frenchMetadata || (!frenchBody && !localizedArticle))) {
    throw new Error(`Missing French article detail localization for "${id}"`);
  }
  if (i18n.language === "zh" && (!mandarinMetadata || (!mandarinBody && !localizedArticle))) {
    throw new Error(`Missing Mandarin article detail localization for "${id}"`);
  }
  const localizedMetadata = frenchMetadata ?? mandarinMetadata;
  const displayCategory = localizedMetadata?.category ?? localizedArticle?.category ?? article.category;
  const displayTitle = localizedMetadata?.title ?? localizedArticle?.title ?? article.title;
  const displayExcerpt = localizedMetadata?.excerpt ?? localizedArticle?.excerpt ?? article.excerpt;
  const displayBody = frenchBody ?? mandarinBody ?? localizedArticle?.body ?? article.body;
  const getArticleTitle = (linkedArticle: (typeof ARTICLES)[number]) => {
    if (i18n.language === "fr") {
      return FRENCH_ARTICLE_METADATA[linkedArticle.id]!.title;
    }
    if (i18n.language === "zh") return MANDARIN_ARTICLE_METADATA[linkedArticle.id]!.title;
    if (!hasInviteArticleLocalization) return linkedArticle.title;
    const localizedTitles: Record<string, string> = {
      "why-context-beats-repetition": t("invite.articleMemoryScienceTitle"),
      "the-21-day-word-habit": t("invite.articleLanguageHabitsTitle"),
      "learning-with-others": t("invite.articleSocialLearningTitle"),
      "owning-every-register": t("invite.articleGenZLanguageTitle"),
      "word-power-is-life-power": t("invite.articlePersonalGrowthTitle"),
    };
    return localizedTitles[linkedArticle.id] ?? linkedArticle.title;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  usePageMeta({
    title: `${displayTitle} | LexigenZ`,
    description: displayExcerpt,
    canonical: `/articles/${id}`,
    ogType: "article",
    keywords: i18n.language === "fr"
      ? `vocabulaire, mots anglais, ${displayCategory}, apprentissage des langues, Lexigenz`
      : `vocabulary, English words, ${displayCategory}, language learning, LexigenZ`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      inLanguage: i18n.language === "fr" ? "fr" : i18n.language,
      headline: displayTitle,
      description: displayExcerpt,
      author: { "@type": "Organization", name: "Lexigenz Trading", url: "https://lexigenz.com" },
      publisher: {
        "@type": "Organization",
        name: "LexigenZ",
        logo: { "@type": "ImageObject", url: "https://lexigenz.com/favicon.svg" },
      },
      url: `https://lexigenz.com/articles/${id}`,
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://lexigenz.com/articles/${id}` },
      articleSection: displayCategory,
      timeRequired: `PT${article.readTime}M`,
    },
  });

  const currentIndex = ARTICLES.findIndex((a) => a.id === id);
  const prev = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const next = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: displayTitle, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/articles">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t("articleDetail.allArticles")}
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
              {displayCategory}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} {t("articleDetail.minRead")}
            </span>
          </div>

          <div className="text-5xl mb-5">{article.emoji}</div>

          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {displayTitle}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {displayExcerpt}
          </p>

          <div className="flex items-center justify-between mb-10 pb-8 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{t("articleDetail.authoredBy")} <strong className="text-foreground">Lexigenz</strong></span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              {copied ? t("articleDetail.copied") : t("articleDetail.share")}
            </Button>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed">
            {displayBody}
          </div>

          <div className="mt-14 pt-10 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-8">
              {t("articleDetail.footer")} <strong>Lexigenz</strong> {t("articleDetail.footerSuffix")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/articles/${prev.id}`}>
                  <div className="group p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                    <p className="text-xs text-muted-foreground mb-1">{t("articleDetail.prevLabel")}</p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {getArticleTitle(prev)}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/articles/${next.id}`}>
                  <div className="group p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-right">
                    <p className="text-xs text-muted-foreground mb-1">{t("articleDetail.nextLabel")}</p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {getArticleTitle(next)}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="text-center mt-8">
              <Link href="/articles">
                <Button variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("articleDetail.browseAll")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) return <NotFound />;
  return <ArticleDetailInner id={id!} />;
}
