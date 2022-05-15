const usingApi = {
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
                console.log(data);
                console.log(data[7]['attributes']['coverImage']['tiny']);

                const body = document.querySelector('.test');

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

document.addEventListener('DOMContentLoaded', usingApi.loadTaskFromApi());