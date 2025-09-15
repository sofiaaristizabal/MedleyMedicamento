import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicamentoxusuariosService } from './medicamentoxusuarios.service';
import { CreateMedicamentoxusuarioDto } from './dto/create-medicamentoxusuario.dto';
import { UpdateMedicamentoxusuarioDto } from './dto/update-medicamentoxusuario.dto';

@Controller('medicamentoxusuarios')
export class MedicamentoxusuariosController {
  constructor(private readonly medicamentoxusuariosService: MedicamentoxusuariosService) {}

  @Post()
  create(@Body() createMedicamentoxusuarioDto: CreateMedicamentoxusuarioDto) {
    return this.medicamentoxusuariosService.create(createMedicamentoxusuarioDto);
  }

  @Get()
  findAll() {
    return this.medicamentoxusuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicamentoxusuariosService.findOne(id);
  }

  @Get('usuario/:id_usuario')
  findByUsuario(@Param('id_usuario') id_usuario: string) {
    return this.medicamentoxusuariosService.findByUsuario(id_usuario);
  }

  @Get('medicamento/:id_medicamento')
  findByMedicamento(@Param('id_medicamento') id_medicamento: string) {
    return this.medicamentoxusuariosService.findByMedicamento(id_medicamento);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicamentoxusuarioDto: UpdateMedicamentoxusuarioDto) {
    return this.medicamentoxusuariosService.update(id, updateMedicamentoxusuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicamentoxusuariosService.remove(id);
  }
}
