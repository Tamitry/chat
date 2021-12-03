import { UserService } from './../user/user.service';
import * as jwt from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';

export class JwtService {
  constructor(private userService: UserService) { }

  async verify(token: string) {
    try {
      console.log(token);

      const payload = <any>jwt.verify(token, process.env.SECRET_KEY);

      const user = await this.userService.getUserById(payload.sub._id);

      if (!user) {
        throw new WsException('Unauthorized access');
      }

      return user;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}