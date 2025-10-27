import { Medicamento } from "src/medicamentos/entities/medicamento.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Medicamentoxusuario {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    id_usuario:string;

    @ManyToOne(()=>Medicamento, (medicamento)=>medicamento.usuarios)
    medicamento:Medicamento;

    @Column()
    frecuencia:number;

    @Column('text')
    frecuencia_unidad:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_inicio:Date;

    @Column()
    hora_inicio:string;

    @Column({ default: true })
    active:string;


}
