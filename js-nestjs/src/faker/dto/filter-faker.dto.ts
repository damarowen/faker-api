import { IsNotEmpty, IsOptional } from "class-validator";
export class FakeFilterDto {

    @IsOptional()
    name: string

    @IsOptional()
    @IsNotEmpty()
    price: number


    @IsOptional()
    limit = 10
  
    @IsOptional()
    page = 1
}


