import crypto from 'crypto';

/**
 * Genera un token único y aleatorio para una aplicación.
 */
export function generarToken() {
  const random = crypto.randomBytes(32).toString('hex');
  return `tok_${random}`;
}

//Genera un hash determinístico (SHA-256) del token.
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export default { generarToken, hashToken };