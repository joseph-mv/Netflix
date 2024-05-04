

import { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { api_key, imageUrl } from '../../Constants/Constants'
 function Banner() {
  const [movie, setMovie] = useState()
  let randomIndex = Math.floor(Math.random() * 19);
  // console.log('first'+randomIndex)
  useEffect(() => {
    
    // console.log('second'+randomIndex)
   axios.get(`trending/all/week?api_key=${api_key}&language=en-US`).then(function (response){
//  console.log('third'+randomIndex)
 console.log(response.data)
    setMovie(response.data.results[randomIndex])
   })
  
  },[])

  const  playMovie=(id)=>{
    console.log(id)
  }
  
  return (
    <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path :''})`}} className='banner'>
        <div className='content'>
            <h1 className='title'>{movie?movie.name || movie.title :''}</h1>
            <div className='banner_buttons'>
                <button onClick={()=>{playMovie(movie.id)} } className='button'>Play</button>
                <button  className='button'>My List</button>

            </div>
            <h1 className='description'>{movie? movie.overview:''}</h1>
        </div>
      <div className="fade_bottom"></div>
    </div>
  )

}
 


  

export default Banner
