import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'primary' }) => {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
