import { ComponentType } from 'react';
import styles from './AuthInput.module.css';
import { IconProps } from './icons/IconProps';

type AuthInputProps = {
  type: string;
  placeholder: string;
  Icon: ComponentType<IconProps>;
};

export function AuthInput({ type, placeholder, Icon }: AuthInputProps) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
