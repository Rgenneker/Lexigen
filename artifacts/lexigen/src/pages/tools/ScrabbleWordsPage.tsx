import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ScrabbleWordsPage() {
  usePageMeta({
    title: "Scrabble Words — Complete Strategy Guide & High-Value Word Lists | LexigenZ",
    description: "Master Scrabble with our complete guide. Two-letter words, Q without U words, bingo plays, board strategy, high-scoring words, and the vocabulary knowledge that wins games.",
    canonical: "/scrabble-words",
    keywords: "scrabble words, scrabble strategy, two letter words scrabble, high scoring scrabble words, q without u scrabble, scrabble bingo",
  });

  const twoLetterWords = ["AA","AB","AD","AE","AG","AH","AI","AL","AM","AN","AR","AS","AT","AW","AX","AY","BA","BE","BI","BO","BY","DA","DE","DO","ED","EF","EH","EL","EM","EN","ER","ES","ET","EW","EX","FA","FE","GI","GO","HA","HE","HI","HM","HO","ID","IF","IN","IS","IT","JO","KA","KI","LA","LI","LO","MA","ME","MI","MM","MO","MU","MY","NA","NE","NO","NU","OD","OE","OF","OH","OI","OM","ON","OP","OR","OS","OW","OX","OY","PA","PE","PI","QI","RE","SH","SI","SO","TA","TE","TI","TO","UH","UM","UN","UP","US","UT","WE","WO","XI","XU","YA","YE","ZA"];
  const qWords = [
    { word: "QI", pts: 11, def: "The life force in Chinese philosophy" },
    { word: "QOPH", pts: 18, def: "Hebrew letter" },
    { word: "QANAT", pts: 14, def: "Underground irrigation channel" },
    { word: "QINTAR", pts: 15, def: "Monetary unit of Albania" },
    { word: "TRANQ", pts: 14, def: "To tranquillise" },
    { word: "QIGONG", pts: 16, def: "Chinese health and energy practice" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Word Games</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Scrabble Words</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The complete Scrabble guide. Two-letter words, high-value plays, board strategy, and the vocabulary habits that separate casual players from consistent winners.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How Scrabble Works</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Scrabble is a tile-placement word game played on a 15x15 grid where players take turns placing letter tiles to form words. Each letter tile carries a point value based on its frequency in English, with common letters like A and E worth one point and rare letters like Q and Z worth ten points each. Words are scored based on the combined value of their tiles, multiplied by any premium squares they cover on the board.</p>
              <p>The board contains premium squares of four types. Double Letter squares double the value of one tile placed on them. Triple Letter squares triple one tile's value. Double Word squares double the total value of a word crossing them. Triple Word squares, positioned at the four corners and midpoints of the board's edges, triple the entire word's value and represent some of the highest-scoring real estate in the game.</p>
              <p>Players begin with seven letter tiles drawn randomly from a bag of 100 tiles. On each turn, you may either play a word, exchange some or all of your tiles for new ones from the bag, or pass. Playing tiles scores points and you draw replacement tiles to return your rack to seven. The game ends when all tiles have been drawn and one player has played all their tiles, or when both players pass twice in a row.</p>
              <p>The most important scoring consideration in Scrabble is that every word you form, including short words created parallel to existing tiles, scores points. A three-letter word placed parallel to an existing five-letter word can simultaneously score as a new word and extend existing tiles, potentially scoring points across two complete words with a single play. This parallel play mechanic is what separates intermediate players from advanced ones.</p>
              <p>Official Scrabble uses the Collins Scrabble Words dictionary for international play and the Official Scrabble Players Dictionary for North American play. The two dictionaries differ in which words they include, so it is worth knowing which your game uses. Many exotic two- and three-letter words are valid in one but not the other.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">All Valid Two-Letter Scrabble Words</h2>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">Mastering two-letter words is the single most impactful upgrade available to Scrabble players. These words unlock parallel plays, enable hooks onto existing tiles, and let you dump awkward letter combinations while maintaining a strong position. There are 107 valid two-letter words in standard Scrabble. Memorise these before any other word list.</p>
            <div className="flex flex-wrap gap-2">
              {twoLetterWords.map((w) => (
                <span key={w} className="px-3 py-1.5 rounded-lg bg-card border border-border font-mono font-bold text-sm">{w}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Note: Valid words vary slightly between Collins and OSPD dictionaries. The above list covers widely accepted two-letter words.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Q Without U: Your Lifeline Tiles</h2>
            <p className="text-muted-foreground mb-6">The Q tile scores ten points but is notoriously difficult to play. Knowing words that use Q without a following U is essential for avoiding the penalty of holding an unplayed Q at game end.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {qWords.map(({ word, pts, def }) => (
                <div key={word} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-lg font-mono">{word}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{pts} pts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{def}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Bingo Plays: 50 Bonus Points</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Using all seven tiles in a single turn earns a 50-point bonus called a bingo. This bonus is so significant that experienced players deliberately manage their tile racks to maximise bingo opportunities. A single bingo can overturn a losing game in one move.</p>
              <p>Bingo preparation involves understanding which combinations of letters are most likely to form seven-letter words. Expert players study rack management: keeping a balanced combination of consonants and vowels, avoiding duplicate letters that reduce flexibility, and retaining common endings and beginnings that hook onto many words.</p>
              <p>The most productive bingo stems, meaning sets of six letters that combine with the largest number of single letters to form valid seven-letter words, include combinations built around common letter groups. The letters SATINE combine with thirty-plus different seventh letters to form valid bingo words. Similarly, RETAINS, NASTIER, and ANTSIER are all anagrams of the same six letters plus one variable, demonstrating how a productive stem can unlock multiple bingo opportunities from the same set.</p>
              <p>Common bingo words worth memorising include RETAINS, NASTIER, ANTSIER, ENTAILS, SALIENT, ELASTIN, LATRINES, TRENAILS, AILMENTS, MENTHOLS, and ROUTINES. These words are valuable not just as answers but as stems for finding related bingo opportunities on the fly.</p>
              <p>Rack balance is the key to consistent bingo hunting. A rack with four vowels and three consonants, or vice versa, is poorly balanced and less likely to form seven-letter words than a rack with three vowels and four consonants, or a rack with exactly two of the most common tiles. Experienced players will sacrifice points on a turn to improve rack balance when they see a bingo opportunity two moves ahead.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Advanced Board Strategy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Open vs Closed Board Management</h3>
                <p className="text-muted-foreground leading-relaxed">When you are ahead, close the board by playing short words that block premium squares and reduce your opponent's opportunities. When you are behind, open the board by creating paths to triple word squares and enabling parallel plays. The player who is losing benefits from more open positions that create scoring opportunities; the player who is winning benefits from tighter positions that protect their lead.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Triple Word Square Control</h3>
                <p className="text-muted-foreground leading-relaxed">The triple word squares in Scrabble's corners are among the most valuable real estate on the board. Placing a high-value tile on a triple word square in one move while simultaneously covering a double letter square with another high-value tile produces massive scores. Equally important is preventing your opponent from accessing these squares. Experienced players think several moves ahead about triple word square availability.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Parallel Plays</h3>
                <p className="text-muted-foreground leading-relaxed">Playing a word parallel to an existing word, where multiple of your new letters form two-letter words with the letters already on the board, is one of Scrabble's most powerful techniques. This is exactly why two-letter word knowledge is so critical. A three-letter word placed parallel to an existing word might form four separate valid two-letter words, scoring on all four intersections simultaneously. A player who does not know two-letter words cannot execute this play, while one who does can regularly score 30 to 50 points from a seemingly mundane three-letter play.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Tile Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">Advanced players track which tiles have been played and what remains in the bag. Knowing which letters are still available allows you to calculate the probability of drawing specific tiles, assess whether your opponent can form particular words, and make informed decisions about when to exchange tiles. The full tile distribution is publicly available and worth memorising: two each of D, G, L, S, U; three each of B, C, F, H, M, P, V, W, Y; four As and is; six Es and Rs; and so on.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">High-Value Letters and How to Play Them</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>The high-value tiles, Q, Z, X, and J at ten, eight, and eight points respectively, are powerful assets that can be liabilities if you do not know how to play them. Each has specific strategies worth mastering.</p>
              <p>The Q tile, worth ten points, is the most dangerous tile in Scrabble. The traditional assumption is that Q must be followed by U, but as noted above, many valid Q-without-U words exist. QI alone, worth 11 or 21 points depending on premium squares, is one of the most played words in competitive Scrabble. When you hold Q without U and cannot find a Q-without-U play, consider exchanging the Q even at the cost of a turn, as holding an unplayed Q at game end penalises you by ten points.</p>
              <p>The Z tile at ten points is easier to manage than Q because Z appears in more common words. Words like ZAG, ZIP, ZIT, ZAP, ZEN, and ZEP are short and flexible. ZOEAE, ZOUK, ZONK, and ZEAL offer four- and five-letter options. Double-letter squares under Z turn ten points into twenty; triple-letter squares turn Z into thirty points in a single tile.</p>
              <p>The X tile is worth eight points and is actually easier to play than both Q and Z because of how many two-letter X words exist. XI, XU, OX, AX, and EX are all valid two-letter words. OXEN, EXAM, FLEX, FLUX, HOAX, LUXURY, and similar words give you many medium-length options. X on a double letter square produces sixteen points from a single tile, and many of the short X words allow placement in tight board positions where other tiles cannot fit.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Expand the Vocabulary That Wins at Scrabble</h2>
          <p className="text-muted-foreground mb-6">Daily vocabulary practice with LexigenZ builds the word knowledge that makes two-letter words, bingo plays, and board strategy feel natural.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Start Building Your Word Arsenal</Button></Link>
        </div>
      </section>
    </div>
  );
}
