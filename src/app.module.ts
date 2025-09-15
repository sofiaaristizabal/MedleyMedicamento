import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { MedicamentoxusuariosModule } from './medicamentoxusuarios/medicamentoxusuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      ssl:{
        rejectUnauthorized:false
      }
    }),
    MedicamentosModule,
    MedicamentoxusuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
