import {IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEnterpriseQueryDto {

    @ApiProperty({ example: 'Name' })
    @IsNotEmpty({ message: 'Please provide valid first name' })
    @IsString({ message: 'First name should be a string' })
    firstName: string;

    @ApiProperty({ example: 'Last name' })
    @IsNotEmpty({ message: 'Please provide valid last name' })
    @IsString({ message: 'Last name should be a string' })
    lastName: string;

    @ApiProperty({ example: 'email@example.com' })
    @IsNotEmpty({ message: 'Please provide valid email address' })
    // @IsEmail({ message: 'Please provide valid email address' })
    emailAddress: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '1234567890' })
    mobileNumber: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Organization Name' })
    organizationName: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Role in organization' })
    roleInOrganization: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Your query' })
    query: string;

}