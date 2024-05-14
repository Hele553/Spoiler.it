fetch('film.json').then((response)=>{
    if(!response.ok){
        throw new Error(`Error during fetching: ${response.status}`);
    }
    return response.json();
}).then((filmJSON)=>{
    function apriPagina(pagina, numero) {
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
            console.log(stile);
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
        likedImg = true;
        salvaPreferiti.src = '/image/liked.png';
        // salvaPreferiti.addEventListener('click', ()=>{
        //     if(likedImg){
        //         salvaPreferiti.src = '/image/like_vuoto.png';
        //         likedImg = false;
        //         // if(arrFilmPref.has(filmJSON[numFilm].titolo)){
        //         //     arrFilmPref.delete(filmJSON[numFilm].titolo);
        //         // }
        //     }else{
        //         salvaPreferiti.src = '/image/liked.png';
        //         likedImg = true;
        //         // if(!(arrFilmPref.has(filmJSON[numFilm].titolo))){
        //         //     arrFilmPref.add(filmJSON[numFilm].titolo);
        //         // }
        //     }
        //     // localStorage.removeItem('filmPreferiti');
        //     // localStorage.setItem('filmPreferiti', Array.from(arrFilmPref));
        // })
        copertina.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
        descrAll.addEventListener('click', ()=>{
            apriPagina('focus.html', numFilm);
        })
    }   
    
    const contFilm = generaElemento('dic', 'class', 'contFilm', document.body);
    const params = new URLSearchParams(window.location.search);
    let arrayIdxPref = params.get('numero').split('i');
    arrayIdxPref = arrayIdxPref.map(Number);
    console.log(arrayIdxPref);

    arrayIdxPref.forEach(idx => generaFilm(idx, contFilm));

    const contBtnTornaSu = document.getElementById('contBtnTornaSu');
    document.body.removeChild(contBtnTornaSu);
    document.body.appendChild(contBtnTornaSu);

    const footer = document.getElementById('footer');
    document.body.removeChild(footer);
    document.body.appendChild(footer);
}).catch((error)=>{
    console.error('Error:', error);
})