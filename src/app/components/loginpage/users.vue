<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MOVIE INFO.COM</a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="login">
                                <div class="form-group">
                                    <input type="text" v-model="user.user"
                                        placeholder="Ingrese Usuario"
                                        class="form-control">
                                </div>

                                <div class="form-group">
                                    <input type="password" v-model="user.password"
                                        placeholder="Ingrese Contraseña"
                                        class="form-control">
                                </div>
                                <div>
                                    <button class="btn btn-primary btn-block">Log In</button>
                                    <button class="btn btn-primary btn-block">Log Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <template>
                        <img height="300" width="300">
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    class User {
        constructor(name,lastname,user,password){
            this.name=name,
            this.lastname=lastname,
            this.user = user;
            this.password = password;
        }
    }
    
    export default {
        data(){
            return{
                user: new User(),
            }
        },
        created(){

            console.log(process.env.BASE_URL)

        },
        methods:{
            login(){
                var query = `/api/users/${this.user.user}/${this.user.password}`;
                fetch(query)
                    .then(res=>res.json())
                    .then(data=>{
                        const n=data.length
                        if(n>0){
                            console.log("ACCESS CORRECT")
                            window.open(`http://localhost:3000/movieinfo.html?${data[0].name}-${data[0].lastname}`);                         
                        }else{
                            console.log("ACCESS DENIED") 
                        }
                    });
            }
        }
    }

</script>