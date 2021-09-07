<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MOVIE INFO.COM</a>
            <div class="container">
                <div class="form-group">
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control">
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">

                                <div class="form-group">
                                    <input type="text" v-model="movie.original_title"
                                        placeholder="Título Original de la Película"
                                        class="form-control">
                                </div>

                                <div class="form-group">
                                    <input type="text" v-model="movie.title"
                                        placeholder="Título Local"
                                        class="form-control">
                                </div>

                                <div class="form-group">
                                    <textarea cols="30" rows="3" type="text" v-model="movie.overview"
                                        placeholder="Sinopsis"
                                        class="form-control"></textarea>
                                </div>

                                <div>
                                    <label>Fecha Estreno:</label>
                                    <input type="date" v-model="movie.release_date">
                                </div>

                                <div class="form-group">
                                    <input type="text" v-model="movie.backdrop_path"
                                        placeholder="Nombre del Cartel"
                                        class="form-control">
                                </div>

                                <div class="form-group">
                                    <input type="text" v-model="movie.id"
                                        placeholder="Ingrese un Id"
                                        class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="scales">Es Para Adultos ?</label>
                                    <input type="checkbox" id="scales" name="scales" v-model="movie.adult">
                                </div>

                                <div class="form-group">
                                    <label for="scales">Lenguaje Original</label>
                                </div>

                                <div class="form-group">
                                    <select v-model="movie.original_language">
                                        <option value="en">en</option>
                                        <option value="es">es</option>
                                        <option value="fr">fr</option>
                                        <option value="gr">gr</option>
                                        <option value="jp">jp</option>
                                        <option value="kr">kr</option>
                                        <option value="ch">ch</option>
                                        <option value="it">it</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="scales">Tiene Trailer ?</label>
                                    <input type="checkbox" id="scales" name="scales" v-model="movie.video">
                                </div>
                                
                                <template v-if="edit===false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>

                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Poster</th>
                                <th>Película</th>
                                <th>Sinopsis</th>
                                <th>Fecha Estreno</th>
                                <th>Trailer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="peli of movies">
                                <td>
                                    <img v-bind:src="`https://image.tmdb.org/t/p/w500/${peli.poster_path}`" height="200" width="150">
                                </td>
                                <td>{{peli.title}}</td>
                                <td>{{peli.overview}}</td>
                                <td>{{peli.release_date}}</td>
                                <td>
                                    <button @click="watchTrailer(peli.id)" class="btn btn-danger">Ver Trailer</button>
                                </td>
                                <td>
                                    <button @click="getOneTask(peli.id)" class="btn btn-danger">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import users from "D:/Ciclo3/Proyecto/src/app/components/loginpage/users.vue"

    class Movie {
        constructor(adult,backdrop_path,genre_ids,id,original_language,original_title,overview,popularity,
                    poster_path,release_date,title,video,vote_average,vote_count){
            this.adult = adult;
            this.backdrop_path = backdrop_path;
            this.genre_ids = genre_ids;
            this.id = id;
            this.original_language = original_language;
            this.original_title = original_title;
            this.overview = overview;
            this.popularity = popularity;
            this.poster_path = poster_path;
            this.release_date = release_date;
            this.title = title;
            this.video = video;
            this.vote_average = vote_average;
            this.vote_count = vote_count;
        }
    }

    class Trailer{
        constructor(id,results){
            this.id = id;
            this.results = results;
            this.movieId = '';
        }
    }
    
    export default {
        data(){
            return{
                movie: new Movie(),
                movies: [],
                trailers: new Trailer(),
                edit: false,
                idMovie: ''
            }
        },
        components(){
            users
        },
        created(){
            this.getTasks();
        },
        methods:{
            sendTask(){
                if(this.edit===false){
                    fetch('/api/tasks',{
                        method: 'POST',
                        body: JSON.stringify(this.movie) ,
                        headers:{
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
                        this.getTasks();
                    })
                }else{
                    var query = `/api/tasks/${this.idMovie}`;
                    fetch(query,{
                        method: 'PUT',
                        body: JSON.stringify(this.movie) ,
                        headers:{
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
                        this.getTasks();
                        this.edit=false;
                    })
                }
            },
            getTasks(){
                fetch('/api/tasks')
                    .then(res=>res.json())
                    .then(data=>{
                        this.movies = data
                        console.log(this.movies)
                        console.log(users.user.name)
                    });
            },
            getOneTask(id){
                var query = `/api/tasks/${id}`;
                fetch(query)
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
                        const dato = data[0]
                        console.log(dato)
                        this.idMovie = dato._id
                        this.edit = true
                        console.log(this.idMovie)
                        this.movie = new Movie(dato.adult,dato.backdrop_path,dato.genre_ids,dato.id,dato.original_language,dato.original_title,dato.overview,dato.poster_path,dato.poster_path,dato.release_date,dato.title,dato.video,dato.vote_average,dato.vote_count)
                        console.log(this.movie)             
                    });
            },
            watchTrailer(id){
                var query = `/api/extradata/videos/${id}`;
                fetch(query)
                    .then(res=>res.json())
                    .then(data=>{
                        this.trailers = data
                        this.trailers.movieId = this.trailers.results[0].key
                        console.log(this.trailers.movieId)
                    });                               
            }
        }
    }
</script>
