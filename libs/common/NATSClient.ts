/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import * as nats from 'nats';
import { firstValueFrom } from 'rxjs';
import ContextStorageService, { ContextStorageServiceKey } from '@credebl/context/contextStorageService.interface';

@Injectable()
export class NATSClient {
  private logger: Logger;
  constructor(@Inject(ContextStorageServiceKey)
  private contextStorageService: ContextStorageService
) {
    this.logger = new Logger('NATSClient');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  sendNats(serviceProxy: ClientProxy, cmd: string, payload: any): Promise<any> {
    this.logger.log(`Inside NATSClient for sendNats()`);
    const pattern = { cmd };
    const headers = nats.headers(1, this.contextStorageService.getContextId());
    const record = new NatsRecordBuilder(payload).setHeaders(headers).build();    

    return serviceProxy
      .send<string>(pattern, record)
      .pipe(
        map((response: string) => ({
          response
        }))
      )
      .toPromise();
  }


sendNatsMessage(serviceProxy: ClientProxy, cmd: string, payload: any): Promise<any> {
  const pattern = { cmd };
  const headers = nats.headers(1, this.contextStorageService.getContextId());
  const record = new NatsRecordBuilder(payload).setHeaders(headers).build();

  const result = serviceProxy.send<string>(pattern, record);

  return firstValueFrom(result);
}
}