import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
//import { User } from './users.entity';
import { User } from '../../users/entities/user.entity';	// 2021-09-22 added

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tags: string;
  // @Column()
  // name: string;
  @CreateDateColumn({ type: "timestamp" })
  createTime: Date

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn()
  user: User;
}
