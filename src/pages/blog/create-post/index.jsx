import { useRef }from 'react'
import styles from './CreatePost.module.css';
import Button from '../../../components/ui/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../../helpers/axios';

const Post = () => {


  const contenido = useRef();
  const img = useRef();

  const handleImage =  ( e ) => {
    formik.setValues( {
      ...formik.values,
      file: e.currentTarget.files[0]
    });
  }

  const SignupSchema = Yup.object().shape({
    title: Yup.string()
    .required('Required'),
    description: Yup.string()
    .required('Required'),
  });

  const formik = useFormik({
    validationSchema: SignupSchema ,
    initialValues: {
      file: null ,
      title: '',
      description: '',
      contenido: ''
    },
    onSubmit: values => {

      console.log( 'ejecutandose' );

      const { description, title, file } = values;
      
      const formData = new FormData();
  
      formData.append( 'title', title );
      formData.append( 'description', description );
      formData.append( 'contenido', `${contenido.current.innerHTML}` );
      formData.append( 'file', file );

      console.log( `${contenido.current.innerHTML}` );

      const myPromise = new Promise( ( resolve, reject ) => {
        axios.post('/posts', formData )
        .then( function (response) {
          console.log( response );
          formik.resetForm();
          contenido.current.innerHTML = '';
          console.log( img.current );
          img.current.value = '';
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

    },
  });

  const myStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

  return (
  <div className="App" style={ myStyle } >

    <Toaster />

    <form className={ styles.formulario } id="formulario" onSubmit={ formik.handleSubmit }>
    <div className={ styles.title }>
        <div className={ styles.labelContainer }>
            <label htmlFor="tittle">Title</label>
        </div>
        <input type="text" placeholder="" name="title" id="title" onChange={ formik.handleChange } value={ formik.values.title }/>
        {/* <p><span id="titleCaracteres">0/100</span></p> */}
    </div>

    <div className={styles.description }>
        <div className={ styles.labelContainer }>
            <label htmlFor="description">Description</label>
        </div>

        <input type="text" name="description" id="description" onChange={ formik.handleChange } value={ formik.values.description }/>
        { /* <p><span id="descCaracteres">0/200</span></p> */}

        <div className={`${styles.content}  ${styles.decriptionDivContainer}`} contentEditable="true" id="contenido" ref={ contenido }></div>

    </div>



    <div className={ styles.fileContainer }>
        <input type="file" name="file" id="file" onChange={ handleImage } ref={ img }/>
    </div>

    <Button type='submit'>
      POST
    </Button>

  </form>
  </div>
  )
}

export default Post