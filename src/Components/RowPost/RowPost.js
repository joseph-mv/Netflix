import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { api_key, imageUrl } from '../../Constants/Constants'
import YouTube from 'react-youtube'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const[urlId,setUrlId]=useState('')
  const [status ,setStatus]=useState(false)
  useEffect(() => {
    axios.get(props.url).then((response) => {
      // console.log(response.data.results)
      setMovies(response.data.results)
    }).catch((error) => {
      
    })

  },[])
  const handleMovie = (id) => {
    console.log(id)
    axios.get(`movie/${id}/videos?api_key=${api_key}`).then((response)=>{
      console.log(response.data.results.length)
      setStatus(!status)
     if(response.data.results.length!==0){
      setUrlId(response.data.results[0])
      
      console.log(urlId)
     }
     else{
      console.log('Array is empty')
     }
    })
  }
  
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {
          movies.map((obj) =>
            <img onClick={()=>{handleMovie(obj.id) }} className={`${props.isSmall ? 'actionPoster' : 'poster'}`}
              src={`${imageUrl + obj.backdrop_path}`}
              alt=""/>
          )
        }

      </div>
      {status && urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

export default RowPost
