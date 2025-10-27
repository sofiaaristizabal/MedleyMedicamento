import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicamentoxusuarioDto } from './create-medicamentoxusuario.dto';
import { IsBooleanString, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMedicamentoxusuarioDto extends PartialType(CreateMedicamentoxusuarioDto) {

        @IsNumberString()
        @Transform(({value}) => Number(value))
        frecuencia:number;
    
        @IsString()
        @IsIn(["minutos", "horas", "dias", "semanas", "meses"])
        frecuencia_unidad:string

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
