import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from './../user/user.entity';
import Room from './../rooms/room.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Room)
  room: Room;
}

export default Message;