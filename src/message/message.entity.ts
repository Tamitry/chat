import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from './../user/user.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;
}

export default Message;