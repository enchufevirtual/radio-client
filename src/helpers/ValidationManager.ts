/**
 * ValidationManager.ts
 * 
 * Pure validation logic for form fields.
 * Separated for reusability, testability, and clarity.
 * No side effects - returns validation results.
 * 
 * @author Senior Dev
 */

interface ValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string>;
}

/**
 * Validates username format (alphanumeric only)
 */
const validateUsername = (username: string): string | null => {
  const trimmed = username.trim();
  
  if (!trimmed) {
    return 'El username es obligatorio';
  }
  
  if (!/^[A-Za-z0-9]+$/.test(trimmed)) {
    return 'Solo puedes agregar letras y números';
  }
  
  return null;
};

/**
 * Validates email format using RFC 5322 compliant regex
 */
const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  if (!trimmed) {
    return 'El email es obligatorio';
  }
  
  if (!emailRegex.test(trimmed)) {
    return 'El campo "Email" contiene un formato no válido.';
  }
  
  return null;
};

/**
 * Validates password strength and requirements
 */
const validatePassword = (password: string): string | null => {
  const trimmed = password.trim();
  
  if (!trimmed) {
    return 'El password es obligatorio';
  }
  
  if (trimmed.length < 6) {
    return 'La contraseña es muy corta, agrega mínimo 6 caracteres';
  }
  
  return null;
};

/**
 * Validates password confirmation matches original password
 */
const validatePasswordMatch = (password: string, repeatPassword: string): string | null => {
  if (password.trim() !== repeatPassword.trim()) {
    return 'Las contraseñas no son iguales';
  }
  
  return null;
};

/**
 * Main validation function for registration form
 * Returns all field errors in one pass
 */
export const validateRegistrationForm = (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
): ValidationResult => {
  const fieldErrors: Record<string, string> = {};
  
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const passwordMatchError = validatePasswordMatch(password, repeatPassword);
  
  if (usernameError) fieldErrors.username = usernameError;
  if (emailError) fieldErrors.email = emailError;
  if (passwordError) fieldErrors.password = passwordError;
  if (passwordMatchError) fieldErrors.repeatPassword = passwordMatchError;
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors
  };
};

/**
 * Validator functions export for individual field validation
 */
export const Validators = {
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  passwordMatch: validatePasswordMatch
};
