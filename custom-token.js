const crypto = require('crypto');

class TokenManager {
    constructor(secret) {
        this.secret = secret;
    }

    generateToken(data, expiresInMinutes) {
        const payload = {
            data,
            exp: Math.floor(Date.now() / 1000) + (expiresInMinutes * 60)
        };
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const signature = this.generateSignature(encodedPayload);
        return `${encodedPayload}.${signature}`;
    }

    verifyToken(token) {
        const [encodedPayload, signature] = token.split('.');
        const expectedSignature = this.generateSignature(encodedPayload);
        if (signature !== expectedSignature) {
            throw new Error('Invalid token signature');
        }
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('Token has expired');
        }
        return payload.data;
    }

    generateSignature(encodedPayload) {
        return crypto.createHmac('sha256', this.secret).update(encodedPayload).digest('base64');
    }
}

// Example usage
const secret = 'mySuperSecretKey'; // Keep This key secrate 
const tokenManager = new TokenManager(secret);

// Generate a token with data "userId123" that expires in 10 minutes
const token = tokenManager.generateToken('userId123', 10);
console.log('Generated Token:', token);

// Verify the token
try {
    const data = tokenManager.verifyToken(token);
    console.log('Decoded Data:', data);
} catch (error) {
    console.error('Error:', error.message);
}
