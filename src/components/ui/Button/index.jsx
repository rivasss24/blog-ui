import styles from './Button.module.css';

const Button = ({ type, desc, children, onClick }) => {
  return (
    <button className={ styles.button }
    onClick={ onClick }
    type={ type }
    >
      { children }
    </button>
  )
}

export default Button