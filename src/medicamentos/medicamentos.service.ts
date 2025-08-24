import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from './entities/medicamento.entity';


@Injectable()
export class MedicamentosService {

  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository:Repository<Medicamento>
  ){}

  async create(createMedicamentoDto: CreateMedicamentoDto) {
    try{

      const existe = await this.medicamentoRepository.findOne({
         where: {
         nombre: createMedicamentoDto.nombre,
         concentracion: createMedicamentoDto.concentracion,
         formaFarmaceutica: createMedicamentoDto.formaFarmaceutica,
         laboratorio: createMedicamentoDto.laboratorio
         }
      })

      if(existe){
        throw new BadRequestException('El medicamento ya existe')
      }

      const medicamento = this.medicamentoRepository.create(createMedicamentoDto)
      await this.medicamentoRepository.save(medicamento);
      return medicamento;

    }catch(err){
      console.log(err)
      throw new BadRequestException(err.detail || 'Error al crear el medicamento')

    }
  }

  async findAll() {
    return await this.medicamentoRepository.find();
  }

  async findOne(id: string) {
     
    const medicamento = await this.medicamentoRepository.findOneBy({id});

    if(!medicamento){
      throw new BadRequestException('Medicamento no encontrado');
    }else{
      return medicamento;
    }
  }

    async findByName(nombre: string) {
     
    const medicamentos = await this.medicamentoRepository.find({
      where:{nombre}});

    if(medicamentos.length === 0){
      throw new BadRequestException('Medicamento no encontrado');
    }else{
      return medicamentos;
    }
  }


  async update(id: string, updateMedicamentoDto: UpdateMedicamentoDto) {
   const medicamento = await this.medicamentoRepository.preload({
    id,
    ...updateMedicamentoDto
   });
   
   if(!medicamento){
    throw new BadRequestException('Medicamento no encontrado')
   }else{
    return medicamento;
   }

  }

  async remove(id: string) {
    const medicamento = await this.findOne(id);
    return await this.medicamentoRepository.remove(medicamento);
  }
  
}
