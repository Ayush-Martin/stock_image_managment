/**
 * Generates a 6-digit OTP using Math.random().
 * @returns {string} A 6-digit OTP as a string.
 */
export const generateOTP = (): string => {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
};
