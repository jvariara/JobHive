export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  created_at: Date;
  last_login?: Date; // Optional since it may not always be set
}