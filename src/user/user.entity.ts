import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Room from './../rooms/room.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @ManyToMany(() => Room, room => room.users)
  @JoinTable()
  rooms: Room[];
}

export default User;