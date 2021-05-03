// var per vue js
var app = new Vue(
    {
        // elemento con id root
        el: "#root",

        // data
        data: {
            movies: [],
            userFilter: "",
            apiKey: "5ec9dfa6d5191b1fbf1b3bf213cbe799",
            lang: "it-IT",
            langList: ["de", "en", "es", "fr", "it", "ja", "ko", "nl", "pt"]
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

                    // chiamata api multi per cercare film e serie tv
                    axios
                        .get("https://api.themoviedb.org/3/search/multi", {
                            
                            // impostando i parametri, passandoli dalle variabili in data
                            params: {
                                api_key: this.apiKey,
                                query: this.userFilter,
                                language: this.lang
                            }
                        })

                        // quindi ottengo il risultato response che sarà un oggetto
                        .then((response) => {

                            // variabile resultObj uguale al valore .data dell'oggetto "response" ottenuto
                            const resultObj = response.data;

                            // tramite filter() ritorno nel mio array movies solo gli oggetti
                            // come film e serie tv (media type == "movie" o "tv")
                            this.movies = resultObj.results.filter((element) => {
                                return element.media_type == "movie" || element.media_type == "tv";
                            })

                            // richiamo la funzione per aggiungere agli elementi
                            // dell'array movie i generi e gli attori
                            this.addGenresActors(resultObj.results);

                            // ciclo forEach su tutti i risultati (oggetti)
                            this.movies.forEach(element => {

                                // per trasformare il voto in numero da 1 a 5 (arrotondando per eccesso)
                                element.vote_average = Math.ceil(element.vote_average / 2);

                                // per "tagliare" la trama fino a 200 caratteri ed aggiungere "..."
                                if (element.overview.length > 199) {
                                    element.overview = element.overview.slice(0, 200) + "...";
                                }
                            });

                        })
                }
            },

            // funzione per aggiungere agli elementi dell'array movies
            // i generi e gli attori
            addGenresActors(movieArray) {

                movieArray.forEach(movie => {

                    // chiamata api per vedere i singoli dettagli del film o della serie
                    axios
                    .get("https://api.themoviedb.org/3/" + movie.media_type + "/" + movie.id, {
                        params: {
                            api_key: this.apiKey,
                            language: this.lang,
                            append_to_response: "credits"
                        }
                    })

                    // ottengo per ogni elemento un array, contenente i generi e gli attori
                    .then((response) => {
                        movie.genres = response.data.genres;
                        movie.actors = response.data.credits.cast;
                        this.movies = movieArray;
                    });
                });
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