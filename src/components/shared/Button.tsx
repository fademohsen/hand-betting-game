import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children:   React.ReactNode;
  onClick?:   () => void;
  variant?:   Variant;
  size?:      Size;
  disabled?:  boolean;
  fullWidth?: boolean;
  type?:      'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  variant   = 'primary',
  size      = 'md',
  disabled  = false,
  fullWidth = false,
  type      = 'button',
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    size !== 'md' ? styles[size] : '',
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
