<template>
    <!-- ======= Top Bar ======= -->
    <Inc_top_bar/>
    <!-- ======= Header ======= -->
    <Inc_nav/>
    <div class="mp_row_Alert" v-if="showAlert">{{valorAlerta}}<i @click="hideAlert"></i></div>

    <main id="main">
      <!-- ======= Breadcrumbs Section ======= -->
      <section class="breadcrumbs mt-5">
        <div class="container">
  
          <div class="d-flex justify-content-between align-items-center">
            <h2>Registrar {{ stg_perfil == 3 ? "Trabajador" : (stg_perfil == 2 ? "Operador" : "Administrador") }}</h2>
            <ol>
              <li>
                <router-link to="/home">
                  <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Registrar {{ stg_perfil == 3 ? "Trabajador" : (stg_perfil == 2 ? "Operador" : "Administrador") }}</li>
            </ol>
          </div>
  
        </div>
      </section><!-- End Breadcrumbs Section -->

      <section class="inner-page">
        <div class="container">
            <div :class=" showErrorMasivo ? classAlert == 1 ? 'alert-success' : 'alert-danger' : 'd-none'" class="alert" role="alert">
                {{ showTextoMasivo }}
            </div>
            <button class="btn btn-primary btn-lg d-table mb-4" @click="btnMasivo()">
                <img class="img_import" src="../../assets/iconos/cargaMasiva.svg" alt="">
                Carga Masiva
            </button>
          <div class="row g-3">
              <div class="col-sm-6">
                  <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Nombre</label>
                  <input type="text" class="form-control" id="nombres" placeholder="" maxlength="45" v-model="nombres" required/>
                  <div ref="nombres" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                      El nombre es obligatorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="lastName" class="form-label" _msttexthash="112346" _msthash="29">Apellido Paterno</label>
                  <input type="text" class="form-control" id="apellidoPaterno" placeholder="" maxlength="45" v-model="apellidoPaterno" required/>
                  <div ref="apellidoPaterno" class="invalid-feedback" _msttexthash="592748" _msthidden="1" _msthash="30">
                      El apellido paterno es obligatorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Aapellido Materno</label>
                  <input type="text" class="form-control" id="apellidoMaterno" placeholder="" maxlength="45" v-model="apellidoMaterno" required/>
                  <div ref="apellidoMaterno" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                      El apellido materno es obligatorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Fecha de Nacimiento</label>
                  <input type="date" class="form-control" id="fechaNacimiento" placeholder="" v-model="fechaNacimiento" :max="maxDate" required/>
                  <div ref="fechaNacimiento" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                      La fecha de nacimiento es obligataoria.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="country" class="form-label" _msttexthash="60047" _msthash="42">Tipo de Documento</label>
                  <select class="form-select" id="tipoDocumento" outlined v-model="tipoDocumento">
                      <option value="" _msttexthash="101647" _msthash="43">Elegir...</option>
                      <option v-for="tipoDocumento in tiposDocumentos" :key="tipoDocumento.id" :value="tipoDocumento.id">{{tipoDocumento.documento}}</option>
                  </select>
                  <div ref="tipoDocumento" class="invalid-feedback" _msttexthash="685542" _msthidden="1" _msthash="45">
                      El tipo de documento es obligataorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Nro. de Documento</label>
                  <input type="text" class="form-control" id="nroDocumento" placeholder="" maxlength="8" v-model="nroDocumento" required/>
                  <div ref="nroDocumento" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                      El numero de documento es obligatorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="state" class="form-label" _msttexthash="76037" _msthash="46">Perfil</label>
                  <select class="form-select" id="idPerfil" v-model="idPerfil">
                      <option value="" selected>Elegir...</option>
                      <template v-for="perfil in perfiles">
                          <option  v-if="stg_perfil == 1 && perfil.id == 2" :key="perfil.id" :value="perfil.id">{{perfil.perfil}}</option>
                          <option  v-if="stg_perfil == 2 && perfil.id == 3" :key="perfil.id" :value="perfil.id">{{perfil.perfil}}</option>
                          <option  v-if="stg_perfil == 3 && perfil.id == 4" :key="perfil.id" :value="perfil.id">{{perfil.perfil}}</option>
                      </template>
                  </select>
                  <div ref="idPerfil" class="invalid-feedback" _msttexthash="631839" _msthidden="1" _msthash="49">
                      El tipo de perfil es obligatorio.
                  </div>
              </div>

              <template v-if="stg_perfil == 1">
                <div class="col-sm-6">
                  <label for="state" class="form-label" _msttexthash="76037" _msthash="46">Ambiente</label>
                  <select class="form-select" id="idAmbiente" v-model="idAmbiente">
                      <option value="" selected>Elegir...</option>
                      <template v-for="ambiente in ambientes" :key="ambiente.id">
                          <option :value="ambiente.id">{{ambiente.ambiente}}</option>
                      </template>
                  </select>
                  <div ref="idAmbiente" class="invalid-feedback" _msttexthash="631839" _msthidden="1" _msthash="49">
                      El ambiente es obligatorio.
                  </div>
                </div>
              </template>

              <div class="col-sm-6">
                  <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Direcci&oacute;n</label>
                  <input type="text" class="form-control" id="apellidoMaterno" placeholder="" maxlength="45" v-model="direccion" required/>
                  <div ref="direccion" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                      La direcci&oacute;n es obligataoria
                  </div>
              </div>
              
              <div class="col-sm-6">
                  <label for="username" class="form-label">Correo Electronico</label>
                  <div class="input-group has-validation">
                      <span class="input-group-text">@</span>
                      <input v-model="correo" type="email" class="form-control" id="correo" placeholder="Correo" maxlength="150" required="">
                      <div ref="correo" class="invalid-feedback">
                          El correo electronico es obligatorio.
                      </div>
                      <div ref="correoValido" class="invalid-feedback">
                          Ingrese un correo electronico valido.
                      </div>
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="email" class="form-label" _msttexthash="731406" _msthash="34">Contraseña <span class="text-body-secondary" _istranslated="1"></span></label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="**********"  maxlength="10" _mstplaceholder="274417" _msthash="35">
                  <div ref="password" class="invalid-feedback" _msttexthash="1993589" _msthidden="1" _msthash="36">
                      La contraseña es obligatoria.
                  </div>
              </div>
          </div>

          <hr class="my-4">
          <a class="w-100 btn btn-primary btn-lg" @click="addPersona" href="#">Registrar</a>
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
  
    <div id="preloader" :class="preloader == false ? 'd-none' : ''"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </template>
  
  <script>
  import Inc_nav from "../inc/Inc_nav";
  import Inc_top_bar from "../inc/Inc_top_bar";
  import CryptoJS from 'crypto-js';

  var axios = require('axios');
  var error = 0;

  export default {
    inject: ['BASE_URL_AXIOS','BASE_URL'],
    name: "addTrabajador",
    components: {
      Inc_top_bar,
      Inc_nav
    },
    data() {
      return {
        perPage: 10,
        stg_perfil  : localStorage.getItem("id_perfil"),
        stg_id      : localStorage.getItem('id'),
        idPerfil    : null,
        idAmbiente  : localStorage.getItem("id_ambiente"),
        nombres     : null,
        apellidoPaterno : null,
        apellidoMaterno : null,
        direccion       : null,
        tipoDocumento   : null,
        nroDocumento    : null,
        fechaNacimiento : null,
        correo      : null,
        password    : null,
        showAlert   : false,
        perfiles    : null,
        ambientes   : null,
        tiposDocumentos : null,
        valorAlerta     : "",
        preloader   : false,
        showMasivo  : false,
        showErrorMasivo : false,
        showTextoMasivo : "",
        classAlert  : "",
        file        : null,
        formData    : null,
        idSede      : localStorage.getItem("id_sede"),
      };
    },
    computed: {
      totalItems() {
        return this.trabajadores.length;
      },
      paginatedItems() {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.trabajadores.slice(startIndex, endIndex);
      }
    },
    mounted: async function() {
        const responsePerfil = await axios.get( this.BASE_URL_AXIOS + 'getPerfiles');
        this.perfiles = responsePerfil.data;

        const response = await axios.get(this.BASE_URL_AXIOS + 'getAmbientes');
        this.ambientes = response.data;

        const responseTipoDocumento = await axios.get( this.BASE_URL_AXIOS + 'getDocumentos');
        this.tiposDocumentos = responseTipoDocumento.data;
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
                    url: this.BASE_URL_AXIOS + "savePersonaMasivo/" + this.idAmbiente+"/" + this.idSede,
                    data: this.formData,
                    headers: {
                        "Content-Type": "file"
                    }
                })

                this.btnMasivo();
                if (response.data == true){
                    this.showTextoMasivo = "Se registraron las personas correctamente.";
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
      paginateData(page) {
        this.currentPage = page;
      },
      validateEmail(email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regex.test(email)) {
              return true;
          } else {
              return false;
          }
      },
      async addPersona(){
            Object.keys(this.$refs).forEach((refKey) => {
                const elements = this.$refs[refKey];
                if (!Array.isArray(elements)) {
                    elements.classList.remove("mostrarObligatorio");
                }
            });
           
            if (this.idPerfil == null || this.idPerfil == "") {
                this.$refs.idPerfil.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.nombres == null || this.nombres == "") {
                this.$refs.nombres.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.apellidoPaterno == null || this.apellidoPaterno == "") {
                this.$refs.apellidoPaterno.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.apellidoMaterno == null || this.apellidoMaterno == "") {
                this.$refs.apellidoMaterno.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.tipoDocumento == null || this.tipoDocumento == "") {
                this.$refs.tipoDocumento.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.direccion == null || this.direccion == "") {
                this.$refs.direccion.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.nroDocumento == null || this.nroDocumento == "") {
                this.$refs.nroDocumento.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.fechaNacimiento == null || this.fechaNacimiento == "") {
                this.$refs.fechaNacimiento.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.correo == null || this.correo == "") {
                this.$refs.correo.classList.add("mostrarObligatorio");
                error = 1;
            }
            else if(this.validateEmail(this.correo)){
                this.$refs.correoValido.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.password == null || this.password == "") {
                this.$refs.password.classList.add("mostrarObligatorio");
                error = 1;
            }
            if (this.stg_perfil == 1) {
                if (this.idAmbiente == null || this.idAmbiente == "") {
                    this.$refs.idAmbiente.classList.add("mostrarObligatorio");
                    error = 1;
                }
            }


            if(error == 0){
                const newPersona = {
                    idAmbiente    : this.stg_perfil == 1 ? this.idAmbiente : localStorage.getItem("id_ambiente"),
                    idSede        : this.idSede,
                    idPerfil      : this.idPerfil,
                    nombres       : this.nombres,
                    apellidoPaterno : this.apellidoPaterno,
                    apellidoMaterno : this.apellidoMaterno,
                    direccion       : this.direccion,
                    tipoDocumento   : this.tipoDocumento,
                    nroDocumento    : this.nroDocumento,
                    fechaNacimiento : this.fechaNacimiento,
                    correo    : this.correo,
                    password  : CryptoJS.MD5(this.password).toString()
                };


                /*const responsePerfil = await axios.get( this.BASE_URL_AXIOS + 'getPerfiles');
                this.perfiles = responsePerfil.data;*/


                const request = await axios({
                    method: "POST",
                    url: this.BASE_URL_AXIOS + "savePersona",
                    data: newPersona,
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
        },
    }
  };
  </script>

<style>
.img_import {
    width: 30px;
    margin-right: 5px;
}
</style>
  