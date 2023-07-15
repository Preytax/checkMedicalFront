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
                    <h2>Registrar Clinica</h2>
                    <ol>
                        <li>
                        <router-link to="/home">
                            <a href="#"><span class="d-md-inline">Inicio</span></a>
                        </router-link>
                        </li>
                        <li>Registrar Clinica</li>
                    </ol>
                </div>
            </div>
        </section><!-- End Breadcrumbs Section -->

        <section class="inner-page">
            <div class="container">
                <button class="btn btn-primary btn-lg d-table mb-4" @click="btnMasivo()">
                    <img class="img_import" src="../../assets/iconos/cargaMasiva.svg" alt="">
                    Carga Masiva
                </button>
                <div class="row g-3">
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Nombre de Clinica</label>
                        <input type="text" class="form-control" id="clinica" placeholder="" maxlength="45" v-model="clinica" required/>
                        <div ref="clinica" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            El nombre es obligatorio.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Direcci&oacute;n</label>
                        <input type="text" class="form-control" id="direccion" placeholder="" maxlength="45" v-model="direccion" required/>
                        <div ref="direccion" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La direcci&oacute;n es obligatoria.
                        </div>
                    </div>
                    <hr class="my-4">
                    <button class="w-100 btn btn-primary btn-lg" @click="addClinica()">Registrar</button>
                </div>
            </div>
        </section>
    </main><!-- End #main -->
    <div :class="showMasivo == true ? 'd-block' : 'd-none'" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Carga Masiva</h5>
                    <button @click="btnMasivo()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        
                        <div>
                            <!-- <label for="formFileLg" class="form-label">Large file input example</label> -->
                            <input ref="archivoMasivo" class="form-control form-control-lg" type="file" accept=".xlsx, .xls" @change="handleFileChange" />
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="btnMasivo()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="uploadFile()" class="btn btn-success">Registrar</button>
                </div>
            </div>
        </div>
    </div>
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
            } else if(localStorage.getItem('id_perfil') != 2){
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
                clinica: null,
                direccion: "",
                showAlert: false,
                valorAlerta: "",
                showMasivo: false,
                idAmbiente  : localStorage.getItem("id_ambiente"),
                idSede      : localStorage.getItem("id_sede"),
            };
        },
        mounted() {
        },
        methods: {
            btnMasivo(){
                if(this.showMasivo == false){
                    this.showMasivo = true;
                } else {
                    this.showMasivo = false;
                }
            },
            handleFileChange(event) {
                this.file = event.target.files[0];
            },
            async uploadFile() {
                if(this.$refs.archivoMasivo.value != ""){
                    this.preloader = true;
                    this.formData = new FormData();
                    this.formData.append('file', this.file);

                    // Realiza la solicitud POST para enviar el archivo al backend
                    const response = await axios({
                        method: "POST",
                        url: this.BASE_URL_AXIOS + "saveClinicaMasivo/" + this.idAmbiente+"/" + this.idSede,
                        data: this.formData,
                        headers: {
                            "Content-Type": "file"
                        }
                    })

                    this.btnMasivo();
                    if (response.data == true){
                        this.showTextoMasivo = "Se registraron las clinicas correctamente.";
                        this.classAlert = 1;
                    } else {
                        this.showTextoMasivo = "Hubo un error al cargar los registros.";
                        this.classAlert = 2;
                    }

                    this.$refs.archivoMasivo.value = '';
                    this.preloader = false;
                    this.showErrorMasivo = true;
                    setTimeout(() => {
                        this.showErrorMasivo = false;
                    }, 2500);
                }
            },
            async addClinica(){
                Object.keys(this.$refs).forEach((refKey) => {
                    const elements = this.$refs[refKey];
                    if (!Array.isArray(elements)) {
                        elements.classList.remove("mostrarObligatorio");
                    }
                });
                
                if (this.clinica == null || this.clinica == "") {
                    this.$refs.clinica.classList.add("mostrarObligatorio");
                    error = 1;
                }

                if (this.direccion == null || this.direccion == "") {
                    this.$refs.direccion.classList.add("mostrarObligatorio");
                    error = 1;
                }

                if(error == 0){
                    const newClinica = {
                        clinica         : this.clinica,
                        direccion       : this.direccion,
                        usuarioRegistra : this.stg_id,
                    };

                    const request = await axios({
                        method: "POST",
                        url: this.BASE_URL_AXIOS + "saveClinica",
                        data: newClinica,
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