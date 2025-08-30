import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetUsers {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    role_id?: number
}

export class CreateUsers {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNumber()
    @IsNotEmpty()
    role_id: number
}

export class UpdateUsers {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name?: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password?: string

    @IsNumber()
    @IsOptional()
    role_id?: number
}