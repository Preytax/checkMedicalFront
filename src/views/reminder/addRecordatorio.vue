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
            <h2>Agregar Cita</h2>
            <ol>
              <li>
                <router-link to="/home">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Agregar Cita</li>
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
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Trabajador</label>
                        <select class="form-select" id="trabajador" v-model="trabajador">
                            <option value="" selected>Elegir...</option>
                            <template v-for="trabajador in trabajadores" :key="trabajador.id">
                                <option :value="trabajador.id">{{trabajador.nombres + " " + trabajador.apellidoPaterno}}</option>
                            </template>
                        </select>
                        <div ref="trabajador" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            El Trabajador es obligatorio.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Fecha y Hora de Cita</label>
                        <input type="datetime-local" class="form-control" id="fechaCita" placeholder="" maxlength="45" v-model="fechaCita" required/>
                        <div ref="fechaCita" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La fecha y hora de cita son obligatorias.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Clinica</label>
                        <select class="form-select" id="clinica" v-model="clinica" @change="actualizarDireccion()">
                            <option value="" selected>Elegir...</option>
                            <template v-for="clinica in clinicas" :key="clinica.id">
                                <option :value="clinica.id">{{clinica.clinica}}</option>
                            </template>
                        </select>
                        <div ref="fechaInicio" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La clinica es obligatoria.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Direcci&oacute;n de Clinica</label>
                        <input type="text" class="form-control" id="direccion" placeholder="" maxlength="45" v-model="direccion" required disabled/>
                        <div ref="direccion" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La direcc&oacute;n es obligatoria.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Ambiente</label>
                        <input type="text" class="form-control" id="ambiente" placeholder="" maxlength="45" v-model="ambiente" required/>
                        <div ref="ambiente" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            El ambiente es obligatorio.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Comentario</label>
                        <input type="text" class="form-control" id="recordatorio" placeholder="" maxlength="45" v-model="recordatorio" required/>
                        <div ref="recordatorio" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            El Comentario es obligatorio.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Fecha de Inicio</label>
                        <input type="date" class="form-control" id="fechaInicio" placeholder="" maxlength="45" v-model="fechaInicio" required/>
                        <div ref="fechaInicio" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La fecha de inicio es obligatoria.
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label for="firstName" class="form-label" _msttexthash="76193" _msthash="27">Fecha de Fin</label>
                        <input type="date" class="form-control" id="fechaFin" placeholder="" maxlength="45" v-model="fechaFin" required/>
                        <div ref="fechaFin" class="invalid-feedback" _msttexthash="637039" _msthidden="1" _msthash="28">
                            La fecha de fin es obligatoria.
                        </div>
                    </div>
                    <hr class="my-4">
                    <button class="w-100 btn btn-primary btn-lg" @click="seveRecordatorio()" >Registrar</button>
                </div>
            </div>
        </section>
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
                      <button @click="uploadFile" class="btn btn-success">Registrar</button>
                  </div>
              </div>
          </div>
      </div>
  
    </main><!-- End #main -->
  
    <div id="preloader" class="d-none"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </template>
  
  <script>
    import Inc_nav from "../inc/Inc_nav";
    import Inc_top_bar from "../inc/Inc_top_bar";
    
    var axios = require('axios');

    export default {
      beforeRouteEnter(to, from, next) {
          // Verificar si la variable de sesión existe
          if (!localStorage.getItem('id')) {
              // Redirigir a la página de inicio de sesión
              next('/');
          } else if(localStorage.getItem('id_perfil') != 3){
              next('/');
          } else {
              next();
          }
      },
      inject: ['BASE_URL_AXIOS','BASE_URL'],
      name: "addRecordatorio",
      components:{
        Inc_top_bar,
        Inc_nav
      },
      data() {
        return {
          trabajadores: [],
          clinicas    : [],
          clinica     : "",
          recordatorio: "",
          ambiente    : "",
          direccion   : "",
          trabajador  : "",
          fechaCita   : "",
          fechaInicio : "",
          fechaFin    : "",

          showMasivo  : false,
          classAlert  : false,
          showErrorMasivo: 0,
          showTextoMasivo: "",
          file  : "",

          idSede      : localStorage.getItem("id_sede"),
          idAmbiente  : localStorage.getItem("id_ambiente"),
        };
      },
      mounted() {
        this.getAllTrabajadores()
        this.getAllClinicas()
      },
      methods: {
        actualizarDireccion(){
            // Busca la clínica seleccionada por su ID
            const cln = this.clinicas.find(clinica => clinica.id === this.clinica);
            
            // Actualiza el valor del campo de dirección con el nombre de la clínica
            this.direccion = cln ? cln.direccion : "";
        },
        async getAllClinicas() {
            try {
              const responseClinicas = await axios.get(this.BASE_URL_AXIOS + 'getClinicas/1');
              this.clinicas = responseClinicas.data;
            } catch (error) {
              console.error(error);
            }
          },
        async getAllTrabajadores() {
          try {
            const response = await axios.get(this.BASE_URL_AXIOS + 'getPersonas/4/1');
            this.trabajadores = response.data;
          } catch (error) {
            console.error(error);
          }
        },
        async seveRecordatorio() {
          const newRecordatorio = {
            recordatorio: this.recordatorio,
            idPersona   : this.trabajador,
            idClinica   : this.clinica,
            ambiente    : this.ambiente,
            fechaCita   : this.fechaCita,
            fechaInicio : this.fechaInicio,
            fechaFin    : this.fechaFin
          }

          const request = await axios({
              method: "POST",
              url: this.BASE_URL_AXIOS + "saveRecordatorio",
              data: newRecordatorio,
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
        },
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
                    url: this.BASE_URL_AXIOS + "saveRecordatorioMasivo/" + this.idAmbiente+"/" + this.idSede,
                    data: this.formData,
                    headers: {
                        "Content-Type": "file"
                    }
                })

                this.btnMasivo();
                if (response.data == true){
                    this.showTextoMasivo = "Se registraron los recordatorios correctamente.";
                    this.classAlert = 1;
                } else {
                    this.showTextoMasivo = "Hubo un error al cargar los recordatorios.";
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
      }
    };
  </script>