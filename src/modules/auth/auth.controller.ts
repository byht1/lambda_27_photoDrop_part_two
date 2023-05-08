import { AuthService } from './auth.service';
import { IAuthController, TSingInRoutFn, TVerifyRoutFn } from './type';

export class AuthController implements IAuthController {
  constructor(private authService = new AuthService()) {}

  singIn: TSingInRoutFn = async (req, res) => {
    const { phoneNumber } = req.body;

    await this.authService.singIn(phoneNumber);

    return res.send(phoneNumber);
  };

  verify: TVerifyRoutFn = async (req, res) => {
    const verifyDto = req.body;

    const token = await this.authService.verify(verifyDto);

    return res.json(token);
  };
}
