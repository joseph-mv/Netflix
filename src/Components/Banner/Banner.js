import { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { api_key, imageUrl } from '../../Constants/Constants'

function Banner() {
  const [movie, setMovie] = useState()
  const [urlId, setUrlId] = useState('')
  const [showModal, setShowModal] = useState(false)
  let randomIndex = Math.floor(Math.random() * 19);

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${api_key}&language=en-US`).then(function (response) {
      setMovie(response.data.results[randomIndex])
    })
  }, [])

  const playMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${api_key}`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0].key)
        setShowModal(true)
      }
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setUrlId('')
  }

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className='banner'>
      <div className='content'>
        <h1 className='title'>{movie ? movie.name || movie.title : ''}</h1>
        <div className='banner_buttons'>
          <button onClick={() => { playMovie(movie.id) }} className='button'>Play</button>
          <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className="fade_bottom"></div>
      {showModal && (
        <div className="modal" >
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${urlId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner
