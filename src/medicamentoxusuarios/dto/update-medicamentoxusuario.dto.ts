import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicamentoxusuarioDto } from './create-medicamentoxusuario.dto';

export class UpdateMedicamentoxusuarioDto extends PartialType(CreateMedicamentoxusuarioDto) {}
