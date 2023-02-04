import React from 'react';
import styles from './Profile.module.css';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik, ErrorMessage, Form } from 'formik';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import InputPassword from '../../../components/ui/InputPassword';
import axios from '../../../../helpers/axios';

const profileUpdateSchema = Yup.object().shape({
  newNombre: Yup.string()
  .min(8, 'Too Short!')
  .max(16, 'Too Long!')
  .required('Required'),
  oldPassword: Yup.string()
  .required('Required'),
  newPassword: Yup.string()
  .min(8, 'Too Short!')
  .max(16, 'Too Long!')
  .required('Required')
  .test('isLarger', 'Verification password does not match.', ( value, testContext) => {
    if ( testContext.parent.passwordCheck !== value ) return false ;
    return true
  }),
  passwordCheck: Yup.string()
  .min(8, 'Too Short!')
  .max(16, 'Too Long!')
  .required('Required')
  .test('isLarger', 'Verification password does not match.', ( value, testContext) => {
    if ( testContext.parent.newPassword !== value ) return false ;
    return true
  })
});

const centrar = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const Profile = () => {
  return (
  <>
  <div style={ centrar } >

  <Toaster />

  <Formik
    initialValues={{
        file: null ,
        newNombre: '',
        oldPassword: '',
        newPassword: '',
        passwordCheck: ''
    }}
    onSubmit={ ( values, FormikBag ) => {

      const { file, newNombre, oldPassword, newPassword } = values;
      
      const formData = new FormData();

      formData.append( 'newNombre', newNombre );
      formData.append( 'oldPassword', oldPassword );
      formData.append( 'newPassword', newPassword );

      console.log( "esto se envio :", formData );
      
      const myPromise = new Promise( ( resolve, reject ) => {
        axios.put('/usuarios', formData )
        .then( function (response) {
          console.log( response );
          FormikBag.resetForm();
          //setAvatar('/public/default-avatar.jpg');
          resolve();
        })
        .catch( function (error) {
          console.log( error );
          reject();
        })
      })
      
      toast.promise( myPromise , {
        loading: 'Loading',
        success: 'Succes! Changes saved',
        error: 'OLD PASSWORD INCORRECT',
      });
  }}
  validationSchema={ profileUpdateSchema }
  >
      {
          ( formik ) => (

            <div className={`${styles.formContainer} animate__animated animate__fadeIn`}>
              <Form onSubmit={ formik.handleSubmit }>

                <div className={styles.formGroup}>
                  <label htmlFor="newNombre">New Name:</label>
                  <Input type="text" name="newNombre" value={formik.values.newNombre} handleChange={ formik.handleChange }/>
                  <ErrorMessage name='newNombre'/>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="oldPassword">Old Pasword:</label>
                  <InputPassword
                  handleChange={ formik.handleChange } name='oldPassword' value={ formik.values.oldPassword }
                  />
                  <ErrorMessage name='oldPassword'/>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Pasword:</label>
                  <InputPassword
                  handleChange={ formik.handleChange } name='newPassword' value={ formik.values.newPassword }
                  />
                  <ErrorMessage name='newPassword'/>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="passwordCheck">Repeat New Pasword:</label>
                  <InputPassword
                  handleChange={ formik.handleChange } name='passwordCheck' value={ formik.values.passwordCheck }
                  />
                  <ErrorMessage name='passwordCheck'/>
                </div>

                <div className={ styles.buttonGroup }>
                  <Button type='submit'>
                  SAVE CHANGES
                  </Button>
                </div>

              </Form>
            </div>
          )
      }
  </Formik>
  </div>
  </>
  )
}

export default Profile