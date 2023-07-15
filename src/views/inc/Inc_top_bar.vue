<template>
  <div>
    <!-- ======= Top Bar ======= -->
    <div id="topbar" :class="session ? 'mt-2' : ''" class="d-flex align-items-center fixed-top">
      <div class="container d-flex justify-content-between">
        <div class="contact-info d-flex align-items-center">
          <i class="bi bi-envelope"></i><a href="mailto:u17103504@utp.edu.pe">u17103504@utp.edu.pe</a>
          <i class="bi bi-phone"></i><a href="https://wa.link/kioa0m">+51 942 263 335</a>
        </div>
        <div class="d-none d-lg-flex social-links align-items-center">
          <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
        <div v-if="session" class="d-none d-lg-flex social-links align-items-center">
          <div>
            <div><span><strong>{{ idPerfil == 4 ? "Trabajador" : idPerfil == 3 ? "Operador" : idPerfil == 2 ? "Administrador" : "Super Usuario" }}:</strong> {{ stg_correo }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showRecordatorio == true" @click="showModalRecordatorio()" class="alertaCita btn btn-warning alert alert-warning" role="alert">
      {{Recordatorio.recordatorio}}
      {{Recordatorio.fechaCita}}
    </div>

    <div v-if="showRecordatorio == true" :class="ModalRecordatorio == true ? 'd-block' : 'd-none'" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content shadow_section">
          <div class="modal-header">
            <h5 class="modal-title">Aviso de Cita</h5>
            <button @click="showModalRecordatorio()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <span><strong>Clinica:</strong> {{ clinica["clinica"] }}</span>
              <span><strong>Ambiente:</strong> {{Recordatorio.ambiente}}</span>
              <span><strong>Dirección:</strong> {{ clinica["direccion"] }}</span>
              <span><strong>Fecha de Cita:</strong> {{Recordatorio.fechaCita}}</span>
              <span><strong>Comentario:</strong> {{Recordatorio.recordatorio}}</span>
            </div>
            <div class="mt-3" id="map" style="width: 100%; height: 400px;"></div>
          </div>
          <div class="modal-footer">
            <button @click="showModalRecordatorio()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button @click="showModalConfirmacion()" class="btn btn-success">Ya asist&iacute;</button>
          </div>
        </div>
      </div>
    </div>
    <div :class="modalConfirmacionAsistencia == true ? 'd-block' : 'd-none'" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content shadow_section">
          <div class="modal-header">
            <h5 class="modal-title">Confirmaci&oacute;n de asistencia</h5>
            <button @click="showModalConfirmacion()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Al dar confirmar usted asegura haber asistido a la cita medica programada</p>
          </div>
          <div class="modal-footer">
            <button @click="showModalConfirmacion()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button @click="actualizarEstadoRecordatorio()" class="btn btn-success">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  inject: ['BASE_URL_AXIOS', 'BASE_URL'],
  name: 'Inc_top_bar',
  data() {
    return {
      id: localStorage.getItem('id'),
      idPerfil  : localStorage.getItem("id_perfil"),
      stg_correo: localStorage.getItem('correo'),
      session: false,
      showRecordatorio: false,
      Recordatorio: [],
      ModalRecordatorio: false,
      direccion: '',
      latitud: 0,
      longitud: 0,
      mostrarMapa: false,
      clinica: {},
      valorAlerta: "",
      modalConfirmacionAsistencia: false,
    };
  },
  mounted() {
    this.getAllRecordatorios();

    if (localStorage.getItem('id')) {
      this.session = true;
    }

    if (this.showRecordatorio) {
      this.mostrarMapa = true;
    }
  },
  methods: {
    showModalConfirmacion() {
        this.ModalRecordatorio = false;
        this.modalConfirmacionAsistencia = !this.modalConfirmacionAsistencia;
    },
    async actualizarEstadoRecordatorio() {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "confirmarRecordatorio",
                data: {
                    "id"                : this.Recordatorio.id,
                    "estado"            : 4,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })

            var respuesta =  request.data.split("|");
            if(respuesta[0] == "OK")
            {
                this.valorAlerta = respuesta[1];
                this.showAlerta();
                this.getAllRecordatorios();
                this.showModalConfirmacion()
            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }

          },
          showAlerta(){

          },
    async getClinica(idClinica) {
        try {
          const response = await axios.get(this.BASE_URL_AXIOS + 'getClinicaById/' + idClinica);
          this.direccion = response.data["direccion"];
          this.clinica = response.data;
          this.searchLocation();
        } catch (error) {
          console.error(error);
          return ""; // En caso de error, puedes retornar un valor vacío o manejar el error de otra manera
        }
      },
    async searchLocation() {
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        this.direccion
      )}&key=AIzaSyADjlXChgx9cbSjGu6olQ5R1jv3UZr5Zyk`;

      try {
        const response = await axios.get(geocodingUrl);
        const results = response.data.results;

        if (results.length > 0) {
          const { lat, lng } = results[0].geometry.location;

          this.latitud = lat;
          this.longitud = lng;
          this.mostrarMapa = true;
          this.initMap();
        } else {
          console.error('No se encontraron resultados para la dirección especificada.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async initMap() {
      //@ts-ignore
      // eslint-disable-next-line no-undef
      const { Map } = await google.maps.importLibrary("maps");

      const myLatLng = { lat: this.latitud, lng: this.longitud };
      // eslint-disable-next-line no-undef
      const map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 18,
      });

      // eslint-disable-next-line no-undef
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: this.Recordatorio.idClinica,
      });
    },
    showModalRecordatorio() {
      this.ModalRecordatorio = !this.ModalRecordatorio;
    },

    async getAllRecordatorios() {
      try {
        const response = await axios.get(
          this.BASE_URL_AXIOS + 'getRecordatoriosByIdPersonaAndEstado/' + this.id + '/1'
        );
        this.Recordatorio = response.data[0];

        if (!response.data.length) {
          this.showRecordatorio = false;
        } else {
          this.getClinica(this.Recordatorio["idClinica"]);
          this.showRecordatorio = true;
          this.mostrarMapa = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.shadow_section {
    border: 4px solid #1977cc;
    border-radius: 10px;
    box-shadow: 2px 2px 20px 9px #1977cc;
}

.mapaAviso {
  margin-top: 2rem;
  width: 100%;
  height: 20vh;
  background-color: red;
}

.alertaCita {
  margin-top: 15vh;
}
</style>