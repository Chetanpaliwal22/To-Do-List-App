export const required = (val) => val && val.length;
export const maxLength = (val, len) => !(val) || (val.length <= len);
export const minLength = (val, len) => val && (val.length >= len);
export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
export const isSamePassword = (password, confirmPassword) => password === confirmPassword