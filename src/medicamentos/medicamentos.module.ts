import { Module } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from './entities/medicamento.entity';

@Module({
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
  imports:[TypeOrmModule.forFeature([Medicamento])],
})
export class MedicamentosModule {}
