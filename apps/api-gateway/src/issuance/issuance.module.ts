import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { CommonService } from '@credebl/common';
import { HttpModule } from '@nestjs/axios';
import { getNatsOptions } from '@credebl/common/nats.config';
import { ImageServiceService } from '@credebl/image-service';
import { AwsService } from '@credebl/aws';
import { CommonConstants } from '@credebl/common/common.constant';
import { NATSClient } from 'libs/common/NATSClient';

@Module({
  imports: [
    HttpModule,
    //ContextModule, LoggerModule, PlatformConfig,
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: getNatsOptions(CommonConstants.ISSUANCE_SERVICE, process.env.API_GATEWAY_NKEY_SEED)
      }
    ])
  ],
  controllers: [IssuanceController],
  providers: [IssuanceService, ImageServiceService, CommonService, AwsService, NATSClient]
})
export class IssuanceModule { }
