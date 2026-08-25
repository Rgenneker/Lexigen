import type { ReactNode } from "react";

/**
 * French long-form copy for the public core article routes.  Keeping this
 * independently from the English JSX means the French experience cannot
 * silently fall back to an English article when a listing is translated.
 */
function article(intro: string, firstHeading: string, firstParagraph: string, secondHeading: string, points: string[], closing: string): ReactNode {
  return (
    <div className="space-y-5">
      <p>{intro}</p>
      <h3 className="text-xl font-black mt-8 mb-3">{firstHeading}</h3>
      <p>{firstParagraph}</p>
      <h3 className="text-xl font-black mt-8 mb-3">{secondHeading}</h3>
      <ul className="list-disc list-inside space-y-2 pl-2">
        {points.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <p className="mt-8 italic text-muted-foreground">{closing}</p>
    </div>
  );
}

export const FRENCH_CORE_ARTICLE_BODIES: Record<string, ReactNode> = {
  "origin-of-spelling-bee": article(
    "Bien avant TikTok, Instagram et même la radio, des communautés se retrouvaient dans des écoles et des mairies pour épeler des mots. Le Spelling Bee est l'une des plus anciennes compétitions intellectuelles d'Amérique du Nord, et son histoire est bien plus riche qu'un simple souvenir de classe.",
    "D'où vient le mot « bee » ?", "Ici, « bee » ne désigne pas l'insecte. Le terme anglais venait d'un rassemblement de voisins qui s'entraidaient : husking bee pour écosser le maïs, quilting bee pour coudre des courtepointes, puis spelling bee pour faire de l'éducation un projet collectif. Épeler correctement témoignait de l'instruction et permettait d'écrire clairement à distance.",
    "Pourquoi cette compétition reste utile", ["Les concurrents apprennent des racines latines et grecques, pas seulement des listes.", "Ils repèrent l'origine d'un mot — française, allemande ou grecque — pour raisonner son orthographe.", "La précision, la mémoire de travail et le calme sous pression servent bien au-delà du concours."],
    "Du Scripps National Spelling Bee aux applications comme Lexigenz, le format a évolué sans perdre son idée centrale : maîtriser l'écrit, c'est participer à une langue commune."
  ),
  "wild-word-facts": article(
    "La langue est merveilleusement étrange. Les mots de tous les jours transportent des siècles d'emprunts, d'accidents et de changements de sens. Voici quelques faits qui donnent envie de les regarder autrement.",
    "Des mots aux parcours inattendus", "« Dreamt » est l'un des rares mots anglais courants qui se termine par « mt » ; « silly » voulait autrefois dire « béni » ; et « goodbye » est la contraction historique de « God be with ye ». L'anglais conserve ainsi des fossiles de ses formes anciennes.",
    "Quelques étrangetés à retenir", ["« Set » possède des centaines de sens dans l'Oxford English Dictionary.", "Petrichor désigne l'odeur de la pluie sur un sol sec.", "La suite « ough » se prononce de nombreuses façons dans through, though, thought ou cough.", "Les onomatopées changent d'une langue à l'autre : un chien fait « bow wow » en anglais et « ouaf ouaf » en français."],
    "Les mots sont vivants, bizarres et profondément historiques. Plus on observe leurs détours, plus on gagne en curiosité et en précision."
  ),
  "nail-english-exam": article(
    "Réussir un examen d'anglais ne demande ni nuit blanche ni mémorisation frénétique. Il faut comprendre ce qui est évalué et entraîner les gestes précis de la lecture, de l'argumentation et de l'écriture.",
    "Commencez par le barème", "Le rubric ou barème est votre carte au trésor. Lisez-le avant de réviser un texte : il indique si les correcteurs attendent une analyse, des preuves, une structure claire, une voix personnelle ou un vocabulaire précis. Réviser avec cette cible transforme chaque séance.",
    "Une méthode qui produit des progrès", ["Rédigez des réponses chronométrées, sans notes.", "Planifiez une thèse et une preuve pour chaque paragraphe.", "Relisez vos copies avec le barème, pas seulement avec votre intuition.", "Préparez du sommeil : une pensée claire vaut mieux qu'une révision épuisée."],
    "L'anglais évalue la qualité de votre pensée exprimée. Cette compétence se construit par une pratique régulière, réfléchie et réaliste."
  ),
  "lecture-better": article(
    "Une présentation réussie ne consiste pas à parler plus fort ni à remplir chaque slide. Elle aide un public à suivre une idée, à la ressentir et à s'en souvenir.",
    "Faites de votre idée le centre", "Avant de concevoir des diapositives, formulez la seule chose que votre public doit retenir. Ensuite, chaque exemple, chiffre et image doit servir ce message. Une structure simple — problème, idée, preuve, prochaine étape — est plus mémorable qu'une avalanche d'informations.",
    "Douze gestes qui maintiennent l'attention", ["Ouvrez par une question, une scène ou un fait concret.", "Utilisez des slides sobres : une idée visuelle à la fois.", "Marquez des pauses au lieu de combler le silence.", "Regardez les personnes, pas l'écran.", "Répétez à voix haute et chronométrez votre intervention."],
    "La confiance arrive lorsque votre public peut suivre votre cheminement. Préparez la structure, puis laissez votre voix faire le reste."
  ),
  "say-it-confidently": article(
    "Parler avec assurance ne veut pas dire posséder le mot parfait. C'est faire confiance à une pensée suffisamment préparée pour être exprimée simplement.",
    "La précision nourrit la confiance", "Quand on cherche à paraître impressionnant, on se réfugie souvent dans des phrases compliquées. Choisir des mots justes, des phrases courtes et un exemple concret rend pourtant un message plus crédible et plus facile à défendre.",
    "Des habitudes à adopter", ["Remplacez les excuses d'ouverture par votre idée principale.", "Ralentissez légèrement : la vitesse ne prouve pas la maîtrise.", "Préparez trois formulations utiles pour les réunions et les questions.", "Acceptez une pause pour réfléchir plutôt que de remplir l'espace."],
    "Votre voix ne doit pas imiter celle de quelqu'un d'autre. Avec davantage de mots et de pratique, elle devient plus nette, plus calme et plus authentique."
  ),
  "vocabulary-changes-your-life": article(
    "Le vocabulaire n'est pas un accessoire pour paraître intelligent. C'est un outil pour remarquer des différences, expliquer ce que l'on veut et prendre de meilleures décisions.",
    "Les mots élargissent la pensée", "Nommer précisément une émotion, un problème ou une possibilité permet de la distinguer. Une personne qui connaît les mots « compromis », « ambigu », « résilient » ou « échéance » dispose de plus de prises pour comprendre et agir.",
    "Des effets dans la vie réelle", ["Une communication précise inspire plus de confiance au travail.", "La lecture devient plus rapide quand les formes des mots sont familières.", "Un vocabulaire actif aide à négocier, demander et défendre une idée.", "Un mot appris devient vraiment utile lorsqu'on l'emploie dans sa propre phrase."],
    "Enrichir son vocabulaire, c'est gagner davantage de façons de penser, de se faire comprendre et de saisir une opportunité."
  ),
  "gen-z-rewriting-dictionary": article(
    "L'argot de la génération Z n'est pas une version paresseuse de la langue : c'est une innovation sociale. Les groupes créent des mots pour signaler une humeur, une relation ou une expérience que les termes existants ne captent pas encore.",
    "Comment l'argot devient du langage", "Des expressions comme « vibe », « slay » ou « delulu » se propagent parce qu'elles sont expressives, économiques et partagées. Les réseaux accélèrent leur circulation, mais le mécanisme est ancien : chaque génération joue avec les formes et les sens.",
    "Savoir changer de registre", ["Conservez l'argot là où il crée de la proximité.", "Choisissez un registre formel dans un e-mail, un examen ou une candidature.", "Ne confondez pas code-switching et manque de maîtrise.", "Ajoutez du vocabulaire standard sans abandonner votre voix."],
    "La compétence n'est pas de parler toujours de la même façon : c'est de savoir quel langage sert le mieux le moment et la personne en face."
  ),
  "communication-habits": article(
    "La plupart des malentendus ne viennent pas d'un manque de grands mots. Ils viennent de petites habitudes qui empêchent l'autre d'entendre l'intention réelle.",
    "Écouter est déjà communiquer", "Préparer sa réponse pendant que l'autre parle coupe l'information la plus importante. Résumer ce qu'on a compris et poser une question sincère montre de l'attention tout en révélant les zones floues.",
    "Cinq changements concrets", ["Dites d'abord votre point principal.", "Remplacez les généralisations par un exemple précis.", "Évitez d'interrompre pour prouver que vous savez déjà.", "Demandez : « Qu'entends-tu par là ? »", "Terminez par une décision ou une prochaine étape claire."],
    "Une meilleure communication est rarement spectaculaire. Elle consiste surtout à être clair, présent et suffisamment curieux pour corriger le malentendu."
  ),
  "empower-yourself-with-words": article(
    "Le développement personnel parle souvent d'état d'esprit et d'habitudes. Il oublie parfois l'outil qui permet de formuler une ambition, une limite ou un besoin : le vocabulaire.",
    "Nommer, c'est pouvoir agir", "Un mot précis réduit le brouillard. Distinguer une critique d'un abus, une préférence d'une limite, ou un risque d'une certitude aide à répondre avec lucidité plutôt qu'à réagir sous pression.",
    "Construisez un vocabulaire qui vous sert", ["Notez les mots rencontrés dans des contextes importants.", "Cherchez une définition et un exemple, pas seulement une traduction.", "Utilisez le mot dans une phrase qui parle de votre vie.", "Réemployez-le à l'oral et à l'écrit pendant la semaine."],
    "Les mots ne résolvent pas tout, mais ils donnent une forme à ce que vous savez déjà et rendent votre action plus possible."
  ),
  "word-origins-unhinged": article(
    "Les mots quotidiens cachent souvent des histoires improbables. Leur origine révèle les voyages, les métiers et les erreurs qui ont façonné l'anglais.",
    "Les sens ne restent jamais immobiles", "« Salary » est lié au sel, denrée précieuse dans le monde romain ; « clue » désignait autrefois une pelote de fil ; et « muscle » vient d'un mot latin pour « petite souris », image du mouvement sous la peau. Ces chemins ne sont pas toujours linéaires.",
    "Ce que l'étymologie apporte", ["Elle aide à reconnaître les familles de mots.", "Elle explique des orthographes apparemment illogiques.", "Elle donne des repères pour deviner le sens d'un mot nouveau.", "Elle rappelle que les emprunts font la richesse de l'anglais."],
    "Connaître l'histoire d'un mot ne remplace pas l'usage, mais elle rend ce mot plus vivant — et souvent plus facile à retenir."
  ),
  "how-to-improve-your-vocabulary": article(
    "Ajouter 1 000 mots à son vocabulaire actif est un projet réaliste si l'on privilégie la régularité, le contexte et le rappel plutôt que les longues listes.",
    "Apprendre un mot en profondeur", "Une définition seule ne suffit pas. Il faut entendre le mot, voir ses formes, comprendre sa nuance, le placer dans une phrase et le retrouver plus tard. Ce réseau d'indices rend le rappel plus solide.",
    "Un système quotidien simple", ["Choisissez quelques mots utiles chaque semaine.", "Lisez des textes légèrement au-dessus de votre niveau.", "Créez une phrase personnelle pour chaque mot.", "Révisez à intervalles espacés.", "Réemployez les mots dans une conversation ou un message."],
    "Mille mots ne se gagnent pas en un week-end. Ils s'accumulent, un contexte pertinent et une révision intelligente à la fois."
  ),
  "advanced-english-words-professionals": article(
    "Au travail, un vocabulaire avancé n'est utile que s'il rend une idée plus claire. Les mots les plus précieux sont ceux qui permettent d'être précis sans sonner artificiel.",
    "La précision plutôt que le jargon", "Dire qu'une proposition est « feasible », « ambiguous », « sustainable » ou « detrimental » peut être pertinent si le contexte le justifie. Mais un terme sophistiqué ne remplace jamais une explication concrète.",
    "Des mots à intégrer avec discernement", ["« articulate » : exprimer clairement une idée.", "« align » : mettre des objectifs ou des actions en cohérence.", "« mitigate » : réduire un risque ou un effet négatif.", "« leverage » : utiliser une ressource de façon stratégique.", "« concise » : bref sans perdre l'essentiel."],
    "La crédibilité naît quand vos mots sont exacts, compris par votre public et suivis d'actions qui leur correspondent."
  ),
  "wordle-strategies-that-work": article(
    "Wordle paraît simple, mais les meilleures décisions reposent sur l'information obtenue à chaque essai, pas sur un coup de chance.",
    "Commencez par des lettres utiles", "Un mot de départ avec plusieurs voyelles fréquentes et des consonnes courantes — comme « SLATE » ou « CRANE » — élimine rapidement des possibilités. Ensuite, les couleurs doivent guider chaque tentative.",
    "Une stratégie en plusieurs coups", ["Conservez les lettres vertes à leur position.", "Réutilisez les jaunes dans une autre position.", "Évitez les lettres grises, sauf pour tester une hypothèse rare.", "Dans les situations difficiles, jouez un mot qui révèle plusieurs lettres plutôt qu'un simple pari."],
    "Wordle récompense le raisonnement et la patience. Chaque case est une information : traitez-la comme telle, et votre moyenne d'essais baisse."
  ),
  "essential-scrabble-words": article(
    "Au Scrabble, connaître les bons petits mots vaut souvent plus qu'un vocabulaire immense. Les cases bonus et la gestion du chevalet comptent autant que la longueur.",
    "Les mots courts changent une partie", "Des mots acceptés comme « qi », « za », « jo », « xi » ou « aa » permettent de placer des lettres difficiles et d'ouvrir de nouvelles connexions. Vérifiez toujours le dictionnaire officiel utilisé dans votre version.",
    "Jouez pour le score et la suite", ["Gardez un équilibre entre voyelles et consonnes.", "Réservez J, X, Q et Z pour les lettres ou mots bonus.", "Cherchez les extensions : S, -ED et -ING peuvent transformer un mot.", "Évitez d'offrir une case triple-mot facile à votre adversaire."],
    "Le Scrabble est un jeu de vocabulaire, mais aussi de géométrie, de timing et de choix. Un mot modeste bien posé peut décider de la manche."
  ),
  "best-vocabulary-apps-compared": article(
    "Toutes les applications de vocabulaire ne produisent pas la même rétention. Une bonne comparaison regarde moins le nombre de listes que la manière dont une application vous fait comprendre, rappeler et utiliser un mot.",
    "Les critères qui comptent", "Cherchez des définitions fiables, des exemples en contexte, une répétition espacée, un niveau adapté et un suivi clair. Une application qui vous invite à produire vos propres phrases crée un apprentissage plus actif.",
    "Choisir selon votre objectif", ["Pour la révision : privilégiez les rappels espacés.", "Pour l'usage réel : cherchez des exemples et des exercices de phrase.", "Pour garder l'habitude : choisissez une expérience courte et agréable.", "Pour la motivation : les jeux et les séries peuvent aider, sans remplacer la compréhension."],
    "La meilleure application est celle que vous utilisez durablement et qui transforme les mots vus en mots que vous pouvez réellement employer."
  ),
  "spelling-bees-academic-performance": article(
    "Les concours d'orthographe entraînent bien davantage que l'orthographe. Ils développent une attention aux formes des mots, aux racines et aux sons qui soutient la lecture et l'écriture.",
    "Une préparation fondée sur des systèmes", "Les bons candidats apprennent les origines, les préfixes, les suffixes et les régularités des langues sources. Ils peuvent ainsi analyser un mot inconnu au lieu de compter uniquement sur la mémoire.",
    "Des compétences transférables", ["La conscience orthographique accélère la reconnaissance des mots en lecture.", "L'étymologie enrichit le vocabulaire et la compréhension.", "La pratique publique renforce l'écoute et la gestion du stress.", "Les routines de révision développent l'autonomie scolaire."],
    "Un concours n'est pas une mesure complète de l'intelligence. C'est néanmoins un terrain exigeant pour apprendre à observer le langage avec méthode."
  ),
  "crossword-solving-techniques": article(
    "Les mots croisés récompensent la curiosité et les retours successifs sur une grille. Personne ne résout tout dans l'ordre : les réponses se construisent les unes les autres.",
    "Commencez par les points d'appui", "Lisez toutes les définitions et remplissez d'abord celles qui sont immédiates. Les lettres croisées réduisent ensuite les possibilités. Une définition étrange peut cacher un jeu de mots, une abréviation ou un sens secondaire.",
    "Des réflexes de cruciverbiste", ["Repérez les indicateurs de temps, de pluriel et de registre.", "Essayez les réponses courtes fréquentes sans vous y enfermer.", "Laissez une case vide plutôt que de forcer un mot.", "Relisez l'indice dès que de nouvelles lettres apparaissent."],
    "Chaque grille enrichit votre bibliothèque de formes, de références et de synonymes. Le progrès vient moins de la vitesse que de l'habitude de chercher."
  ),
  "science-of-learning-new-words": article(
    "La mémoire ne stocke pas durablement un mot parce qu'on l'a vu une fois. Elle le conserve lorsqu'on le rencontre dans des contextes variés et qu'on doit le rappeler activement.",
    "Le rappel actif bat la relecture", "Essayer de retrouver une définition ou d'écrire une phrase demande un effort utile. Cet effort renforce les chemins de récupération, alors que relire une carte peut donner une illusion familière de maîtrise.",
    "Ce que la recherche conseille", ["Espacez les révisions plutôt que de tout concentrer.", "Associez le mot à une histoire, une image ou une phrase personnelle.", "Variez les contextes de rencontre.", "Testez-vous avant de regarder la réponse.", "Dormez : la consolidation de la mémoire ne se fait pas uniquement pendant l'étude."],
    "Les applications les plus efficaces ne vous montrent pas seulement des mots : elles vous amènent à les retrouver, les comprendre et les utiliser."
  ),
  "vocabulary-matters-in-business": article(
    "Dans une carrière, le vocabulaire influence la manière dont les autres comprennent vos idées. Il ne s'agit pas d'impressionner, mais de cadrer clairement un problème, une décision et une attente.",
    "Le langage rend le travail visible", "Une personne capable de distinguer une priorité d'une urgence, une hypothèse d'un fait, ou un risque d'un obstacle communique avec plus de précision. Cette clarté facilite la confiance, la coordination et le leadership.",
    "Des pratiques professionnelles utiles", ["Préparez les termes essentiels avant une réunion.", "Définissez les mots techniques pour un public mixte.", "Écrivez des e-mails avec un objet, une demande et une échéance clairs.", "Lisez régulièrement en dehors de votre spécialité pour élargir vos cadres de pensée."],
    "Un vocabulaire solide ne garantit pas une promotion, mais il aide vos compétences, vos idées et vos résultats à être mieux compris."
  ),
  "daily-habits-expand-vocabulary": article(
    "Les marathons de mémorisation s'oublient vite. De petites habitudes quotidiennes, reliées à une routine existante, donnent au vocabulaire le temps de s'installer.",
    "La constance crée l'effet composé", "Sept minutes après le café, pendant un trajet ou avant de dormir suffisent pour découvrir un mot, le revoir et l'utiliser. La fréquence crée davantage de traces de mémoire qu'une séance rare et gigantesque.",
    "Des habitudes faciles à ancrer", ["Lisez quelques pages chaque jour.", "Gardez une note de mots et de phrases intéressantes.", "Choisissez le mot du jour dans Lexigenz.", "Réemployez un mot dans un message.", "Faites une révision courte le week-end."],
    "La meilleure routine est celle qui survit aux journées chargées. Commencez petit, rendez-la agréable et laissez les mots s'accumuler."
  ),
  "commonly-misspelled-words": article(
    "Certaines orthographes anglaises piègent tout le monde : elles portent des lettres muettes, des sons trompeurs ou des traces de leur histoire. Les corriger demande des repères, pas de la honte.",
    "Pourquoi ces mots résistent", "« definitely », « separate », « accommodate », « necessary » et « privilege » sont souvent mal écrits parce que leur prononciation ne révèle pas toutes leurs lettres. Une orthographe anglaise conserve fréquemment son origine plutôt qu'un son moderne régulier.",
    "Des moyens de les retenir", ["Découpez le mot en syllabes ou en morceaux visuels.", "Associez une image ou une phrase mnémotechnique.", "Écrivez le mot correctement dans une phrase personnelle.", "Utilisez la vérification orthographique comme un contrôle, non comme un substitut à l'attention."],
    "Chaque erreur identifiée est une occasion de bâtir une forme plus familière. L'orthographe devient plus fiable à force de lecture et de réemploi attentif."
  ),
  "how-to-speak-more-professionally": article(
    "Parler de manière professionnelle ne signifie pas adopter un jargon rigide. C'est adapter son langage au contexte tout en restant clair, respectueux et naturel.",
    "Le professionnalisme est une question de choix", "Une phrase directe comme « Je recommande cette option parce que… » est souvent plus forte qu'une formule vague. Préférer les faits, les verbes précis et les demandes explicites évite de faire travailler l'auditeur à votre place.",
    "Améliorez votre registre", ["Remplacez « truc » ou « machin » par le nom précis.", "Évitez les remplissages répétés : « genre », « en fait », « tu vois ». ", "Exprimez un désaccord avec une raison et une alternative.", "Ajustez le degré de formalité au public, pas à votre anxiété."],
    "Votre langage professionnel peut rester votre langage. L'objectif est de rendre votre contribution facile à comprendre, à discuter et à mettre en œuvre."
  ),
  "powerful-words-improve-communication": article(
    "Certains mots donnent immédiatement une direction à une conversation parce qu'ils précisent l'intention, l'incertitude ou l'action attendue.",
    "Des mots qui clarifient", "« Because » introduit une raison ; « however » marque une limite ; « specifically » demande du concret ; « consequently » relie une cause et un effet. Leur force vient de la relation qu'ils rendent visible, pas de leur longueur.",
    "Employez-les au bon moment", ["Dites « I recommend » pour proposer clairement.", "Dites « could you clarify » pour demander sans accuser.", "Dites « the priority is » pour orienter un groupe.", "Dites « I appreciate » pour reconnaître une contribution précise."],
    "Les mots puissants ne sont pas des mots magiques. Ils fonctionnent quand ils correspondent à une pensée honnête, à un contexte et à une action claire."
  ),
  "vocabulary-building-for-students": article(
    "Un vocabulaire solide aide les élèves à lire plus vite, écrire avec plus de nuance et apprendre dans toutes les matières. Le construire demande un système, pas une liste de dernière minute.",
    "Apprenez les mots dans leurs matières", "Les mots de sciences, d'histoire ou de mathématiques doivent être rencontrés dans de vraies explications. Une définition devient utile lorsqu'on sait reconnaître le mot dans une consigne et l'employer pour expliquer une idée.",
    "Un système d'étude complet", ["Lisez chaque jour des textes variés.", "Tenez un carnet de mots avec définition, exemple et famille de mots.", "Faites des cartes qui demandent une réponse, pas une reconnaissance.", "Écrivez de courts paragraphes avec les nouveaux mots.", "Révisez à intervalles espacés."],
    "Les meilleurs résultats ne viennent pas d'un don secret. Ils suivent une accumulation de mots compris, rappelés et utilisés au fil des semaines."
  ),
  "how-reading-improves-vocabulary": article(
    "La lecture est l'un des moyens les plus puissants d'élargir durablement son vocabulaire, car elle présente les mots dans des situations qui donnent naturellement des indices sur leur sens.",
    "Lisez à la bonne difficulté", "Un texte idéal est largement compréhensible tout en contenant quelques mots nouveaux par page. Trop facile, il n'apporte rien ; trop difficile, il empêche de suivre le contexte. Ce juste niveau favorise l'inférence et la curiosité.",
    "Lire pour apprendre réellement", ["Choisissez des genres variés : fiction, journalisme, essais et non-fiction.", "Notez les mots qui reviennent ou semblent essentiels.", "Devinez le sens grâce au contexte avant de consulter le dictionnaire.", "Réemployez les découvertes dans une phrase ou une conversation.", "Associez la lecture à une pratique quotidienne structurée."],
    "Lire chaque jour, chercher les mots que vous ne possédez pas encore et les utiliser : ce système simple produit des gains remarquables avec le temps."
  ),
};