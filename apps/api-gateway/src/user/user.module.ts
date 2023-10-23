import { CommonService } from '@credebl/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { nkeyAuthenticator } from 'nats';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [`${process.env.NATS_URL}`]
          // authenticator: nkeyAuthenticator(new TextEncoder().encode(process.env.USER_NKEY_SEED)),
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, CommonService]
})
export class UserModule {}
