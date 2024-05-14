fetch('news.json').then((response)=>{
    if(!response.ok){
        throw new Error(`Error during fetching: ${response.status}`);
    }
    return response.json();
}).then((notizieJSON)=>{
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
    const notizie = notizieJSON.notizie_cinema;
    const main = document.querySelector('main');

    function creaNotizia(notizia){
        const contNotizia = generaElemento('div', 'class', 'contNotizia', main);
        const leftSide = generaElemento('div', 'class', 'leftSide', contNotizia);
        const rightSide = generaElemento('div', 'class', 'rightSide', contNotizia);
        const imgCopertina = generaElemento('div', 'class', 'imgCopertina', rightSide);
        imgCopertina.style.backgroundImage = `url(${notizia.foto})`;
        const titoloNotizia = generaElemento('h1', 'class', 'titoloNotizia', leftSide);
        titoloNotizia.innerHTML = notizia.titolo;
        const descNotizia = generaElemento('p', 'class', 'descNotizia', leftSide);
        descNotizia.innerHTML = notizia.descrizione;
        const btnContinua = generaElemento('button', 'class', 'btnContinua bottone', leftSide);
        btnContinua.innerHTML = 'Continua a leggere';
        btnContinua.addEventListener('click', ()=>{

        });
    }

    for(notizia of notizie){
        creaNotizia(notizia);
    }

    const scritta = document.querySelector('.scrittaFinale')
    const opzioni = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };
    
    const callbackScritta = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                scritta.style.fontSize = '60px';
                scritta.style.letterSpacing = '3px';
                observer.unobserve(entry.target);
            }
        });
    };

    const observerScritta = new IntersectionObserver(callbackScritta, opzioni);

    observerScritta.observe(scritta);
}).catch((error)=>{
    console.error('Error:', error);
});