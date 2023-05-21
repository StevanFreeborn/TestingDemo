import { ChangeEventHandler, ComponentType } from 'react';
import styles from './AuthInput.module.css';
import { IconProps } from './icons/IconProps';

type AuthInputProps = {
  type: string;
  placeholder: string;
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  Icon: ComponentType<IconProps>;
};

export function AuthInput({
  type,
  placeholder,
  value,
  Icon,
  changeHandler,
}: AuthInputProps) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}
