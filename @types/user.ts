
export namespace NSUser {
    export enum Type {
       Admin = 'Admin', 
       User = 'User', 
       Editor = 'Editor'
    }
  
    export interface Item {
      id: number;
      username: string;
      email: string;
      password: string;
      type: Type;
      createdAt: Date;
    }
  
    export interface Role {
      id: number;
      name: string;
      permissions: number[];
      type: 'enum'; 
      enum: ['Admin', 'User', 'Editor'];
      default: 'User';
    }
    
    export interface Permission {
      id: number;
      name: "'create_user', 'edit_user', 'delete_comment', 'view_post'";
      type: 'enum', 
      enum: ['create_user', 'edit_user', 'delete_comment', 'view_post'];
  
    }
}