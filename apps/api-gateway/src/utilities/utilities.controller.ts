import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Controller, UseFilters, Post, Body, Res, HttpStatus, Param } from '@nestjs/common';
import  IResponse from '@credebl/common/interfaces/response.interface';
import { Response } from 'express';
import { ApiResponseDto } from '../dtos/apiResponse.dto';
import { UnauthorizedErrorDto } from '../dtos/unauthorized-error.dto';
import { ForbiddenErrorDto } from '../dtos/forbidden-error.dto';
import { ResponseMessages } from '@credebl/common/response-messages';
import { CustomExceptionFilter } from 'apps/api-gateway/common/exception-handler';
import { UtilitiesDto } from './dtos/shortening-url.dto';
import { UtilitiesService } from './utilities.service';
import { LegacyInvitationDto, OobIssuanceInvitationDto } from './dtos/store-object.dto';
// import { StoreObjectDto } from './dtos/store-object.dto';

@UseFilters(CustomExceptionFilter)
@Controller('utilities')
@ApiTags('utilities')
@ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: UnauthorizedErrorDto })
@ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden', type: ForbiddenErrorDto })
export class UtilitiesController {

  constructor(
    private readonly utilitiesService: UtilitiesService
  ) { }
  

  @Post('/')
  @ApiOperation({ summary: 'Create a shorteningurl', description: 'Create a shortening url' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created', type: ApiResponseDto })
  async createShorteningUrl(@Body() shorteningUrlDto: UtilitiesDto, @Res() res: Response): Promise<Response> {
    const shorteningUrl = await this.utilitiesService.createShorteningUrl(shorteningUrlDto);
    const finalResponse: IResponse = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.shorteningUrl.success.createShorteningUrl,
      data: shorteningUrl
    };
    return res.status(HttpStatus.CREATED).json(finalResponse);
  }

  @Post('/store-object/:persistent')
  @ApiOperation({ summary: 'Store an object and return a short url to it', description: 'Create a short url representing the object' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created', type: ApiResponseDto })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async storeObject(@Body() storeObjectDto: OobIssuanceInvitationDto | LegacyInvitationDto, @Param('persistent') persistent: boolean, @Res() res: Response): Promise<Response> {
    // eslint-disable-next-line no-console
    console.log('Reached in api-gateway controller. The object to store is::::::: ', JSON.stringify(storeObjectDto));
    const shorteningUrl = await this.utilitiesService.storeObject(persistent.valueOf(), storeObjectDto);
    const finalResponse: IResponse = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.storeObject.success.storeObject,
      data: shorteningUrl
      // data: 'success'
    };
    return res.status(HttpStatus.CREATED).json(finalResponse);
  }

}

