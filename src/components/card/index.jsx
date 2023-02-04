import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css'
import { Icon } from '@iconify/react';
import 'animate.css';


const Card = ({ postTitle, postDescription, postDate, postImg, id , userImg, userName }) => {

    const recortar = ( str , longitud ) => {
        return `${str.slice( 0, longitud )}...`;
    }

    const titleSlice = (50<postTitle.length) ?recortar(postTitle,50) :postTitle; 
    const descriptionSlice = (67<postDescription.length) ?recortar(postDescription, 67) :postDescription;

    const navigate = useNavigate();

    const goToArticle = () => {
        navigate( `/article/${ id }` , {
        });
    }

  return (
    <>
    <div className={ `${ styles.article } animate__animated animate__fadeIn` } onClick={ goToArticle }>
        <div className={ styles.imageContainer }>
            <img src={ postImg } alt=""/>
            <Icon icon="fa6-solid:ellipsis" className={ styles.ellipsisIcon }/>
        </div>
        <div className={ styles.infoContainer }>
            <h2>{titleSlice}</h2>
            <p>{descriptionSlice}</p>
        </div>
        <hr width="90%"/>
        <div className={ styles.authorContainer }>
            <div className={ styles.authorInfo }>
                <div className={ styles.authorImageContainer }>
                    <img src={ ( userImg === '' ) ? '/public/default-avatar.jpg' : userImg } alt="" className={ `animate__animated animate__fadeIn ${styles.authorImage}`}/>
                </div>
                <p className={ styles.authorName }>{ userName }</p>
            </div>
            <p>{ moment( postDate ).fromNow() }</p>
        </div>
    </div>
    </>
  )
}

export default Card 
