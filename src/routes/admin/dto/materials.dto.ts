import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetMaterials {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    unit_price?: number
}

export class CreateMaterials {
    @IsString()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsOptional()
    unit_price?: number
}

export class UpdateMaterials {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    unit_price?: number
}