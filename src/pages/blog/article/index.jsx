import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from '../../../../helpers/axios';
import styles from './Article.module.css';
import parse from 'html-react-parser';

const Article = () => {

  const [ post , setPost ] = useState({});

  const { id } = useParams();

  //const navigate = useNavigate();

  const getArticleById = async( id ) => {
    try {
      const { data } = await axios.get(`/posts/${ id }`);
      //console.log( data );
      setPost( data.post );

      } catch (error) {
        console.log( error );
      }
  }

  useEffect( () => {
    getArticleById( id );
  }, []);

  console.log(  post.postImg === '' );

  return (
    <>
    <div className={ styles.article }>
    <div className={ styles.info }>
      <h1> { post.postTitle } </h1>
      <div className={ styles.imgContainer }>
        <img src={ post.postImg } alt=""/> 
      </div>
      <p>{ post.postDescription }</p>
      <div className={ styles.contenido }>
        { parse( `${ post.postContent }` ) }
      </div>
    </div>

    <div className={ styles.author }>
        <div className={ styles.authorImageContainer }>
          <img src={ ( post.userImg === '' ) ? '/public/default-avatar.jpg' : post.userImg } alt=""/>
        </div>
        <p>
        Written by:
        </p>
        <h3>
          { post.userName }
        </h3>
        <p className={ styles.moment }>{ moment( post.postDate ).fromNow() }</p>
    </div>
    </div>
    {
    //<footer className={ styles.footer }></footer>
    }
    </>
  )
}

export default Article