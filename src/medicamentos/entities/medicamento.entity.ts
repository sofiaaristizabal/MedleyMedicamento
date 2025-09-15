import { Medicamentoxusuario } from "src/medicamentoxusuarios/entities/medicamentoxusuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from "typeorm";

@Entity()
@Unique(["nombre", "concentracion", "formaFarmaceutica", "laboratorio"])
export class Medicamento {

    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column('text')
    nombre:string
    @Column('text')
    principalActivo:string
    @Column()
    concentracion:number
    @Column('text')
    formaFarmaceutica:string
    @Column('text')
    viaAdministracion:string
    @Column('text')
    laboratorio:string
    @Column('text')
    registroInvima:string
    @Column('text')
    presentacion:string
    @Column('text')
    descripcion:string
    @Column('text')
    foto:string
    @ManyToOne(()=>Medicamentoxusuario, (medicamentoXusuario)=>medicamentoXusuario.medicamento)
    usuarios:Medicamentoxusuario[];
}
