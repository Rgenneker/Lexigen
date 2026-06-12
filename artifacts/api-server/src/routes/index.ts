import { Router, type IRouter } from "express";
import healthRouter from "./health";
import wordsRouter from "./words";
import usersRouter from "./users";
import streaksRouter from "./streaks";
import journalRouter from "./journal";
import gamesRouter from "./games";
import inviteRouter from "./invite";
import premiumRouter from "./premium";
import languageUnlockRouter from "./language-unlock";

const router: IRouter = Router();

router.use(healthRouter);
router.use(wordsRouter);
router.use(usersRouter);
router.use(streaksRouter);
router.use(journalRouter);
router.use(gamesRouter);
router.use(inviteRouter);
router.use(premiumRouter);
router.use(languageUnlockRouter);

export default router;
