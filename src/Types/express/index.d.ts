import { User } from '../userTypes';
// to make the file a module and avoid the TypeScript error for ExpressJS
export {};

declare global {
    namespace Express {
      export interface Request {
        user?: User | null;
      }
    }
  }
declare module 'express-session' {
  interface SessionData {
    token?: string;
    refreshToken?: string | string[];
  }

  interface Session {
    destroy(): void;
  }

}