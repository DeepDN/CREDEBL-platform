import { Controller, Logger } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import { EcosystemService } from './ecosystem.service';
import { Body } from '@nestjs/common';
import { BulkSendInvitationDto } from '../dtos/send-invitation.dto';
import { AcceptRejectEcosystemInvitationDto } from '../dtos/accept-reject-ecosysteminvitation.dto';
import { FetchInvitationsPayload } from '../interfaces/invitations.interface';
import { GetEndorsementsPayload } from '../interfaces/endorsements.interface';
import { RequestCredDeffEndorsement, RequestSchemaEndorsement } from '../interfaces/ecosystem.interfaces';

@Controller()
export class EcosystemController {
  constructor(private readonly ecosystemService: EcosystemService) {}
  private readonly logger = new Logger('EcosystemController');

  /**
   * Description: create new ecosystem
   * @param payload Registration Details
   * @returns Get created ecosystem details
   */

  @MessagePattern({ cmd: 'create-ecosystem' })
  async createEcosystem(@Body() payload: { createEcosystemDto }): Promise<object> {
    return this.ecosystemService.createEcosystem(payload.createEcosystemDto);
  }

  /**
   * Description: edit ecosystem
   * @param payload updation Details
   * @returns Get updated ecosystem details
   */
  @MessagePattern({ cmd: 'edit-ecosystem' }) 
  async editEcosystem(@Body() payload: { editEcosystemDto, ecosystemId }): Promise<object> {
    return this.ecosystemService.editEcosystem(payload.editEcosystemDto, payload.ecosystemId);
  }

  /**
   * Description: get all ecosystems
   * @param payload Registration Details
   * @returns Get all ecosystem details
   */
  @MessagePattern({ cmd: 'get-all-ecosystem' })
  async getAllEcosystems(
    @Body() payload: {orgId: string}
  ): Promise<object> {
    return this.ecosystemService.getAllEcosystem(payload);
  }

  /**
   * Description: get ecosystem invitations
   * @returns Get sent invitation details
   */
    @MessagePattern({ cmd: 'get-ecosystem-invitations' })
    async getEcosystemInvitations(
      @Body() payload: {userEmail: string, status: string; pageNumber: number; pageSize: number; search: string }
    ): Promise<object> {
      return this.ecosystemService.getEcosystemInvitations(
        payload.userEmail,
        payload.status,
        payload.pageNumber,
        payload.pageSize,
        payload.search
      );
    } 

  /**
   * 
   * @param payload 
   * @returns Sent ecosystem invitations status
   */
  @MessagePattern({ cmd: 'send-ecosystem-invitation' })
  async createInvitation(
    @Body() payload: { bulkInvitationDto: BulkSendInvitationDto; userId: string }
    ): Promise<string> {
    return this.ecosystemService.createInvitation(payload.bulkInvitationDto, payload.userId);
  }

  /**
   *
   * @param payload
   * @returns Ecosystem invitation status fetch-ecosystem-users
   */
  @MessagePattern({ cmd: 'accept-reject-ecosystem-invitations' })
  async acceptRejectEcosystemInvitations(payload: {
    acceptRejectInvitation: AcceptRejectEcosystemInvitationDto;
  }): Promise<string> {
    return this.ecosystemService.acceptRejectEcosystemInvitations(payload.acceptRejectInvitation);
  }


  @MessagePattern({ cmd: 'get-sent-invitations-ecosystemId' })
  async getInvitationsByOrgId(
    @Body() payload: FetchInvitationsPayload
  ): Promise<object> {
    return this.ecosystemService.getInvitationsByEcosystemId(
      payload
    );
  }

  @MessagePattern({ cmd: 'get-endorsement-transactions' })
  async getEndorsementTransactions(
    @Body() payload: GetEndorsementsPayload
  ): Promise<object> {    
    return this.ecosystemService.getEndorsementTransactions(
      payload
    );
  } 

  @MessagePattern({ cmd: 'delete-ecosystem-invitations' })
  async deleteInvitation(
    @Body() payload: {invitationId: string}
    ): Promise<object> {
    return this.ecosystemService.deleteEcosystemInvitations(
      payload.invitationId
      );
  } 
  @MessagePattern({ cmd: 'fetch-ecosystem-org-data' })
  async fetchEcosystemOrg(
  @Body() payload: { ecosystemId: string, orgId: string}
  ): Promise<object> {
  return this.ecosystemService.fetchEcosystemOrg(
  payload
  );
  }
  
   /**
   * 
   * @param payload 
   * @returns Schema endorsement request
   */
   @MessagePattern({ cmd: 'schema-endorsement-request' })
   async schemaEndorsementRequest(
     @Body() payload: { requestSchemaPayload: RequestSchemaEndorsement; orgId: number }
     ): Promise<object> {
     return this.ecosystemService.requestSchemaEndorsement(payload.requestSchemaPayload, payload.orgId);
   }

   /**
   * 
   * @param payload 
   * @returns Schema endorsement request
   */
   @MessagePattern({ cmd: 'credDef-endorsement-request' })
   async credDefEndorsementRequest(
     @Body() payload: { requestCredDefPayload: RequestCredDeffEndorsement; orgId: number }
     ): Promise<object> {
     return this.ecosystemService.requestCredDeffEndorsement(payload.requestCredDefPayload, payload.orgId);
   }

   /**
   * 
   * @param payload 
   * @returns sign endorsement request
   */
   @MessagePattern({ cmd: 'sign-endorsement-transaction' })
   async signTransaction(
     @Body() payload: { endorsementId: string }
     ): Promise<object> {
     return this.ecosystemService.signTransaction(payload.endorsementId);
   }

   /**
   * 
   * @param payload 
   * @returns submit endorsement request
   */
   @MessagePattern({ cmd: 'sumbit-endorsement-transaction' })
   async submitTransaction(
     @Body() payload: { endorsementId: string }
     ): Promise<object> {
     return this.ecosystemService.submitTransaction(payload.endorsementId);
   }
}
