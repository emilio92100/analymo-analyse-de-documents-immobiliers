const errorMap: Record<string, string> = {
  "Invalid login credentials": "Email ou mot de passe incorrect.",
  "Email not confirmed": "Veuillez confirmer votre email avant de vous connecter.",
  "User already registered": "Un compte existe déjà avec cet email.",
  "Signup requires a valid password": "Le mot de passe n'est pas valide.",
  "Password should be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères.",
  "Password should be at least 6 characters.": "Le mot de passe doit contenir au moins 6 caractères.",
  "Unable to validate email address: invalid format": "Le format de l'email est invalide.",
  "Email rate limit exceeded": "Trop de tentatives. Réessayez dans quelques minutes.",
  "For security purposes, you can only request this once every 60 seconds": "Pour des raisons de sécurité, veuillez patienter 60 secondes avant de réessayer.",
  "New password should be different from the old password.": "Le nouveau mot de passe doit être différent de l'ancien.",
  "Auth session missing!": "Session expirée. Veuillez vous reconnecter.",
  "User not found": "Aucun compte trouvé avec cet email.",
  "Token has expired or is invalid": "Le lien a expiré ou est invalide.",
  "Email link is invalid or has expired": "Le lien email est invalide ou a expiré.",
  "Phone number format is not valid": "Le format du numéro de téléphone est invalide.",
  "OTP has expired or is invalid": "Le code de vérification a expiré ou est invalide.",
  "Anonymous sign-ins are disabled": "Les connexions anonymes sont désactivées.",
  "Signups not allowed for this instance": "Les inscriptions sont actuellement désactivées.",
  "Database error saving new user": "Erreur lors de la création du compte. Réessayez.",
  "A user with this email address has already been registered": "Un compte existe déjà avec cet email.",
  "Password is too weak": "Le mot de passe est trop faible. Utilisez au moins 6 caractères.",
  "Network error": "Erreur de connexion réseau. Vérifiez votre connexion internet.",
  "fetch failed": "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
};

export function translateAuthError(message: string): string {
  // Exact match
  if (errorMap[message]) return errorMap[message];

  // Partial match
  const lowerMsg = message.toLowerCase();
  for (const [key, value] of Object.entries(errorMap)) {
    if (lowerMsg.includes(key.toLowerCase())) return value;
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}
