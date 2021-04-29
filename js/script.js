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

            // ritorno al fut
            searchTitle() {

                if (this.userFilter == 0) {
                
                    alert("Non hai inserito nessun titolo")
                
                } else {

                    axios
                        .get("https://api.themoviedb.org/3/search/movie", {
                            params: {
                                api_key: "5ec9dfa6d5191b1fbf1b3bf213cbe799",
                                query: this.userFilter,
                                language: "it-IT"
                            }
                        })
                        .then((response) => {

                            const result = response.data;

                            this.movies = result.results;

                        })

                }

                

            }

        },

        created() {},

        // funzioni in mounted che partono dopo il caricamento dell'HTML
        mounted() {}
    }
);