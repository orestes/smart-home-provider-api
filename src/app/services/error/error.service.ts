import { Injectable } from '@nestjs/common';

import { ErrorCode } from 'app/google/enums/error-code.enum';

@Injectable()
export class ErrorService {

  public getErrorPayload(e: any) {
    // Make sure errors conform to
    // https://developers.google.com/actions/smarthome/create#error_responses

    let errorCode = e.errorCode || ErrorCode.unknownError;

    switch (e.name) {
      case 'TokenExpiredError':
        errorCode = ErrorCode.authExpired;
        break;
      // TODO: Verify user has not been deleted or token revoked
      case 'InvalidCredentialsError':
        errorCode = ErrorCode.authFailure;
        break;
    }

    return { errorCode };
  }
}
