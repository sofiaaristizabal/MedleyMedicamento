import { Module } from '@nestjs/common';
import { MedicamentoxusuariosService } from './medicamentoxusuarios.service';
import { MedicamentoxusuariosController } from './medicamentoxusuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamentoxusuario } from './entities/medicamentoxusuario.entity';
import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { MedicamentosModule } from 'src/medicamentos/medicamentos.module';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [MedicamentoxusuariosController],
  providers: [MedicamentoxusuariosService, MedicamentosService],
  imports:[TypeOrmModule.forFeature([Medicamentoxusuario, Medicamento]), MedicamentosModule, HttpModule]
})
export class MedicamentoxusuariosModule {}
