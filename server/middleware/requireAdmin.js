module.exports = function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization || "";

    if(!authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const token = authHeader.slice(7);

    if(!process.env.ADMIN_TOKEN) {
        console.error("ADMIN_TOKEN is not set in environment variables");
        return res.status(500).json({ message: "Server misconfiguration" });
    }

    if(token !== process.env.ADMIN_TOKEN) {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("TOKEN RECEIVED:", token);
    console.log("TOKEN EXPECTED:", process.env.ADMIN_TOKEN);
    next();
};