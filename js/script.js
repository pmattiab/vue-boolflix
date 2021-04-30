// var per vue js
var app = new Vue(
    {
        // elemento con id root
        el: "#root",

        // data
        data: {
            movies: [],
            userFilter: "",
        },

        // methods (funzioni)
        methods: {

            // funzione che ricerca i risultati dalla API
            // sia con il tasto Cerca e con il tasto Enter della tastiera
            searchTitle() {

                // se l'utente non inserisce nulla
                if (this.userFilter == 0) {
                
                    this.movies = [];
                
                  // altrimenti
                } else {

                    // chiamata ajax multi per cercare film e serie tv
                    axios
                        .get("https://api.themoviedb.org/3/search/multi", {
                            
                            // impostando i parametri
                            params: {

                                // key necessaria per fare la chiamata
                                api_key: "5ec9dfa6d5191b1fbf1b3bf213cbe799",
                                
                                // query necesseria, che sarà una stringa inseria dall'utente
                                query: this.userFilter,
                                
                                // lingua opzionale
                                language: "it-IT"
                            }
                        })

                        // quindi ottengo il risultato response che sarà un oggetto
                        .then((response) => {

                            // variabile result uguale al valore .data dell'oggetto "response" ottenuto
                            const result = response.data;

                            // ciclo forEach su tutti i risultati (oggetti) per dividere in 2
                            // il numero della valutazione ed arrotondarlo per eccesso
                            // e per "tagliare" la trama fino a 200 caratteri ed aggiungere "..."
                            result.results.forEach(element => {
                                element.vote_average = Math.ceil(element.vote_average / 2);
                                element.overview = element.overview.slice(0, 200);
                                if (element.overview.length > 199) {
                                    element.overview += "...";
                                }
                            });

                            // tramite filter() ritorno nel mio array movies solo gli oggetti
                            // come film e serie tv (media type == "movie" o "tv")
                            this.movies = result.results.filter((element) => {
                                return element.media_type == "movie" || element.media_type == "tv";
                            })
                        })
                }
            }
        },

        // funzioni in created che partono dopo il caricamento dell'HTML
        // prima di quelle in mounted
        created() {},

        // funzioni in mounted che partono dopo il caricamento dell'HTML
        // dopo di quelle in created
        mounted() {}
    }
);