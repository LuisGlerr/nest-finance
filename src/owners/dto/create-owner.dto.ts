import { IsString, MinLength } from "class-validator";

export class CreateOwnerDto {

    @IsString()
    id: string;

    @IsString()
    link: string;

    @IsString()
    name: string;

    @IsString()
    email: string;
}
