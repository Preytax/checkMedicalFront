<template>
    <!-- ======= Top Bar ======= -->
    <Inc_top_bar/>
    <!-- ======= Header ======= -->
    <Inc_nav/>
  
    <main id="main">
  
      <!-- ======= Breadcrumbs Section ======= -->
        <section class="breadcrumbs mt-5">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <h2>Crear Ambiente</h2>
                    <ol>
                        <li>
                        <router-link to="/home">
                            <a href="#"><span class="d-md-inline">Inicio</span></a>
                        </router-link>
                        </li>
                        <li>Crear Ambiente</li>
                    </ol>
                </div>
            </div>
        </section><!-- End Breadcrumbs Section -->
  
        <section class="inner-page">
            <div class="container">
                <div class="row g-3">
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Nombre de Ambiente</label>
                        <input type="text" class="form-control" id="ambiente" placeholder="" maxlength="45" v-model="ambiente" required/>
                        <div ref="ambiente" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            El nombre es obligatorio.
                        </div>
                    </div>
                    <hr class="my-4">
                    <a class="w-100 btn btn-primary btn-lg" @click="addAmbiente" href="#">Registrar</a>
                </div>
            </div>
        </section>
    </main><!-- End #main -->
  
    <div id="preloader" class="d-none"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </template>
  
  <script>
    import Inc_nav from "../inc/Inc_nav";
    import Inc_top_bar from "../inc/Inc_top_bar";
  
    var axios = require('axios');
    var error = 0;

    export default {
        beforeRouteEnter(to, from, next) {
            // Verificar si la variable de sesión existe
            if (!localStorage.getItem('id')) {
                // Redirigir a la página de inicio de sesión
                next('/');
            } else if(localStorage.getItem('id_perfil') != 1){
                next('/');
            } else {
                next();
            }
        },
        inject: ['BASE_URL_AXIOS','BASE_URL'],
        name: "inc_head",
        components:{
        Inc_top_bar,
        Inc_nav
        },
        data() {
        return {
            stg_id: localStorage.getItem("id"),
            ambiente: null,
        };
        },
        mounted() {
        },
        methods: {
            async addAmbiente(){
                Object.keys(this.$refs).forEach((refKey) => {
                    const elements = this.$refs[refKey];
                    if (!Array.isArray(elements)) {
                        elements.classList.remove("mostrarObligatorio");
                    }
                });
                
                if (this.ambiente == null || this.ambiente == "") {
                    this.$refs.ambiente.classList.add("mostrarObligatorio");
                    error = 1;
                }

                if(error == 0){
                    const newAmbiente = {
                        ambiente        : this.ambiente,
                        usuarioRegistra : this.stg_id,
                    };

                    const request = await axios({
                        method: "POST",
                        url: this.BASE_URL_AXIOS + "saveAmbiente",
                        data: newAmbiente,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    
                    var arreglo =  request.data.split("|");

                    if(arreglo[0] == "OK")
                    {
                        this.valorAlerta = arreglo[1];
                        this.showAlert = true;
                        setTimeout(() => {
                            location.reload();
                        }, 1000);

                    }else{
                        this.valorAlerta = arreglo[1];
                        this.showAlert = true;
                    }
                }
            }
        }
    }
</script>