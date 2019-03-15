import { HttpModule, Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';

// Controllers
import { AppController } from './controllers/app/app.controller';
import { DevicesController } from 'app/controllers/devices/devices.controller';
import { AuthController } from 'app/controllers/auth/auth.controller';
import { SmartHomeController } from 'app/controllers/smart-home/smart-home.controller';

// Middlewares
import { AuthMiddleware } from 'app/middleware/auth/auth.middleware';

// Services
import { DevicesService } from './services/devices/devices.service';
import { DataService } from './services/data/data.service';
import { LoggerService } from './services/logger/logger.service';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { SmartHomeService } from './services/smart-home/smart-home.service';
import { ErrorService } from './services/error/error.service';
import { SyncService } from './services/smart-home/sync.service';
import { ExecuteService } from './services/smart-home/execute.service';
import { QueryService } from './services/smart-home/query.service';


@Module({
  controllers: [
    AppController,
    DevicesController,
    AuthController,
    SmartHomeController,
  ],
  providers: [
    DevicesService,
    DataService,
    LoggerService,
    AuthService,
    UsersService,
    ErrorService,
    SmartHomeService,
    SyncService,
    ExecuteService,
    QueryService,
  ],
  imports: [
    HttpModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('smart-home');
  }
}
