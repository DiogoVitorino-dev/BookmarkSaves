import React from "react";
import * as styles from "./styles.module.css";
import Icon from "../icon";

interface TextInputProps extends React.ComponentProps<"input"> {
  title?: string;
  description?: string;
  onChangeText?: (newValue: string) => void;
}

export default function TextInput({
  placeholder,
  description,
  title,
  onChangeText,
  onInput,
  className,
  ...props
}: TextInputProps) {
  const name = `${title}-TextInput`;
  const handleInput: TextInputProps["onInput"] = (e) => {
    if (onChangeText) {
      onChangeText(e.currentTarget.value);
    }

    if (onInput) onInput(e);
  };

  const clearInput = () => {
    const input = document.getElementsByName(name)[0] as
      | HTMLInputElement
      | undefined;

    if (input) {
      input.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInput}>
        <label className={styles.title} htmlFor={`${title}-TextInput`}>
          {title}
        </label>
        <div className={styles.horizontal}>
          <input
            name={name}
            className={`${styles.input} ${className}`}
            placeholder={placeholder}
            type="text"
            {...props}
            onInput={handleInput}
          />

          <Icon
            icon="closeCircle"
            className={styles.icon}
            onClick={clearInput}
          />
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
