let setFilmPref = new Set();
const filmPreferitiJSON = localStorage.getItem('filmPreferiti');
if(filmPreferitiJSON !== null){
    setFilmPref = new Set(filmPreferitiJSON.split(','));
}
// console.log(setFilmPref);
// setFilmPref = Array.from(setFilmPref);
fetch('film.json').then((response)=>{
    if(!response.ok) {
        throw new Error(`Error during fetching: ${response.status}`);
    }
    return response.json();
}).then((filmJSON)=>{
    function apriPagina(pagina, numero) {
        window.location.href = pagina + '?numero=' + numero;
    } 
    function apriPreferiti(pagina, array) {
        window.location.href = pagina + '?numero=' + array.join('i');
    } 
    function generaElemento(tag, attributo, valoreAttributo, parent){
        elemento = document.createElement(tag);
        if(valoreAttributo != ''){
            elemento.setAttribute(attributo, valoreAttributo);
        }
        parent.appendChild(elemento);
        return elemento;
    } 

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

    const btnPreferiti = document.getElementById('btnPreferiti');
    btnPreferiti.addEventListener('click', ()=>{
        let arrFilmPref = Array.from(setFilmPref);
        let arrIdxPref = [];
        for(let i = 0; i < arrFilmPref.length; i++){
            for(let j = 0; j < filmJSON.length; j++){
                if(arrFilmPref[i] == filmJSON[j].titolo){
                    arrIdxPref.push(j);
                    break;
                }
            }
        }
        // console.log(arrIdxPref);
        apriPreferiti('preferiti.html', arrIdxPref);
    })
    const descMainFDG = document.getElementById('descMainFDG');
    const allFDG = document.querySelectorAll('.allFDG');
    const imageMainFDG = document.querySelector('.imageMainFDG');
    const secAllFDG = document.querySelector('#secAllFDG');

    const opzioni = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const callbackFDG = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                secAllFDG.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observerFDG = new IntersectionObserver(callbackFDG, opzioni);

    observerFDG.observe(btnPreferiti);

    const arrFDG = [];
    for(let i = 0; i < allFDG.length; i++){
        let FDGDrawn;
        let diverso = true;
        do{
            diverso = true;
            FDGDrawn = filmJSON[Math.floor(Math.random() * filmJSON.length)];
            for(let j = 0; j < arrFDG.length; j++){
                if(FDGDrawn == arrFDG[j]){
                    diverso = false;
                    break;
                }
            }
        }while(!diverso);
        arrFDG.push(FDGDrawn);
    }
    function scorriMainFDG(n){
        while(descMainFDG.firstChild){
            descMainFDG.removeChild(descMainFDG.firstChild);
        }
        const titleMainFDG = generaElemento('h2', 'class', 'titleMainFDG', descMainFDG);
        titleMainFDG.innerHTML = 'I film del giorno';
        const contNameMainFDG = generaElemento('div', 'class', 'contNameMainFDG', descMainFDG);
        const nameMainFDG = generaElemento('h2', 'class', 'nameMainFDG', contNameMainFDG);
        nameMainFDG.innerHTML = arrFDG[n].titolo;
        if(nameMainFDG.clientWidth > contNameMainFDG.clientWidth){
            let pxTranslate = nameMainFDG.clientWidth - contNameMainFDG.clientWidth;
            const keyTicker = `
                @keyframes tickerTitle{
                    0%{
                        transform: translateX(0%);
                    }
                    85%{
                        transform: translateX(-${pxTranslate}px);
                    }
                    90%{
                        transform: translateX(-${pxTranslate}px);
                    }
                }
            `;
            const stile = document.getElementById('keyMainFDG');
            stile.textContent = '';
            stile.textContent = keyTicker;
            nameMainFDG.style.animationName = 'tickerTitle';
            nameMainFDG.style.animationDuration = `${(nameMainFDG.clientWidth - contNameMainFDG.clientWidth) / 22.8}s`;
            nameMainFDG.style.animationTimingFunction = 'linear';
            nameMainFDG.style.animationIterationCount = 'infinite';
        }
        const contADRG_MainFDG = generaElemento('div', 'class', 'contADRG_MainFDG', descMainFDG); //container anno, durata, rating, generi del Film del Giorno principale
        
        const anno = generaElemento('span', 'class', 'annoMainFDG', contADRG_MainFDG);
        anno.innerHTML = arrFDG[n].anno;

        const bar1 = generaElemento('span', 'class', 'bar1MainFDG', contADRG_MainFDG);
        bar1.innerHTML = '|';
        const durata = generaElemento('span', 'class', 'durataMainFDG', contADRG_MainFDG);
        const bar2 = generaElemento('span', 'class', 'bar2MainFDG', contADRG_MainFDG);
        bar2.innerHTML = '|';
        
        const rating = generaElemento('span', 'class', 'ratingMainFDG', contADRG_MainFDG);
        if(window.innerWidth > 1500){
            anno.innerHTML = arrFDG[n].anno;
            durata.innerHTML = arrFDG[n].durata;
            rating.innerHTML = `${arrFDG[n].rating} / 10`;
        }else{
            durata.innerHTML = arrFDG[n].durata.replace(/ or. e/g, 'h').replace(/ minut./, 'm');
            rating.innerHTML = arrFDG[n].rating;
        }

        const generi = generaElemento('div', 'class', 'generiMainFDG', descMainFDG);
        generi.innerHTML = `${arrFDG[n].genere.join(', ')}.`;
        
        const trama = generaElemento('p', 'class', 'tramaMainFDG', descMainFDG);
        trama.innerHTML = arrFDG[n].trama;

        imageMainFDG.style.backgroundImage = `url(${arrFDG[n].immagini_varie[Math.floor(Math.random() * 3)]})`;
    
        const contBtnMainFDG = generaElemento('div', 'class', 'contBtnMainFDG', descMainFDG);
        const btnApprofondisciMainFDG = generaElemento('button', 'class', 'btnApprofondisciMainFDG', contBtnMainFDG);
        btnApprofondisciMainFDG.innerHTML = 'Approfondisci';
        btnApprofondisciMainFDG.addEventListener('click', ()=>{
            for(let k = 0; k < filmJSON.length; k++){
                if(filmJSON[k] == arrFDG[n]){
                    apriPagina('focus.html', k);
                    break
                }
            }
        });
        const continuaadEsplorare = generaElemento('span', 'id', 'continuaadEsplorare', contBtnMainFDG);
        const anchorEsplora = generaElemento('a', 'id', '', continuaadEsplorare);
        anchorEsplora.href = '#contGenere0';
        anchorEsplora.innerHTML = 'Continua ad esplorare';
        const salvaPreferitiMainFDG = generaElemento('img', 'class', 'salvaPreferitiMainFDG', contBtnMainFDG);
        if(setFilmPref.has(arrFDG[n].titolo)){
            likedImg = true;
            salvaPreferitiMainFDG.src = '/image/liked.png';
        }else{
            likedImg = false;
            salvaPreferitiMainFDG.src = '/image/like_vuoto.png';
        }
        salvaPreferitiMainFDG.addEventListener('click', ()=>{
            if(likedImg){
                if(likedImg){
                    salvaPreferitiMainFDG.src = '/image/like_vuoto.png';
                    likedImg = false;
                    if(setFilmPref.has(arrFDG[n].titolo)){
                        setFilmPref.delete(arrFDG[n].titolo);
                    }
                }
            }else{
                salvaPreferitiMainFDG.src = '/image/liked.png';
                likedImg = true;
                if(!(setFilmPref.has(arrFDG[n].titolo))){
                    setFilmPref.add(arrFDG[n].titolo);
                }
            }
            
            localStorage.removeItem('filmPreferiti');
            localStorage.setItem('filmPreferiti', Array.from(setFilmPref));
        })
    }
    async function loopMainFDG(){
        let speed = 0;
        while(true){
            for(let i = 0; i < allFDG.length; i++) {
                await new Promise(resolve => {
                    setTimeout(()=>{
                        scorriMainFDG(i);
                        resolve();
                    }, speed);
                });
            }
            speed = 20000;
        }
    }
    loopMainFDG();
    for(let i = 0; i < allFDG.length; i++){
        allFDG[i].style.height = `${80 * secAllFDG.clientHeight / 100}px`;
        allFDG[i].style.width = `${(80 * secAllFDG.clientHeight / 100) * 3 / 3.75}px`;
        const copertinaFDG = generaElemento('div', 'class', 'copertinaFDG', allFDG[i]);
        copertinaFDG.style.backgroundImage = `url(${arrFDG[i].copertina})`;

        const descrAllFDG = generaElemento('div', 'class', 'descrAllFDG', allFDG[i]);
        const descAllFDGTitle = generaElemento('h3', 'id', 'descAllFDGTitle', descrAllFDG);
        descAllFDGTitle.innerHTML = arrFDG[i].titolo;

        if(descAllFDGTitle.clientWidth > descrAllFDG.clientWidth - 20){
            let pxTranslate = descAllFDGTitle.clientWidth - descrAllFDG.clientWidth + 15;
            const keyTicker = `
                @keyframes tickerAllFilm${i}{
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
            const stile = document.getElementById('keyAllFDG');
            stile.textContent += keyTicker;
            descAllFDGTitle.style.animationName = `tickerAllFilm${i}`;
            descAllFDGTitle.style.animationDuration = `${(descAllFDGTitle.clientWidth - descrAllFDG.clientWidth + 20) / 22.8}s`;
            descAllFDGTitle.style.animationTimingFunction = 'linear';
            descAllFDGTitle.style.animationIterationCount = 'infinite';
        }
        
        const descAllFDGUndertitle = generaElemento('div', 'class', 'descAllFDGUndertitle', descrAllFDG); 
        
        let datiFDG = [];
        datiFDG.push(arrFDG[i].anno);
        let arrDurata = [];
        for(let j = 0; j < arrFDG[i].durata.length; j++){
            if(!((arrFDG[i].durata[j] >= 'a' && arrFDG[i].durata[j] <= 'z') || (arrFDG[i].durata[j] >= 'A' && arrFDG[i].durata[j] <= 'Z'))){
                arrDurata.push(arrFDG[i].durata[j]);
            }
        }
        let ore;
        let min = [];
        for(let j = 0; j < arrDurata.length; j++){
            if(arrDurata[j] != ' '){
                ore = arrDurata[j];
                arrDurata.splice(j, 1);
                break;
            }
        }
        for(let j = 0; j < arrDurata.length; j++){
            if(arrDurata[j] != ' ' && arrDurata[j] != '0'){
                min.push(arrDurata[j]);
            }
        }

        datiFDG.push(`${ore}h ${min.join('')}m`);
        datiFDG.push(`${arrFDG[i].rating % 1 == 0 ? `${arrFDG[i].rating}.0` : arrFDG[i].rating}/10`);
        descAllFDGUndertitle.innerHTML = datiFDG.join(' | ');
        const descAllFDGGeneri = generaElemento('div', 'class', 'descAllFDGGeneri', descrAllFDG); 
        descAllFDGGeneri.innerHTML = `${arrFDG[i].genere.join(', ')}.`;
        const salvaPreferiti = generaElemento('img', 'class', 'salvaPreferiti', allFDG[i]); 
        if(setFilmPref.has(arrFDG[i].titolo)){
            likedImg = true;
            salvaPreferiti.src = '/image/liked.png';
        }else{
            likedImg = false;
            salvaPreferiti.src = '/image/like_vuoto.png';
        }
        salvaPreferiti.addEventListener('click', ()=>{
            if(likedImg){
                salvaPreferiti.src = '/image/like_vuoto.png';
                likedImg = false;
                if(setFilmPref.has(arrFDG[i].titolo)){
                    setFilmPref.delete(arrFDG[i].titolo);
                }
            }else{
                salvaPreferiti.src = '/image/liked.png';
                likedImg = true;
                if(!(setFilmPref.has(arrFDG[i].titolo))){
                    setFilmPref.add(arrFDG[i].titolo);
                }
            }
            localStorage.removeItem('filmPreferiti');
            localStorage.setItem('filmPreferiti', Array.from(setFilmPref));
        })
        copertinaFDG.addEventListener('click', ()=>{
            console.log(allFDG);
            for(let k = 0; k < filmJSON.length; k++){
                if(filmJSON[k] == arrFDG[i]){
                    apriPagina('focus.html', k);
                    break
                }
            }
        });
        descrAllFDG.addEventListener('click', ()=>{
            console.log(allFDG);
            for(let k = 0; k < filmJSON.length; k++){
                if(filmJSON[k] == arrFDG[i]){
                    apriPagina('focus.html', k);
                    break
                }
            }
        });
    }

    const slogan = document.querySelector('.slogan');

    const callbackSlogan = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                slogan.style.fontSize = '50px';
                observer.unobserve(entry.target);
            }
        });
    };
    const observerSlogan = new IntersectionObserver(callbackSlogan, opzioni);
    observerSlogan.observe(slogan);

    // TUTTI I FILM
    let arrAllGeneri = new Set();
    for(let i = 0; i < filmJSON.length; i++) {
        for(let j = 0; j < filmJSON[i].genere.length; j++){
            arrAllGeneri.add(filmJSON[i].genere[j]);
        }
    }
    arrAllGeneri = Array.from(arrAllGeneri);

    function generaFilm(numFilm, parentFilm){
        const film = generaElemento('div', 'class', 'film', parentFilm); 
        film.style.height = `${80 * secAllFDG.clientHeight / 100}px`;
        film.style.width = `${(80 * secAllFDG.clientHeight / 100) * 3 / 3.75}px`;
        const copertina = generaElemento('div', 'class', 'copertina', film);
        
        const opzioni = {
            root: null,
            rootMargin: '0px',
            threshold: 0.01 
        };
        
        const callbackFilm = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    copertina.style.backgroundImage = `url(${filmJSON[numFilm].copertina})`;
                    observer.unobserve(entry.target);
                }
            });
        };
    
        const observerFilm = new IntersectionObserver(callbackFilm, opzioni);
    
        observerFilm.observe(film);


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
        if(setFilmPref.has(filmJSON[numFilm].titolo)){
            likedImg = true;
            salvaPreferiti.src = '/image/liked.png';
        }else{
            likedImg = false;
            salvaPreferiti.src = '/image/like_vuoto.png';
        }
        salvaPreferiti.addEventListener('click', ()=>{
            if(likedImg){
                salvaPreferiti.src = '/image/like_vuoto.png';
                likedImg = false;
                if(setFilmPref.has(filmJSON[numFilm].titolo)){
                    setFilmPref.delete(filmJSON[numFilm].titolo);
                }
            }else{
                salvaPreferiti.src = '/image/liked.png';
                likedImg = true;
                if(!(setFilmPref.has(filmJSON[numFilm].titolo))){
                    setFilmPref.add(filmJSON[numFilm].titolo);
                }
            }
            localStorage.removeItem('filmPreferiti');
            localStorage.setItem('filmPreferiti', Array.from(setFilmPref));
        })
        copertina.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
        descrAll.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
    }   
    for(let i = 0; i < arrAllGeneri.length; i++){
        const contGenere = generaElemento('div', 'class', 'contGenere', document.body); 
        if(i == 0){
            contGenere.setAttribute('id', 'contGenere0')
        }
        if(i == 0){
            contGenere.style.borderTop = '5px solid var(--giallo)';
        }
        if(i == arrAllGeneri.length - 1){
            contGenere.style.borderBottom = '5px solid var(--giallo)';
        }
        const titleGenere = generaElemento('span', 'class', 'titleGenere', contGenere);
        titleGenere.innerHTML = arrAllGeneri[i];
        const contLeftArrow = generaElemento('div', 'class', 'contLeftArrow', contGenere);
        const leftArrowFilm = generaElemento('img', 'class', 'leftArrowFilm', contLeftArrow);
        leftArrowFilm.src = `image/left-arrow.png`;
        let totTransl = 0;
        leftArrowFilm.addEventListener('click', ()=>{
            if(totTransl > 0){
                totTransl -= window.innerWidth * 25 / 100;
            }else{
                totTransl = 0;
            }
            contFilm.style.transform = `translateX(-${totTransl}px)`;
        })
        const mainContFilm = generaElemento('div', 'class', 'mainContFilm', contGenere);
        const contFilm = generaElemento('div', 'class', 'contFilm', mainContFilm);
        const contRightArrow = generaElemento('div', 'class', 'contRightArrow', contGenere);
        const rightArrowFilm = generaElemento('img', 'class', 'rightArrowFilm', contRightArrow);
        rightArrowFilm.src = `image/right-arrow.png`;
        contRightArrow.addEventListener('click', ()=>{
            totTransl += window.innerWidth * 25 / 100;
            if(totTransl > contFilm.clientWidth - mainContFilm.clientWidth){
                totTransl = contFilm.clientWidth - mainContFilm.clientWidth;
            }
            contFilm.style.transform = `translateX(-${totTransl}px)`;
        })
        let presente = false;
        for(let j = 0; j < filmJSON.length; j++){
            for(let k = 0; k < filmJSON[j].genere.length; k++){
                if(filmJSON[j].genere[k] == arrAllGeneri[i]){
                    presente = true;
                    break;
                }
            }
            if(presente){
                generaFilm(j, contFilm);
            }
            presente = false;
        }
    }
    // PULSANTE TORNA SU
    const contBtnTornaSu = document.getElementById('contBtnTornaSu');
    document.body.removeChild(contBtnTornaSu);
    document.body.appendChild(contBtnTornaSu);

    //FOOTER
    const footer = document.getElementById('footer');
    document.body.removeChild(footer);
    document.body.appendChild(footer);
}).catch((error) => {
    console.error('Error:', error);
})
const nav = document.querySelector('nav');
const secFDG = document.getElementById('secFilmDelGiorno');
secFDG.style.height = `${window.innerHeight - nav.clientHeight}px`;