// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated } from 'typeorm';
@Entity()
export class Girl {
  //   @PrimaryGeneratedColumn()
  //   id: number;
  //   @Column()
  //   name: string;
  //   @Column()
  //   age: number;
  //   @Column()
  //   skill: string;
  // }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  skill: string;
  @CreateDateColumn({ type: 'timestamp' })
  entryTime: Date;
//   @Generated('uuid')
//   uuid: string;
}
