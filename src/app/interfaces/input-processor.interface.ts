import { JwtPayload } from 'app/interfaces/jwt-payload.interface';
import { Input } from 'app/interfaces/input.interface';

export interface InputProcessor {
  getResponse(input: Input, context: JwtPayload): any;
}
