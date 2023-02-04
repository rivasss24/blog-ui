import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './InputPassword.module.css';

const InputPassword = ({ name, value, handleChange, onBlur }) => {
  
  const [ showPassword, setShowPassword ] = useState(true);
  
  return (
    <div className={`${styles.inputContainer} ${styles.password}`} tabIndex="0">
       <input type={ showPassword ? 'password' : 'text' }
       name={ name }
       onChange={ handleChange }
       onBlur={ onBlur }
       onClick={ () => {
         //nota: volver a revisar el contenido del tabIndex
         //a ver porque no puedo escribir en el input.
         //paswordContainer.current.focus();
       }
       }
       autoComplete="off"
       value={ value }
       />
    <div className={styles.ShowContentContainer}
    onClick={ () => setShowPassword( !showPassword ) }>
        <div className={ styles.iconContainer }>
        {
        (showPassword)
        ?
        <Icon icon="akar-icons:eye-open" 
        className={ styles.icon }
        />
        :
        <Icon icon="akar-icons:eye-slashed"
        className={ styles.icon }
        />
        }
        </div>
    </div>

  </div>
  )
}

export default InputPassword