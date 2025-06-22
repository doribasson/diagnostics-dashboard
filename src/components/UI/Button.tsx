import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "custom";
}

const Button = ({ variant, className = "", ...props }: CustomButtonProps) => {
  const btnClass =
    variant === "custom" ? `${styles.customButton} ${className}` : className;
  return <button className={btnClass} {...props} />;
};

export default Button;
