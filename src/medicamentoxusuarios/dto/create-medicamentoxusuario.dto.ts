import { Transform } from "class-transformer";
import { IsBooleanString, IsDateString, IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateMedicamentoxusuarioDto {

    @IsString()
    id_usuario:string;

    @IsString()
    id_medicamento:string;

    @IsNumberString()
    @Transform(({value}) => Number(value))
    frecuecia:number;

    @IsString()
    @IsIn(["minutos", "horas", "dias", "semanas", "meses"])
    frecuencia_unidad:string

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => {
    if (!value) {
      
      return new Date();
    }
    return new Date(value); 
  })
  fecha_inicio:Date; 

  @IsOptional()
  @IsString()
  hora_inicio:string

  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return true; // default if not provided
    }
    return value === 'true'; // convert "true"/"false" → boolean
  })
  active:string

}
