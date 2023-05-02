interface ICookie {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
  maxAge: number;
  expires: Date;
}

interface ISessionOptions {
  saveUninitialized: boolean;
  resave: boolean;
  proxy: boolean;
  secret: string;
  cookie: ICookie;
}

export const sessionOptions: ISessionOptions = {
  // The default value is true, but using the default has been deprecated, as the default will change in the future
  saveUninitialized: false,
  resave: true,
  proxy: true,
  secret: process.env.SESSION_SECRET!,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // or 'strict'
    maxAge: 24 * 60 * 60 * 1000, //24 hours
    expires: new Date(Date.now() + 60 * 60 * 1000), //1 hour
  },
};
