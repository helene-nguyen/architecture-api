export const sessionOptions = {
    saveUninitialized: false,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 1000),
    },
};
//# sourceMappingURL=session.js.map