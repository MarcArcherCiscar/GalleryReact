import React, { useEffect, useState } from 'react';
import './gallery.styles.css';
import logo from '../../assets/logo.svg';

import { photosApi } from '../../__dont_modify__/api/photos';

const loadNextPage = async(page: any) =>{
    photosApi.getPhotos({page:page})
    .then(data => {return "OK"})
    .catch(error => {return "KO"});
}

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [showFullImage, setShowFullImage] = useState(false);
    const [urlFullImage, setUrlFullImage] = useState("");

    useEffect(() => {
        getPhotos();
    }, []);

    function loadNextPage(){
        setPage(page+1);
        getPhotos();
    }

    function getPhotos(){
        photosApi.getPhotos({page:page})
        .then(data => {
            setPhotos(JSON.parse(JSON.stringify(data.photos)));
        })
        .catch(error => {
            alert(`${error}. Please try again in a few minutes`);
        });
    }

    function openImage(urlImage: string){
        setUrlFullImage(urlImage);
        setShowFullImage(true);
    }

    function closeFullImage(){
        setUrlFullImage("");
        setShowFullImage(false);
    }

    const PhotoItem = ({ photo } : {photo:any}) =>{
        return (
            <div>
                <img onClick={() => {openImage(photo["previewUrl"])}} src={photo["previewUrl"]} alt={photo["name"]} />
            </div>
        );
    }

    if(showFullImage) return(
        <div className='full-image'>
            <div id="close" onClick={() => {closeFullImage()}}>
                <span></span>
                <span></span>
            </div>
            
            <img className='full-image-img' src={urlFullImage} alt="full-image"/>
        </div>
    )

    return (
        <div className="gallery-container">
            <div className="gallery-grid">
                {photos.map((item) => 
                    (
                        <PhotoItem  photo={item} />
                    )
                )}
            </div>

            <div className='actions'>
                <button className='button-80 center' onClick={() => loadNextPage()} >Show more</button>
            </div>
        </div>
    )
}


export default Gallery
  