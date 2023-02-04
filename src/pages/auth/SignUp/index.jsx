import React, { useState } from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import styles from './SignUp.module.css';
import axios from '../../../../helpers/axios';
import Input from '../../../components/ui/Input';
import InputPassword from '../../../components/ui/InputPassword';
import Button from '../../../components/ui/Button';

//Validaciones
const SignupSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
    email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    password: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
});   

const centrar = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const SingUp = () => {

  const [avatar, setAvatar] = useState( '/public/default-avatar.jpg' );

  const handleImage =  ( e, formik ) => {
    formik.setValues( {
      ...formik.values,
      file: e.currentTarget.files[0]
    });
    setAvatar( URL.createObjectURL( e.currentTarget.files[0] ) );
  }


  return (
    <div style={ centrar } >

    <Toaster />

    <Formik
      initialValues={{
          file: null ,
          nombre: '',
          email: '',
          password: ''
      }}
      onSubmit={ ( values, FormikBag ) => {

        const { nombre, email, password, file } = values;
        
        const formData = new FormData();
    
        formData.append( 'nombre', nombre );
        formData.append( 'correo', email );
        formData.append( 'password', password );
        formData.append( 'role', 'ADMIN_ROLE' );
        formData.append( 'file', file );


        const myPromise = new Promise( ( resolve, reject ) => {
          axios.post('/usuarios', formData )
          .then( function (response) {
            console.log( response );
            FormikBag.resetForm();
            setAvatar('/public/default-avatar.jpg');
            resolve();
          })
          .catch( function (error) {
            console.log( error );
            reject();
          })
        })
        
        toast.promise( myPromise , {
          loading: 'Loading',
          success: 'Succes!',
          error: 'Error when fetching, try again...',
        });
    }}
    validationSchema={ SignupSchema }
    >
        {
            ( formik ) => (

              <div className={`${styles.formContainer} animate__animated animate__fadeIn`}>
                <Form onSubmit={ formik.handleSubmit }>
                    
                  <div className={`${styles.formGroup} ${styles.avatar}`}>
                    <div className={styles.imgContainer}>
                      <img src={ avatar } className={'animate__animated animate__fadeIn'}/>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="nombre">Name:</label>
                    <Input type="text" name="nombre" value={formik.values.nombre} handleChange={ formik.handleChange }/>
                    <ErrorMessage name='nombre'/>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <Input type="email" name="email" value={formik.values.email} handleChange={ formik.handleChange }/>
                    <ErrorMessage name='email'/>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="password">Pasword:</label>
                    <InputPassword
                    handleChange={ formik.handleChange } name='password' value={ formik.values.password }
                    />
                    <ErrorMessage name='password'/>
                  </div>

                  <div className={`${styles.formGroup} ${/*styles.dragAndDrop*/''}`}>
                    {/*<DragAndDrop/>*/}
                    <input type="file" 
                    name='file'
                    onChange={ (e) => handleImage( e, formik ) }
                    />
                  </div>

                  <div className={ styles.buttonGroup }>
                    <Button type='submit'>
                      SIGN-UP
                    </Button>
                  </div>

                  <div className={ styles.buttonGroup }>
                    <NavLink
                    to='/auth/login'
                    >
                      login
                    </NavLink>
                  </div>
                     
                </Form>
              </div>
            )
        }
    </Formik>
    </div>
  )
}

export default SingUp