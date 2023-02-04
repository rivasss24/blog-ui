import { Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../../components/ui/Input';
import InputPassword from '../../../components/ui/InputPassword';
import Button from '../../../components/ui/Button';

import { NavLink, useNavigate } from 'react-router-dom';
import toast ,{ Toaster } from 'react-hot-toast';
import axios from '../../../../helpers/axios';
import 'animate.css';

import styles from './Login.module.css'
import { useAuth } from '../../../context/AuthContext';

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    password: Yup.string().required('Required')
  });

  const centrar = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  return (
    <div style={ centrar }>
      <Toaster />
      <Formik
    initialValues={{
        email: '',
        password: ''
    }}
    onSubmit={ values => {

        const { email , password } = values;
        
        const formData = new FormData();

        formData.append( 'correo', email );
        formData.append( 'password', password );
  
        const myPromise = new Promise( ( resolve, reject ) => {
        
          axios.post('/auth', formData )
          .then( function (response) {
            console.log( response );
            navigate( '/home', {
              replace: true
            });

            login();
            resolve();
          })
          .catch( function (error) {
            console.log( error );
            reject();
          })
  
        })
        
        toast.promise( myPromise , {
          loading: 'Loading',
          success: 'logged in',
          error: 'Error when fetching, try again...',
        },
        {
          success: {
            duration: 1000,
            iconTheme: {
              primary: '#000000',
            },
          }
        });

    }}
    validationSchema={ LoginSchema }
    >
        {
            ( formik ) => (

              <div className={`${styles.formContainer} animate__animated animate__fadeIn`}>
                <Form onSubmit={ formik.handleSubmit }>
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

                  <div className={ styles.buttonGroup }>
                    <Button type='submit'>
                      LOGIN
                    </Button>
                  </div>

                  <div className={ styles.buttonGroup }>
                    <NavLink
                    to='/auth/signup'
                    >
                      sign-up
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

export default Login
