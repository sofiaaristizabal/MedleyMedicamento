import { Transform } from "class-transformer";
import { IsString, MaxLength, Matches, IsUrl, IsNumber } from "class-validator";

export class CreateMedicamentoDto {

  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  nombre: string;

  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  principalActivo: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  concentracion: number;

  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  formaFarmaceutica: string;

  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  viaAdministracion: string;

  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  laboratorio: string;

  @IsString()
  @MaxLength(50)
  @Matches(/^[A-Z0-9-]+$/, { message: "registroInvima must be alphanumeric with dashes" })
  registroInvima: string;

  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  presentacion: string;

  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => value.trim())
  descripcion: string;

  @IsUrl({}, { message: "foto must be a valid URL" })
  foto: string;
}
