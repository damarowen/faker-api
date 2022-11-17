import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";

export class CreateFakerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
