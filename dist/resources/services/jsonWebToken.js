import jwt from 'jsonwebtoken';
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const generateRefreshToken = (user, req) => {
    req.session.refreshToken = [];
    const token = req.session.refreshToken;
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
    token.push(refreshToken);
    return refreshToken;
};
const refreshToken = (req, res) => {
    if (req.session.refreshToken?.length === 0) {
        const user = req.user;
        const accessToken = generateAccessToken({ user });
        const refreshToken = generateRefreshToken({ user }, req);
        return res.status(200).json({ accessToken, refreshToken });
    }
};
export { generateAccessToken, generateRefreshToken, refreshToken };
//# sourceMappingURL=jsonWebToken.js.map