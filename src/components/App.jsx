import { Component } from 'react';
import "./styles.css";
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';


export class App extends Component {
  state = {
    searchName: "",
    gallery: [],
    page: 1,
    totalItems: 0,
    isLoading: false,
    showModal: false,
    currentImg: {},
    err: null,
}
    
componentDidMount() {
  window.document.addEventListener('keydown', this.handleEsc);
}
componentWillUnmount() {
    window.document.removeEventListener('keydown', this.handleEsc);
  }
componentDidUpdate(_, prevState) {
  if (prevState.searchName !== this.state.searchName ||
    prevState.page !== this.state.page) {
    console.log("Новый запрос");
    this.handleQuery();
  }
}
handleQuery() {
  const URL = "https://pixabay.com/api/";
  const key = "25089539-92235f01f3468a6ac8c56a646";
  const { page, searchName } = this.state;
  this.setState({ isLoading: true });

  fetch(`${URL}?q=${searchName}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(resp => resp.json())
    .then(gallery => {
      if (gallery.hits.length === 0) {
        return Promise.reject(new Error("поиск не дал результата"))
      }
      this.state.gallery.length === 0 ?
      this.setState({ gallery: gallery.hits, totalItems: gallery.totalHits, isLoading: false, err: null }) :
      this.setState(prev => ({ gallery: [...prev.gallery, ...gallery.hits], isLoading: false, err: null }));
    })
    .catch(err => this.setState({ err }))
}
  onSubmit = (evt) => {
    evt.preventDefault();
    this.setState({ searchName: evt.target.elements.searchName.value.trim().toLowerCase(), page: 1, gallery: [] });
  }
  loadMore = () => { 
    this.setState(prev => ({page: prev.page + 1}))
  }
  toggleModal = (img) => {
    this.setState(prev => ({ showModal: !prev.showModal, currentImg: img }))
  }
  handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) this.toggleModal({})
  }
  handleEsc = (evt) => {
  if(evt.code === 'Escape') this.toggleModal({})
} 
  render() {
    console.log("Рендер");  
    const { gallery, page, totalItems, isLoading, showModal, currentImg, err } = this.state;
      return (
    <div>
          <Searchbar onSubmit={this.onSubmit} />
          {err && <p className="error">Ошибка, {err.message}</p>}
        {gallery.length !== 0 &&
          <ImageGallery
            gallery={gallery}
            page={page}
            totalItems={totalItems}
            loadMore={this.loadMore}
            isLoading={isLoading}
            showModal={this.toggleModal} />
        }
          <Loader loading={isLoading}/>
          {showModal && <Modal handleOverlayClick={this.handleOverlayClick} currentImg={currentImg }/>}
    </div>
  );
  }
}