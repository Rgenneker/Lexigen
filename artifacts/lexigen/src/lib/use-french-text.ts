import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Keeps source-owned UI copy localizable while locale catalogs are maintained
 * separately. English (and the existing Spanish behavior) remains unchanged.
 */
export function useFrenchText() {
  const { i18n } = useTranslation();
  const isFrench = i18n.resolvedLanguage?.startsWith("fr") ?? i18n.language.startsWith("fr");

  return useCallback(
    (english: string, french: string) => (isFrench ? french : english),
    [isFrench],
  );
}