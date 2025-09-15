import { Medicamento } from "src/medicamentos/entities/medicamento.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Medicamentoxusuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    id_usuario:string;

    @OneToMany(()=>Medicamento, (medicamento)=>medicamento.usuarios)
    medicamento:Medicamento;

    @Column()
    frecuencia:number;

    @Column('text')
    frecuencia_unidad:string;

    @Column()
    fecha_inicio:Date;

    @Column()
    hora_inicio:string;

    @Column()
    active:string;


}
