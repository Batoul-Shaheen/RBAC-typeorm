import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { User } from './User.js';
import { Permission } from './Permission.js';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

   @Column
  ({
    nullable: false,
    type: 'enum',
    enum: ['Admin', 'User', 'Editor'],
    default: 'User'
  })
  name: "Admin" | "User" | "Editor";

  @ManyToMany(() => Permission, { cascade: true, eager: true })
  @JoinTable()
  permissions: Permission[];


  @ManyToMany(() => User, user => user.roles)
  users: User[];

  
}