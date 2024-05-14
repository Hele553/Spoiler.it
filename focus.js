const params = new URLSearchParams(window.location.search);
const numero = params.get('numero');
// console.log(numero);
fetch('film.json').then((response)=>{
    if(!response.ok){
        throw new Error(`Error during fetching: ${response.status}`);
    }
    return response.json();
}).then((filmJSON)=>{
    function apriPagina(pagina, numero){
        window.location.href = pagina + '?numero=' + numero;
    } 
    function generaElemento(tag, attributo, valoreAttributo, parent){
        elemento = document.createElement(tag);
        if(valoreAttributo != ''){
            elemento.setAttribute(attributo, valoreAttributo);
        }
        parent.appendChild(elemento);
        return elemento;
    }
    const nav = document.querySelector('nav');
    const contMainFilm = document.getElementById('contMainFilm');
    contMainFilm.style.height = `calc(100vh - ${nav.clientHeight}px)`;
    const contInfo = document.getElementById('contInfo');
    const titolo = document.getElementById('titolo');


    titolo.innerHTML = filmJSON[numero].titolo;
    const trama = document.getElementById('trama');
    trama.innerHTML = filmJSON[numero].trama;
    const contADR = document.getElementById('contADR');
    const anno = document.getElementById('anno');
    anno.innerHTML = filmJSON[numero].anno;
    const durata = document.getElementById('durata');
    durata.innerHTML = filmJSON[numero].durata;
    const rating = document.getElementById('rating');
    rating.innerHTML = `${filmJSON[numero].rating} / 10`;
    const attori = document.getElementById('attori');
    attori.innerHTML = `<b>Attori</b>: ${filmJSON[numero].attori.join(', ')}.`;
    const regista = document.getElementById('regista');
    regista.innerHTML = `<b>Regista</b>: ${filmJSON[numero].regista}`;
    const genere = document.getElementById('genere');
    genere.innerHTML = `<b>Generi</b>: ${filmJSON[numero].genere.join(', ')}.`;
    const like = document.getElementById('like');
    like.src = '/image/like_vuoto.png';
    like.addEventListener('click', ()=>{
        if(likedImg){
            like.src = '/image/like_vuoto.png';
            likedImg = false;
            // if(arrFilmPref.has(filmJSON[numFilm].titolo)){
            //     arrFilmPref.delete(filmJSON[numFilm].titolo);
            // }
        }else{
            like.src = '/image/liked.png';
            likedImg = true;
            // if(!(arrFilmPref.has(filmJSON[numFilm].titolo))){
            //     arrFilmPref.add(filmJSON[numFilm].titolo);
            // }
        }
        // localStorage.removeItem('filmPreferiti');
        // localStorage.setItem('filmPreferiti', Array.from(arrFilmPref));
    })
    const contImage = document.getElementById('contImage');
    function scorriImg(i){
        contImage.style.backgroundImage = `url(${filmJSON[numero].immagini_varie[i]})`
    }
    async function loopImg(){
        let speed = 0;
        while(true){
            for(let i = 0; i < filmJSON[numero].immagini_varie.length; i++){
                await new Promise(resolve => {
                    setTimeout(()=>{
                        scorriImg(i);
                        resolve();
                    }, speed);
                });
                speed = 20000;
            }
        }
    }
    loopImg();
    
    // CORRELATI
    let filmNonDisponibili = new Set();
    let idxFilmDisp = new Set();
    while(idxFilmDisp.size < 5){
        let idx;
        do{
            idx = Math.floor(Math.random() * filmJSON.length);
        }while(idx == numero || filmNonDisponibili.has(idx));
        filmNonDisponibili.add(idx);
        let found = false;
        for(let i = 0; i < filmJSON[idx].genere.length; i++){
            for(let j = 0; j < filmJSON[idx].genere.length; j++){
                if(filmJSON[numero].genere[i] == filmJSON[idx].genere[j]){ 
                    idxFilmDisp.add(idx);
                    found = true;
                    break;
                }
            }
            if(found){
                break;
            }
        }
        if(idxFilmDisp.size < 5 && filmNonDisponibili.size >= filmJSON.length - 1){
            while(idxFilmDisp.size < 5){
                do{
                    idx = Math.floor(Math.random() * filmJSON.length);
                }while(idxFilmDisp.has(idx));
                idxFilmDisp.add(idx);
            }
        }
    }
    let arrayIdxFilmDisp = Array.from(idxFilmDisp);
    const correlati = document.getElementById('correlati');
    function generaFilm(numFilm, parentFilm){
        const film = generaElemento('div', 'class', 'film', parentFilm); 
        film.style.width = `180px`;
        film.style.height = `238px`;
        const copertina = generaElemento('div', 'class', 'copertina', film);
        copertina.style.backgroundImage = `url(${filmJSON[numFilm].copertina})`;
        
        const descrAll = generaElemento('div', 'class', 'descrAll', film);
        const descAllTitle = generaElemento('h3', 'id', 'descAllTitle', descrAll);
        descAllTitle.innerHTML = filmJSON[numFilm].titolo;

        if(descAllTitle.clientWidth > descrAll.clientWidth - 20){
            let pxTranslate = descAllTitle.clientWidth - descrAll.clientWidth + 15;
            const keyTicker = `
                @keyframes tickerAllFilm${numFilm}{
                    0%{
                        transform: translateX(0px);
                    }
                    85%{
                        transform: translateX(-${pxTranslate}px);
                    }
                    90%{
                        transform: translateX(-${pxTranslate}px);
                    }
                }
            `;
            const stile = document.getElementById('keyFilm');
            stile.textContent += keyTicker;
            descAllTitle.style.animationName = `tickerAllFilm${numFilm}`;
            descAllTitle.style.animationDuration = `${(descAllTitle.clientWidth - descrAll.clientWidth + 20) / 22.8}s`;
            descAllTitle.style.animationTimingFunction = 'linear';
            descAllTitle.style.animationIterationCount = 'infinite';
        }
        const descAllUndertitle = generaElemento('div', 'class', 'descAllUndertitle', descrAll); 
        let datiFilm = [];
        datiFilm.push(filmJSON[numFilm].anno);
        let arrDurata = [];
        for(let i = 0; i < filmJSON[numFilm].durata.length; i++){
            if(!((filmJSON[numFilm].durata[i] >= 'a' && filmJSON[numFilm].durata[i] <= 'z') || (filmJSON[numFilm].durata[i] >= 'A' && filmJSON[numFilm].durata[i] <= 'Z'))){
                arrDurata.push(filmJSON[numFilm].durata[i]);
            }
        }
        let ore;
        let min = [];
        for(let i = 0; i < arrDurata.length; i++){
            if(arrDurata[i] != ' '){
                ore = arrDurata[i];
                arrDurata.splice(i, 1);
                break;
            }
        }
        for(let i = 0; i < arrDurata.length; i++){
            if(arrDurata[i] != ' ' && arrDurata[i] != '0'){
                min.push(arrDurata[i]);
            }
        }

        datiFilm.push(`${ore}h ${min.join('')}m`);
        datiFilm.push(`${filmJSON[numFilm].rating % 1 == 0 ? `${filmJSON[numFilm].rating}.0` : filmJSON[numFilm].rating}/10`);
        descAllUndertitle.innerHTML = datiFilm.join(' | ');
        const descAllGeneri = generaElemento('div', 'class', 'descAllGeneri', descrAll); 
        descAllGeneri.innerHTML = `${filmJSON[numFilm].genere.join(', ')}.`;

        const salvaPreferiti = generaElemento('img', 'class', 'salvaPreferiti', film); 
        // if(arrFilmPref.has(filmJSON[numFilm].titolo)){
        //     likedImg = true;
        //     salvaPreferiti.src = '/image/liked.png';
        // }else{
        //     likedImg = false;
        //     salvaPreferiti.src = '/image/like_vuoto.png';
        // }
        likedImg = false;
        salvaPreferiti.src = '/image/like_vuoto.png';
        salvaPreferiti.addEventListener('click', ()=>{
            if(likedImg){
                salvaPreferiti.src = '/image/like_vuoto.png';
                likedImg = false;
                // if(arrFilmPref.has(filmJSON[numFilm].titolo)){
                //     arrFilmPref.delete(filmJSON[numFilm].titolo);
                // }
            }else{
                salvaPreferiti.src = '/image/liked.png';
                likedImg = true;
                // if(!(arrFilmPref.has(filmJSON[numFilm].titolo))){
                //     arrFilmPref.add(filmJSON[numFilm].titolo);
                // }
            }
            // localStorage.removeItem('filmPreferiti');
            // localStorage.setItem('filmPreferiti', Array.from(arrFilmPref));
        })
        copertina.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
        descrAll.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
    }   
    for(let i = 0; i < arrayIdxFilmDisp.length; i++){
        generaFilm(arrayIdxFilmDisp[i], correlati)
    }
}).catch((error)=>{
    console.error('Error:', error);
})

const nav = document.querySelector('nav');
if(window.scrollY > 0){
    nav.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
}else{
    nav.style.backgroundColor = '#ffbd00';
}

window.addEventListener('scroll', function() {
    if(window.scrollY > 0){
        nav.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
    }else{
        nav.style.backgroundColor = '#ffbd00'
    }
});

nav.addEventListener('mouseout', ()=>{
    if(window.scrollY > 0){
        nav.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
    }
});
nav.addEventListener('mouseover', ()=>{
    if(window.scrollY > 0){
        nav.style.backgroundColor = '#ffbd00';
    }
});