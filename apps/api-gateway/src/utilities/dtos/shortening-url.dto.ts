
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

@ApiExtraModels()
  
export class UtilitiesDto {

    @ApiProperty()
    @IsNotEmpty()
    credentialId: string;

    @ApiProperty()
    @IsNotEmpty()
    schemaId: string;

    @ApiProperty()
    @IsNotEmpty()
    credDefId: string; 

    @ApiProperty()
    @IsNotEmpty()
    invitationUrl: string;

    @ApiProperty({
        example: [
          {
            name: 'name',
            value: 'value'
          }
        ]
      })
      @IsArray({ message: 'attributes must be a valid array' })
      @IsNotEmpty({ message: 'please provide valid attributes' })
      attributes: Attribute[];
}

interface Attribute {
    name: string;
    value: string;
  }

  export class GenericDto {
  @ApiProperty()
  @IsNotEmpty()  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: string | object;
}