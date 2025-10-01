import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicamentoxusuarioDto } from './dto/create-medicamentoxusuario.dto';
import { UpdateMedicamentoxusuarioDto } from './dto/update-medicamentoxusuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamentoxusuario } from './entities/medicamentoxusuario.entity';
import { Repository } from 'typeorm';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, LastValueFromConfig } from 'rxjs/internal/lastValueFrom';

@Injectable()
export class MedicamentoxusuariosService {

  constructor(
    @InjectRepository(Medicamentoxusuario)
    private readonly medicamentoxusuariosRepository: Repository<Medicamentoxusuario>,
    private readonly medicamentoService: MedicamentosService,
    private readonly httpService: HttpService,  
  ){}

  async create(createMedicamentoxusuarioDto: CreateMedicamentoxusuarioDto) {
    
    try{

      const {id_usuario, id_medicamento, ...medicamentoxusuarioData} = createMedicamentoxusuarioDto;

      const response = await lastValueFrom(
        this.httpService.get(`https://medleyusers.onrender.com/usuarios/${id_usuario}`)
      );

      if(!response.data){
        throw new BadRequestException('usuario no encontrdo');
      }
      console.log(id_usuario)

      const medicamento = await this.medicamentoService.findOne(id_medicamento);
      if (!medicamento){
        throw new BadRequestException('Medicamento no encontrado')
      }
      console.log(medicamento)

      const medicamentoxusuario = this.medicamentoxusuariosRepository.create({
        id_usuario,
        medicamento,
        ...medicamentoxusuarioData
      })
      console.log(medicamentoxusuario)
      await this.medicamentoxusuariosRepository.save(medicamentoxusuario);
      return medicamentoxusuario;

    }catch(err){
      console.log(err)
      throw new BadRequestException(err.detail || 'Error al crear medicamentoxusuario')
    }

  }

  async findAll() {
    return await this.medicamentoxusuariosRepository.find();
  }

  async findOne(id: string) {
    const medicamentoxusuario = await this.medicamentoxusuariosRepository.findOneBy({id});

    if(!medicamentoxusuario){
      throw new BadRequestException('Medicamento de usuaio no encontrado')
    } else{
      return medicamentoxusuario
    }
  }

  async findByUsuario(id_usuario: string){
 
    const medicamentosxusuario = await this.medicamentoxusuariosRepository.find({
      where:{id_usuario},
      relations:['medicamento'],
    });

    if(medicamentosxusuario.length === 0){
      throw new BadRequestException( `No se han encontrado medicamentos para el usuario con id ${id_usuario}`)
    }else{
      return medicamentosxusuario
    }
  }

  async findByMedicamento(id_medicamento:string){

    const usuarios = await this.medicamentoxusuariosRepository.find({
      where:{ medicamento: {id: id_medicamento}},
      relations:['medicamento'],
    });

    if(!usuarios || usuarios.length === 0){
      throw new BadRequestException( `No se encontraron usuarios para el medicamento con id ${id_medicamento}`)
    }

    const usuariosId = usuarios.map((medxuser) => medxuser.id_usuario);
    return usuariosId
  }

  async update(id: string, updateMedicamentoxusuarioDto: UpdateMedicamentoxusuarioDto) {
    const medicamentoxusuario = await this.medicamentoxusuariosRepository.preload({
      id,
      ...updateMedicamentoxusuarioDto
    });

    if (!medicamentoxusuario){
       throw new BadRequestException( `Medicamentoxusuario con id ${id}`)
    } else{
      return medicamentoxusuario
    }
    
  }

  async remove(id: string) {
    const medicamentoxusuario = await this.findOne(id);
    if (!medicamentoxusuario){
      throw new BadRequestException( `Medicamentoxusuario con id ${id}`)
    }
   return await this.medicamentoxusuariosRepository.remove(medicamentoxusuario);
  }
}
