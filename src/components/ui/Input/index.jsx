import styles from './Input.module.css';

const Input = ({ type, name, value, handleChange, onBlur }) => {
    return (
      <div className={styles.inputContainer}>
          <input type={ type }
          name={ name }
          onChange={ handleChange }
          onBlur={ onBlur }
          value={ value }
          autoComplete="off"
          />
      </div>
    )
}

export default Input