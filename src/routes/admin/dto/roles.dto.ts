import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetRoles {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    @IsOptional()
    name?: string
}

export class CreateRoles {
    @IsString()
    @IsNotEmpty()
    name: string
}

export class UpdateRoles {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string
}