export type AuthI = {
  id: "login" | "signup";
  label: "Login" | "Sign Up";
};

export type AuthView =
  | "method-selection"
  | "email-login"
  | "phone-login"
  | "email-signup"
  | "phone-signup";
