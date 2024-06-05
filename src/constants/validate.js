export const REGEX = {
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  email: /^[\w-\.]{3,}@([\w-]+\.)+[\w-]{2,4}$/,
  facebookURL:
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
  website:
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
  password6char: /^.{6,}$/,
};

export const MESSAGE = {
  required: "Please enter your infomation",
  email: "Please enter email with format form abc@gmail.com",
  emailSimple: "Incorrect email format abc@gmail.com",
  phone: "Please enter phone with format",
  pass6char: "Password must be at least 6 characters",
};
