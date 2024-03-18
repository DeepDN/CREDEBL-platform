import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { trim } from '@credebl/common/cast.helper';

class AttributeValue {

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'attributeName is required' })
    attributeName: string;

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'schemaDataType is required' })
    schemaDataType: string;

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'displayName is required' })
    displayName: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty({ message: 'isRequired property is required' })
    isRequired: boolean;
}

export class CreateSchemaDto {
    @ApiProperty()
    @IsString({ message: 'schemaVersion must be a string' }) 
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'schemaVersion is required' })
    schemaVersion: string;

    @ApiProperty()
    @IsString({ message: 'schemaName must be a string' })
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'schemaName is required' })
    schemaName: string;

    @ApiProperty({
        type: [AttributeValue],
        'example': [
            {
                attributeName: 'name',
                schemaDataType: 'string',
                displayName: 'Name',
                isRequired: true
            }
        ]
    })
    @IsArray({ message: 'attributes must be an array' })
    @IsNotEmpty({ message: 'attributes are required' })
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AttributeValue)
    attributes: AttributeValue[];

    orgId: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => trim(value))
    @IsOptional()
    @IsNotEmpty({ message: 'orgDid should not be empty' })
    @IsString({ message: 'orgDid must be a string' })
    orgDid: string;
}

export class CreateW3CSchemaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'schemaObject is required' })
    schema: object;

    @ApiProperty()
    @IsString({ message: 'schemaName must be a string' })
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'schemaName is required' })
    schemaName: string;

    @ApiProperty()
    @IsString({ message: 'schemaName must be a string' })
    @Transform(({ value }) => trim(value))
    @IsNotEmpty({ message: 'schemaName is required' })
    did: string;
 
}
