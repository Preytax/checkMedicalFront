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
          <h2>Listar Recordatorios</h2>
          <ol>
            <li>
              <router-link to="/login">
                  <a href="#"><span class="d-md-inline">Inicio</span></a>
              </router-link>
            </li>
            <li>Listar Recordatorios</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs Section -->

    <section class="inner-page">
      <div class="container">
        <button @click="exportarPersonas()" class="btn btn-success d-table">
          <img class="img_export" src="../../assets/iconos/descargaMasiva.svg">
          Exportar
        </button>
        <table class="table">
          <thead class="custom-thead">
            <tr>
              <th>Id</th>
              <th>Recordatorio</th>
              <th>Trabajador</th>
              <th>Clinica</th>
              <th>Ambiente</th>
              <th>Fecha de cita</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recordatorio in recordatorios" :key="recordatorio.id">
              <td>{{ recordatorio.id }}</td>
              <td>{{ recordatorio.recordatorio }}</td>
              <td>
                <template v-if="nombresPersonaPromises[recordatorio.idPersona]">
                  <span v-if="nombresPersonaPromises[recordatorio.idPersona].resolved">{{ nombresPersonaPromises[recordatorio.idPersona].value }}</span>
                  <span v-else>Loading...</span>
                </template>
              </td>
              <td>
                <template v-if="clinicaPromises[recordatorio.idClinica]">
                  <span v-if="clinicaPromises[recordatorio.idClinica].resolved">{{ clinicaPromises[recordatorio.idClinica].value }}</span>
                  <span v-else>Loading...</span>
                </template>
              </td>
              <td>{{ recordatorio.ambiente }}</td>
              <td>{{ recordatorio.fechaCita }}</td>
              <td>{{ recordatorio.fechaInicio }}</td>
              <td>{{ recordatorio.fechaFin }}</td>
              <td><button type="button" class="btn btn-danger"  @click="ShowModalEliminar(recordatorio.id, recordatorio.recordatorio)">Eliminar</button></td>
            </tr>

          </tbody>
        </table>
      </div>
      <div v-show="modalEliminar" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminaci&oacute;n de Usuario</h5>
              <button type="button" @click="hideModalEliminar()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>&#191;Quiere eliminar al usuario {{ datosEliminar.recordatorio }}&#63;</p>
            </div>
            <div class="modal-footer">
              <button type="button" @click="hideModalEliminar()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" @click="eliminarRecordatorio(datosEliminar.id)" class="btn btn-danger btn-eliminar">Eliminar</button>
            </div>
          </div>
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
  import moment from 'moment';
  import axios from 'axios';

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
    name: "ListRecordatorios",
    components:{
      Inc_top_bar,
      Inc_nav
    },
    data() {
      return {
        recordatorios: [],
        nombresPersonaPromises: {}, // Objeto para almacenar las promesas de nombres de persona
        clinicaPromises: {}, // Objeto para almacenar las promesas de nombres de clínica
        datosEliminar: {},
        modalEliminar: false,
        showAlert : false,
      };
    },
    mounted() {
      this.getAllRecordatorios();
    },
    methods: {
      showAlerta() {
            this.showAlert = true;
            setTimeout(() => {
              this.hideAlert();
            }, 1500);
          },
          hideAlert() {
            this.showAlert = false;
          },
      hideModalEliminar() {
            this.modalEliminar = false;
          },
          async ShowModalEliminar(id, recordatorio){
            this.datosEliminar = {
              id:id, 
              recordatorio:recordatorio
            }
            this.modalEliminar = true;
          },
      async eliminarRecordatorio(id) {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "eliminarRecordatorio",
                data: {
                    "id"                : id,
                    "estado"            : 2,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })

            var respuesta =  request.data.split("|");
            if(respuesta[0] == "OK")
            {
                this.hideModalEliminar();
                this.valorAlerta = respuesta[1];
                this.showAlerta();
                this.getAllRecordatorios();

            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }
          },
      async fetchNombresPersona(idPersonaUnico) {
        try {
          const response = await axios.get(this.BASE_URL_AXIOS + 'getPersonaById/' + idPersonaUnico);
          return response.data["nombres"];
        } catch (error) {
          console.error(error);
          return ""; // En caso de error, puedes retornar un valor vacío o manejar el error de otra manera
        }
      },
      async fetchNombreClinica(idClinica) {
        try {
          const response = await axios.get(this.BASE_URL_AXIOS + 'getClinicaById/' + idClinica);
          return response.data["clinica"];
        } catch (error) {
          console.error(error);
          return ""; // En caso de error, puedes retornar un valor vacío o manejar el error de otra manera
        }
      },
      async getAllRecordatorios() {
        try {
          const response = await axios.get(this.BASE_URL_AXIOS + 'getRecordatorios/1');
          this.recordatorios = response.data;

          // Obtener los nombres de persona y almacenar las promesas en el objeto nombresPersonaPromises
          for (const trabajador of this.recordatorios) {
            this.nombresPersonaPromises[trabajador.idPersona] = {
              promise: this.fetchNombresPersona(trabajador.idPersona),
              resolved: false,
              value: null
            };
          }

          // Obtener los nombres de clínica y almacenar las promesas en el objeto clinicaPromises
          for (const trabajador of this.recordatorios) {
            this.clinicaPromises[trabajador.idClinica] = {
              promise: this.fetchNombreClinica(trabajador.idClinica),
              resolved: false,
              value: null
            };
          }

          // Esperar a que se resuelvan todas las promesas y almacenar los valores correspondientes
          for (const idPersona in this.nombresPersonaPromises) {
            const promise = this.nombresPersonaPromises[idPersona].promise;
            try {
              this.nombresPersonaPromises[idPersona].value = await promise;
            } catch (error) {
              console.error(error);
            } finally {
              this.nombresPersonaPromises[idPersona].resolved = true;
            }
          }

          // Esperar a que se resuelvan todas las promesas y almacenar los valores correspondientes
          for (const idClinica in this.clinicaPromises) {
            const promise = this.clinicaPromises[idClinica].promise;
            try {
              this.clinicaPromises[idClinica].value = await promise;
            } catch (error) {
              console.error(error);
            } finally {
              this.clinicaPromises[idClinica].resolved = true;
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
      async exportarPersonas() {
        try {
          const response = await axios.get(this.BASE_URL_AXIOS + 'exportarRecordatorios', { responseType: 'blob' });
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Crea un objeto URL para el blob
          const url = window.URL.createObjectURL(blob);

          // Crea un elemento de enlace temporal y establece su atributo de descarga y URL
          const link = document.createElement('a');
          link.href = url;

          link.setAttribute('download', 'Recordatorios ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');

          // Simula un clic en el enlace para iniciar la descarga
          link.click();

          // Libera el objeto URL y elimina el elemento de enlace
          window.URL.revokeObjectURL(url);
          link.remove();
        } catch (error) {
          console.error(error);
        }
      },
    }
  };
</script>

<style>
.img_export {
  width: 20px;
  margin-right: 5px;
}
</style>
