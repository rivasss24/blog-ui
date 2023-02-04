
import axios from "../../../../helpers/axios";
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Card from '../../../components/card'

const Home = () => {

    const [ posts , setPosts] = useState([]);

    const getPosts = async () => {
      try {
    
      const response = await axios.get('/posts?limite=50');
  
      setPosts(  response.data.posts );
  
      } catch (error) {
        console.log( error );
      }
    }
  
    useEffect(() => {
      getPosts()
    }, []);
  
    const myStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flexStart',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row'
    }

  return (
    <>
    <Toaster />
    <div  style={ myStyle }>
    {
      ( 1 <= posts?.length )
      ?
      (      
      posts.map( ( post ) => {
        return <Card key={ post.id } { ...post }/>
       })
      )
      :
      (<h2>Aún no hay posts :c </h2>)
    }
    </div>
    </>
  )
}

export default Home