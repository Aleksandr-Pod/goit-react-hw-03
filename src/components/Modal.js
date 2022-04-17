import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ currentImg, handleOverlayClick }) { 

    return createPortal(
        <div className="Overlay" onClick={ handleOverlayClick}>
            <div className="Modal">
                <img src={currentImg.largeImageURL} alt="largeImageURL" />
            </div>
        </div>, modalRoot
    )
}