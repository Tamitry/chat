import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './../user/user.entity';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.rooms)
  users: User[];
}