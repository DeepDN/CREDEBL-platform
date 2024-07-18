import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@credebl/prisma-service';
import { CloudWalletType } from '@credebl/enum/enum';
// eslint-disable-next-line camelcase
import { cloud_wallet_user_info } from '@prisma/client';
import { ICloudWalletDetails, IStoredWalletDetails } from '@credebl/common/interfaces/cloud-wallet.interface';
import { IGetStoredWalletInfo, IStoreWalletInfo } from '../interfaces/cloud-wallet.interface';


@Injectable()
export class CloudWalletRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger
  ) {}

 
  // eslint-disable-next-line camelcase
  async getCloudWalletDetails(type: CloudWalletType): Promise<cloud_wallet_user_info> {
    try {
      const agentDetails = await this.prisma.cloud_wallet_user_info.findFirstOrThrow({
        where: {
          type
        }
      });
      return agentDetails;
    } catch (error) {
      this.logger.error(`Error in getCloudWalletBaseAgentDetails: ${error.message}`);
      throw error;
    }
  }
  // eslint-disable-next-line camelcase
  async storeCloudWalletDetails(cloudWalletDetails: ICloudWalletDetails): Promise<IStoredWalletDetails> {
    try {
      const {createdBy, label, lastChangedBy, tenantId, type, userId, agentApiKey, agentEndpoint, email, key, connectionImageUrl} = cloudWalletDetails;

      return await this.prisma.cloud_wallet_user_info.create({
        data: {
          label,
          tenantId,
          email,
          type,
          createdBy,
          lastChangedBy,
          userId,
          agentEndpoint,
          agentApiKey,
          key,
          connectionImageUrl
        },
        select: {
          email: true,
          connectionImageUrl: true,
          createDateTime: true,
          id: true,
          tenantId: true,
          label: true,
          lastChangedDateTime: true
          
        }
      });
    } catch (error) {
      this.logger.error(`Error in storeCloudWalletDetails: ${error.message}`);
      throw error;
    }
  }

  // eslint-disable-next-line camelcase
  async getCloudWalletInfo(email: string): Promise<cloud_wallet_user_info> {
    try {
      const walletInfoData = await this.prisma.cloud_wallet_user_info.findUnique({
        where: {
          email
        }
      });
      return walletInfoData;
    } catch (error) {
      this.logger.error(`Error in getCloudWalletInfo: ${error}`);
      throw error;
    }
  }

  async storeCloudWalletInfo(cloudWalletInfoPayload: IStoreWalletInfo): Promise<IGetStoredWalletInfo> {
    try {
      const walletInfoData = await this.prisma.cloud_wallet_user_info.create({
        data: {
          type: cloudWalletInfoPayload.type,
          agentApiKey: cloudWalletInfoPayload.apiKey,
          agentEndpoint: cloudWalletInfoPayload.agentEndpoint,
          email: cloudWalletInfoPayload.email,
          userId: cloudWalletInfoPayload.userId,
          key: cloudWalletInfoPayload.walletKey,
          createdBy: cloudWalletInfoPayload.userId,
          lastChangedBy: cloudWalletInfoPayload.userId
        },
        select: {
          id: true,
          email: true, 
          type: true,
          userId: true,
          agentEndpoint: true
        }
      });
      return walletInfoData;
    } catch (error) {
      this.logger.error(`Error in storeCloudWalletInfo: ${error}`);
      throw error;
    }
  }
}
