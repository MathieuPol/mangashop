const usingApi = {

    init: function(){
        document.querySelector('#list').addEventListener("click", usingApi.handleList);
        document.querySelector('#home').addEventListener("click", usingApi.handleHome);
    },

    handleList: function(evt){
        //Ici je charge ma seconde page au click sur le lien
        document.querySelector('.home--content').classList.add('d-none');
        document.querySelector('.list--content').classList.remove('d-none');
        //ici je change le active sur les liens
        document.querySelector('#home').classList.remove('active');
        document.querySelector('#list').classList.add('active');
        //j'appelle mon api pour le chargement des données
        usingApi.loadTaskFromApi();

    },

    handleHome: function(evt){
        //Ici je charge ma seconde page au click sur le lien
        document.querySelector('.list--content').classList.add('d-none');
        document.querySelector('.home--content').classList.remove('d-none');
        //ici je change le active sur les liens
        document.querySelector('#list').classList.remove('active');
        document.querySelector('#home').classList.add('active');
    },

    loadTaskFromApi: function(){
        const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        const taskApi = fetch('https://kitsu.io/api/edge/manga?page[limit]=20', fetchOptions)

        taskApi.then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(jsonResponse)
            {
                let data = jsonResponse['data'];


                const body = document.querySelector('.list--content .api');
                //Je vide l'endroit où vont etre chargées les données
                body.innerHTML = "";
                //Je charge les données
                for (let index = 0; index < data.length; index++) {

                    const cardTpl = document.getElementById('cardTpl').content.cloneNode(true);
                    cardTpl.querySelector('.card-img-top').setAttribute('src', data[index]['attributes']['posterImage'].large);
                    
                    const newTitle = cardTpl.querySelector('.card-header h5');
                    newTitle.textContent = data[index]['attributes']['titles'].en
                    if(newTitle.textContent === "")
                    {
                        newTitle.textContent = "non publié en occident";
                    }

                    const newDescription = cardTpl.querySelector('.card-text');
                    newDescription.textContent = data[index]['attributes']['description']


                    body.append(cardTpl);

           //         img.setAttribute('src', data[index]['attributes']['posterImage'].large)
           //         document.querySelector('.test').append(newTpl);
           //         console.log(newTpl);


                }



            }
        )

   }
}
document.addEventListener('DOMContentLoaded', usingApi.init());
//document.addEventListener('DOMContentLoaded', usingApi.loadTaskFromApi());