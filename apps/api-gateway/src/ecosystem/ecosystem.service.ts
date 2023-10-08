import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseService } from 'libs/service/base.service';
import { GetAllSentEcosystemInvitationsDto } from './dtos/get-all-sent-ecosystemInvitations-dto';
import { GetAllEndorsementsDto } from './dtos/get-all-endorsements.dto';
import { RequestCredDefDto, RequestSchemaDto } from './dtos/request-schema-dto';


@Injectable()
export class EcosystemService extends BaseService {
  constructor(@Inject('NATS_CLIENT') private readonly serviceProxy: ClientProxy) {
    super('EcosystemService');
  }

  /**
   *
   * @param createEcosystemDto
   * @returns Ecosystem creation success
   */
  async createEcosystem(createEcosystemDto): Promise<object> {
    const payload = { createEcosystemDto };
    return this.sendNats(this.serviceProxy, 'create-ecosystem', payload);
  }

  /**
   *
   * @param editEcosystemDto
   * @returns Ecosystem creation success
   */
  async editEcosystem(editEcosystemDto, ecosystemId): Promise<object> {
    const payload = { editEcosystemDto, ecosystemId };
    return this.sendNats(this.serviceProxy, 'edit-ecosystem', payload);
  }

  /**
   *
   *
   * @returns Get all ecosystems
   */
  async getAllEcosystem(orgId: string): Promise<{ response: object }> {
    const payload = { orgId };
    return this.sendNats(this.serviceProxy, 'get-all-ecosystem', payload);
  }
  

  /**
   * 
   * @param bulkInvitationDto 
   * @param userId 
   * @returns 
   */
  async createInvitation(bulkInvitationDto: BulkEcosystemInvitationDto, userId: string): Promise<object> {
      const payload = { bulkInvitationDto, userId };
      return this.sendNats(this.serviceProxy, 'send-ecosystem-invitation', payload);
  }

  async getInvitationsByEcosystemId(
    ecosystemId: string,
    getAllInvitationsDto: GetAllEcosystemInvitationsDto,
    userId: string
  ): Promise<{ response: object }> {
    const { pageNumber, pageSize, search } = getAllInvitationsDto;
    const payload = { ecosystemId, pageNumber, pageSize, search, userId };
    return this.sendNats(this.serviceProxy, 'get-sent-invitations-ecosystemId', payload);
  }
  

  /**
   *
   * @returns Ecosystem Invitations details
   */
    async getEcosystemInvitations(
      getAllInvitationsDto: GetAllSentEcosystemInvitationsDto,      
      userEmail: string,
      status: string
    ): Promise<{ response: object }> {
      const { pageNumber, pageSize, search } = getAllInvitationsDto;
      const payload = { userEmail, status, pageNumber, pageSize, search };
      return this.sendNats(this.serviceProxy, 'get-ecosystem-invitations', payload);
    }

    async acceptRejectEcosystemInvitaion(
      acceptRejectInvitation: AcceptRejectEcosystemInvitationDto,
      userEmail: string
    ): Promise<{ response: string }> {
      const payload = { acceptRejectInvitation, userEmail };
      return this.sendNats(this.serviceProxy, 'accept-reject-ecosystem-invitations', payload);
    }  

    
    async fetchEcosystemOrg(
      ecosystemId: string,
      orgId: string
    ): Promise<{ response: object }> {
      const payload = { ecosystemId, orgId };
      return this.sendNats(this.serviceProxy, 'fetch-ecosystem-org-data', payload);
    }

    async getEndorsementTranasactions(
      ecosystemId: string,
      orgId: string,
      getAllEndorsements: GetAllEndorsementsDto
    ): Promise<{ response: object }> {
      const { pageNumber, pageSize, search, type } = getAllEndorsements;
      const payload = { ecosystemId, orgId, pageNumber, pageSize, search, type };
      return this.sendNats(this.serviceProxy, 'get-endorsement-transactions', payload);
    }

    
    async schemaEndorsementRequest(requestSchemaPayload: RequestSchemaDto, orgId: number): Promise<object> {
      const payload = { requestSchemaPayload, orgId};
      return this.sendNats(this.serviceProxy, 'schema-endorsement-request', payload);
    }

    async credDefEndorsementRequest(requestCredDefPayload: RequestCredDefDto, orgId: number): Promise<object> {
      const payload = { requestCredDefPayload, orgId};
      return this.sendNats(this.serviceProxy, 'credDef-endorsement-request', payload);
    }

    async signTransaction(endorsementId:string): Promise<object> {
      const payload = { endorsementId };
      return this.sendNats(this.serviceProxy, 'sign-endorsement-transaction', payload);
    }

    async submitTransaction(endorsementId:string): Promise<object> {
      const payload = { endorsementId };
      return this.sendNats(this.serviceProxy, 'sumbit-endorsement-transaction', payload);
    }
}
