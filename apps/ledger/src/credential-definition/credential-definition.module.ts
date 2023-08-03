import { ClientsModule, Transport } from '@nestjs/microservices';
import { Logger, Module } from '@nestjs/common';

import { CommonModule } from '@credebl/common';
import { CredentialDefinitionController } from './credential-definition.controller';
import { CredentialDefinitionRepository } from './repositories/credential-definition.repository';
import { CredentialDefinitionService } from './credential-definition.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@credebl/prisma-service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [`${process.env.NATS_URL}`]
        }
      }
    ]),
    HttpModule,
    CommonModule
  ],
  providers: [
    CredentialDefinitionService,
    CredentialDefinitionRepository,
    Logger,
    PrismaService
  ],
  controllers: [CredentialDefinitionController]
})
export class CredentialDefinitionModule { }
