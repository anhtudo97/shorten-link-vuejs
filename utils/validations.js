const required = (propertyType) => {
  return (v) => (v && v.length > 0) || `You must input a ${propertyType}`;
};
const minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`;
};
const maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`;
};

const emailFormat = () => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/;
  return (v) => (v && regex.test(v)) || 'Must be a valid email';
};

const domainFormat = () => {
  const regex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
  return (v) => (v && regex.test(v)) || 'Must be a valid domain';
};

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
  domainFormat,
};
