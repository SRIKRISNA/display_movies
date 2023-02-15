import './style.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Modal } from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from "react";

function Card(movie) {
    console.log(movie.info);
    var img_pat = "https://image.tmdb.org/t/p/w500";

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="movie" onClick={() => setOpen(true)}>
                <LazyLoadImage
                    effect="blur"
                    src={img_pat + movie.info.poster_path} alt="imge" className="poster" />
                <div className="movie_details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average}</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} className='popup-container'>
                <Modal onClose={() => setOpen(false)} open={open} className='popup' style={{ border: 'none', outline: 0, width: '600px', height: 'max-content', margin: 'auto' }}>
                    <div style={{ backgroundColor: '#fff', width: 'max-content', height: 'max-content', position: 'relative' }}>
                        <button id='closeBtn' onClick={() => setOpen(false)} style={{ position: 'absolute', cursor:'pointer', padding:'3px 7px', right:0 , color:'red', fontWeight:'bold', outline:0, border:'none'}}> CLOSE </button>
                        <div style={{ width: 'auto', float: 'left', height: 'max-content' }}>
                            <img src={img_pat + movie.info.poster_path} alt="imge" width='200px' ></img>
                        </div>
                        <div style={{ float: 'right', width: '350px', padding: '25px' }}>
                            <h2>{movie.info.original_title}</h2>
                            <p>{movie.info.overview}</p>
                        </div>
                        
                    </div>
                </Modal>
            </div>

        </>
    )
}
export default Card;