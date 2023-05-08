// Import JSON Web Token //
const jwt = require('jsonwebtoken');

// Export middleware //
module.exports = (reg,res,next) => {
    try {
        // Token is sent as an authorization header //
        // Split header to only retrive the second element in the array //
        const token = reg.headers.authorization.split(' ')[1];
        // Decode the token using verify function //
        // Takes two arguments, the token that needs to be verified and the string used to encode it //
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extract userId from decoded token //
        const userId = decodedToken.userId;
        reg.auth = { userId };
        // Check userId if it is in our request body //
        if (reg.body.userId && reg.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.statuc(401).json({
            error: new Error('Invalid request!')
        });
    }
};
