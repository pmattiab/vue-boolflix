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
                
                    // esce l'alert che lo avvisa
                    alert("Non hai inserito nessun titolo")
                
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

                            // e rendo il mio array dei film uguale all'array dei risultati ottenuti dal valore response nell'oggetto result
                            this.movies = result.results;

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