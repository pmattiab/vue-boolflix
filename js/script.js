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
            langList: ["de", "en", "es", "fr", "it", "ja", "ko", "pt"],
            noResult: false
        },

        // methods (funzioni)
        methods: {

            // funzione che ricerca i risultati dalla API
            // sia con il tasto Cerca e con il tasto Enter della tastiera
            searchTitle() {

                // se l'utente non inserisce nulla
                if (this.userFilter == 0) {
                
                    // azzero l'array degli oggetti movie da visualizzare
                    this.movies = [];
                
                  // altrimenti
                } else {

                    // azzero l'array degli oggetti movie da visualizzare
                    this.movies = [];

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
                            let resultObj = response.data;

                            // se è stato trovato almeno 1 risultato
                            if (resultObj.results.length > 0) {

                                // richiamo la funzione per ottenere dettagli
                                // sugli oggetti dell'array ottenuto dalla ricerca 
                                this.getMoviesDetails(resultObj.results);

                              // altrimenti
                            } else {

                                // "Nessun risultato" diventa true
                                this.noResult = true;
                            }
                        })
                }
            },

            // funzione per ottenere i dettagli sugli oggetti dell'array
            getMoviesDetails(movieArray) {

                // tramite filter() ritorno nel mio movieArray solo gli oggetti
                // come film e serie tv (media type == "movie" o "tv")
                movieArray = movieArray.filter((element) => {
                    return element.media_type == "movie" || element.media_type == "tv";
                })

                // se l'array dopo il filtro ha almeno 1 risultato
                if (movieArray.length > 0) {

                    // ciclo forEach sugli elementi dell'array
                    movieArray.forEach(element => {

                    // trasformo il voto in numero da 1 a 5 (arrotondando per eccesso)
                    element.vote_average = Math.ceil(element.vote_average / 2);

                    // "taglio" la trama fino a 250 caratteri ed aggiungo "..."
                    if (element.overview.length >= 251) {
                        element.overview = element.overview.slice(0, 250) + "...";
                    }

                    axios
                        // chiamo l'api con i parametri per vedere i singoli dettagli del film o della serie
                        .get("https://api.themoviedb.org/3/" + element.media_type + "/" + element.id, {
                            params: {
                                api_key: this.apiKey,
                                language: this.lang,
                                append_to_response: "credits"
                            }
                        })

                        // poi...
                        .then((response) => {
                            
                            // aggiungo agli oggetti cliclati sia i generi che il cast
                            element.genres = response.data.genres;
                            element.actors = response.data.credits.cast.splice(0, 5);
                            
                            // infine pusho l'oggetto completo nell'array movie da visualizzare in HTML
                            this.movies.push(element);
                        });
                    })

                  // altrimenti
                } else {

                    // "Nessun risultato" diventa true
                    this.noResult = true;
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