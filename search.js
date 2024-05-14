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
    const searchBar = document.getElementById('searchBar');
    const lente = document.getElementById('lente');
    const contSuggeriti = document.getElementById('suggeriti');

    function pulisciStringa(stringa){
        return stringa.toLowerCase().replace(/[ :,.]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    let titoliFilm = filmJSON.map(function(film) {
        return pulisciStringa(film.titolo);
    });

    searchBar.addEventListener('input', ()=>{
        while(contSuggeriti.firstChild){
            contSuggeriti.removeChild(contSuggeriti.firstChild);
        }
        let suggeriti = [];
        let valRicercato = pulisciStringa(searchBar.value);
        for(let i = 0; i < titoliFilm.length; i++){
            let uguale = true;
            for(let j = 0; j < valRicercato.length; j++){
                if(valRicercato[j] != titoliFilm[i][j]){
                    uguale = false;
                    break;
                }
            }
            if(uguale && valRicercato != ''){
                suggeriti.push(filmJSON[i].titolo);
                if(suggeriti.length == 5){
                    break;
                }
            }
        }
        let dimensioni = 0;
        for(let i = 0; i < suggeriti.length; i++){
            let elemSuggerito = generaElemento('div', 'id', `elemSuggerito${i+1}`, contSuggeriti);
            elemSuggerito.innerHTML = suggeriti[i];
            dimensioni += elemSuggerito.offsetHeight;
            let numFilm;
            for(let j = 0; j < filmJSON.length; j++){
                if(suggeriti[i] == filmJSON[j].titolo){
                    numFilm = j;
                    break;
                }
            }
            elemSuggerito.addEventListener('click', ()=>{
                searchBar.value = '';
                apriPagina('focus.html', numFilm);
            });
        }
        contSuggeriti.style.bottom = `-${dimensioni}px`
        searchBar.addEventListener('keydown', (event)=>{
            if(event.key === 'Enter'){
                searchBar.value = '';
                let numFilm;
                for(let j = 0; j < filmJSON.length; j++){
                    if(suggeriti[0] == filmJSON[j].titolo){
                        numFilm = j;
                        break;
                    }
                }
                apriPagina('focus.html', numFilm);
            }
        });
        lente.addEventListener('click', ()=>{
            searchBar.value = '';
            let numFilm;
            for(let j = 0; j < filmJSON.length; j++){
                if(suggeriti[0] == filmJSON[j].titolo && suggeriti[0]){
                    numFilm = j;
                    break;
                }
            }
            apriPagina('focus.html', numFilm);
        });
    });
}).catch((error)=>{
    console.error('Error:', error);
})

const navSearch = document.querySelector('nav');
if(window.scrollY > 0){
    navSearch.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
}else{
    navSearch.style.backgroundColor = '#ffbd00';
}

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 0){
        navSearch.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
    }else{
        navSearch.style.backgroundColor = '#ffbd00'
    }
});

navSearch.addEventListener('mouseout', ()=>{
    if(window.scrollY > 0){
        navSearch.style.backgroundColor = 'rgba(255, 187, 0, 0.5)';
    }
});
navSearch.addEventListener('mouseover', ()=>{
    if(window.scrollY > 0){
        navSearch.style.backgroundColor = '#ffbd00';
    }
});

const btnAccedi = document.querySelector('.btnAccedi');
btnAccedi.addEventListener('click', ()=>{
    window.location.href = 'accedi.html';
})