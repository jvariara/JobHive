export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  password?: string; // Consider omitting password from client-side objects for security
  created_at: Date;
  last_login?: Date; // Optional since it may not always be set
}