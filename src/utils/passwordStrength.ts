export const calculatePasswordStrength = (password: string): string => {
    let strength = 'Weak';
    if (password.length >= 8) {
      strength = 'Moderate';
    }
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      strength = 'Strong';
    }
    return strength;
  };
  