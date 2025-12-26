import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 100, nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string | null;

    @Column({type: 'varchar', length: 20, default: 'pending'})
    status: string;

    @Column({type: 'timestamp', nullable: true})
    requestedAt: Date | null;
}