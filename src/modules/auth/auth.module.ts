import express from 'express';
import { ctrlWrapper } from 'helpers';
import { validate } from 'middleware';
import { AuthController } from './auth.controller';
import { singInDto, verifyDto } from './dto';

const router = express.Router();
const breakpointName = 'auth';

const { singIn, verify } = new AuthController();

router.post(`/${breakpointName}/singIn`, validate(singInDto, 'body'), ctrlWrapper(singIn));
router.post(`/${breakpointName}/verify`, validate(verifyDto, 'body'), ctrlWrapper(verify));

export const authRouter = router;
