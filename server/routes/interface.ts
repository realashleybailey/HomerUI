// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import express from 'express';
const router = express.Router();

router.get('*', (req: any, res: any) => {
    res.sendFile('../index.html');
});

export default router;