import './css/styles.css';
import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import imageT from "./templates/images.hbs"

const refs = {
    form: document.querySelector(".search-form"),
    buttonLoad: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
}

const KEY = "26380962-1c7476655555a971bf37ffb07";
const URL = "https://pixabay.com/api/";

let page=1;
let searchQuevery="";
let images;

async function fetchApi(searchQuevery, page){
    try{
        const response = await axios.get(`${URL}?key=${KEY}&q=${searchQuevery}&image_type="photo"&orientation="horizontal"&safesearch="true"&page=${page}&per_page=40`);
    } catch (error) {
        console.log(error);
    }
}

function resetPage(){
    page = 1;
}

function incrementPage(){
    page += 1;
}

refs.form.addEventListener("submit", event=>{
    event.preventDefault();
    searchQuevery = event.currentTarget.elements.searchQuery.value;
    resetPage();
  fetchApi(searchQuevery, page) 
  .then(data=>{
    page+=1;
    return data;
});
  console.log(images);
  gallaryAdd (images);
})

refs.buttonLoad.addEventListener("click", event=>{
    event.preventDefault();
    incrementPage();
   fetchApi(searchQuevery, page);
   
    gallaryAdd (images);
})
function gallaryAdd (images){
    refs.gallery.insertAdjacentHTML("beforeend", imageT(images));
}
