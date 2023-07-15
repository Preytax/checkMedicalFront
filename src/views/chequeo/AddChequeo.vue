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
          <h2>Solicitud de Chequeo Médico</h2>
          <ol>
            <li>
              <router-link to="/home">
                  <a href="#"><span class="d-md-inline">Inicio</span></a>
              </router-link>
            </li>
            <li>Solicitud de Chequeo Médico</li>
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
                  <label for="cita" class="form-label">Cita</label>
                  <select class="form-select" id="cita" v-model="cita" @change="actualizarPersona()">
                      <option value="" selected>Elegir...</option>
                      <template v-for="cita in citas" :key="cita.id">
                          <option :value="cita.id">{{cita.recordatorio}}</option>
                      </template>
                  </select>
                  <div ref="cita" class="invalid-feedback">
                      La cita es obligatoria.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="persona" class="form-label">Trabajador</label>
                  <input type="input" class="form-control" id="persona" v-model="persona['nombres']" required disabled/>
                  <div ref="persona" class="invalid-feedback">
                      El Trabajador es obligatorio.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="fechaEmision" class="form-label">Fecha de Emisión</label>
                  <input type="date" class="form-control" id="fechaEmision" v-model="fechaEmision" required/>
                  <div ref="fechaEmision" class="invalid-feedback">
                      La fecha de Emisión es obligatoria.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="fechaVencimiento" class="form-label">Fecha de Vencimiento</label>
                  <input type="date" class="form-control" id="fechaVencimiento" v-model="fechaVencimiento" required/>
                  <div ref="fechaVencimiento" class="invalid-feedback">
                      La fecha de Vencimiento es obligatoria.
                  </div>
              </div>
              <div class="col-sm-6">
                  <label  class="form-label">PDF Chequeo Médico</label>
                  <input ref="archivoPDF" type="file" class="form-control" id="archivoPDF" accept=".pdf" required/>
                  <div ref="archivoPDF2" class="invalid-feedback">
                      El archivo PDF es obligatorio.
                  </div>
              </div>
              <hr class="my-4">
              <button class="w-100 btn btn-primary btn-lg" @click="savePDFChequeoMedico()">Registrar</button>
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
import axios from 'axios';

export default {
  beforeRouteEnter(to, from, next) {
    // Verificar si la variable de sesión existe
    if (!localStorage.getItem('id')) {
      // Redirigir a la página de inicio de sesión
      next('/');
    } else if(localStorage.getItem('id_perfil') != 3) {
      next('/');
    } else {
      next();
    }
  },
  inject: ['BASE_URL_AXIOS','BASE_URL'],
  name: "inc_head",
  components: {
    Inc_top_bar,
    Inc_nav
  },
  data() {
    return {
      citas: [],
      cita: null,
      persona: {},
      fechaEmision: null,
      fechaVencimiento: null,
      stg_id: localStorage.getItem('id'),
    };
  },
  mounted() {
    this.getAllCitas();
  },
  methods: {
    async actualizarPersona() {
      try {
        // Busca la clínica seleccionada por su ID
        const cln = this.citas.find(citaS => citaS.id === this.cita);
            
        // Actualiza el valor del campo de dirección con el nombre de la clínica
        let idPersona = cln ? cln.idPersona : "";

        const response = await axios.get(this.BASE_URL_AXIOS + 'getPersonaById/'+idPersona);
        this.persona = {
          'id': response.data.id, 
          'nombres': response.data.nombres + " " + response.data.apellidoPaterno
        }

      } catch (error) {
        console.error(error);
      }
    },
    async getAllCitas() {
      try {
        const response = await axios.get(this.BASE_URL_AXIOS + 'getRecordatorios/4');
        this.citas = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveChequeoMedico(nombrePDF) {

      if (nombrePDF != "") {

        const newChequeoMedico = {
          idCita: parseInt(this.cita),
          idPersona: this.persona['id'],
          fechaEmision: this.fechaEmision,
          pdf: nombrePDF,
          fechaVencimiento: this.fechaVencimiento,
          usuarioRegistra: parseInt(this.stg_id),
        };

        try {
          const response = await axios({
              method: "POST",
              url: this.BASE_URL_AXIOS + "saveChequeoMedico",
              data: newChequeoMedico,
              headers: {
                  "Content-Type": "application/json"
              }
          })

          var arreglo = response.data.split("|");

          if (arreglo[0] === "OK") {
            this.valorAlerta = arreglo[1];
            this.showAlert = true;
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            this.valorAlerta = arreglo[1];
            this.showAlert = true;
          }
        } catch (error) {
          console.error(error);
          // Manejar el error en caso de fallo en la solicitud
        }
      }
    },
    async savePDFChequeoMedico() {
      let error = 0;
      if (!this.cita) {
        this.$refs.cita.classList.add("is-invalid");
        error = 1;
      }
      if (!this.fechaEmision) {
        this.$refs.fechaEmision.classList.add("is-invalid");
        error = 1;
      }
      if (!this.fechaVencimiento) {
        this.$refs.fechaVencimiento.classList.add("is-invalid");
        error = 1;
      }
      if (!this.$refs.archivoPDF.files[0]) {
        this.$refs.archivoPDF.classList.add("is-invalid");
        error = 1;
      }

      if (error === 0) {
        const formData = new FormData();
        formData.append("archivoPDF", this.$refs.archivoPDF.files[0]);
        try {
          const response = await axios.post(
            this.BASE_URL_AXIOS + "savePDFChequeoMedico/"+this.cita,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          var arreglo = response.data.split("|");

          if (arreglo[0] === "OK") {
            this.valorAlerta = arreglo[1];
            this.showAlert = true;
            this.saveChequeoMedico(arreglo[2]);

          } else {
            this.valorAlerta = arreglo[1];
            this.showAlert = true;
          }
        } catch (error) {
          console.error(error);
          // Manejar el error en caso de fallo en la solicitud
        }
      }
    },
  },
};
</script>
