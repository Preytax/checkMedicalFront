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
            <h2>Listar {{ stg_perfil == 3 ? "Trabajadores" : (stg_perfil == 2 ? "Operadores" : "Administradores") }}</h2>
            <ol>
              <li>
                <router-link to="/home">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Listar {{ stg_perfil == 3 ? "Trabajadores" : (stg_perfil == 2 ? "Operadores" : "Administradores") }}</li>
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
                <th>Correo</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Tipo de Documento</th>
                <th>Nro Documento</th>
                <th>Direcci&oacute;n</th>
                <th>Feca de Nacimiento</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trabajador in trabajadores" :key="trabajador.id">
                <td>{{ trabajador.id }}</td>
                <td>{{ trabajador.correo }}</td>
                <td>{{ trabajador.nombres }}</td>
                <td>{{ trabajador.apellidoPaterno + " " + trabajador.apellidoMaterno }}</td>
                <td>{{ trabajador.tipoDocumento == 1 ? "DNI" : "" }}</td>
                <td>{{ trabajador.nroDocumento }}</td>
                <td>{{ trabajador.direccion }}</td>
                <td>{{ trabajador.fechaNacimiento }}</td>
                <td>{{ trabajador.estado == 1 ? "Habilitado" : "Dehabilitado"}}</td>
                <td>
                  <a v-if="trabajador.estado == 0" class="btn btn-success m-1" @click="suspender(trabajador.id, trabajador.estado)">Habilitar</a>
                  <a v-if="trabajador.estado == 1" class="btn btn-secondary m-1" @click="suspender(trabajador.id, trabajador.estado)">Deshabilitar</a>
                  <button type="button" @click="ShowModalEliminar(trabajador.id, trabajador.correo)" class="btn btn-danger m-1">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div v-show="modalEliminar" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminaci&oacute;n de Usuario</h5>
              <button type="button" @click="hideModalEliminar()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>&#191;Quiere eliminar al usuario {{ datosEliminar.correo }}&#63;</p>
            </div>
            <div class="modal-footer">
              <button type="button" @click="hideModalEliminar()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" @click="eliminarPersona(datosEliminar.id)" class="btn btn-danger btn-eliminar">Eliminar</button>
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
    import axios from 'axios';
    import moment from 'moment';


    export default {
        inject: ['BASE_URL_AXIOS','BASE_URL'],
        name: "listTrabajador",
        components:{
            Inc_top_bar,
            Inc_nav
        },
        data() {
          return {
            stg_perfil  : localStorage.getItem("id_perfil"),
            trabajadores: [],
            modalEliminar: false,
            datosEliminar: {},
          };
        },
        mounted() {
          this.getAllTrabajadores();

        },
        methods: {
          async suspender(id, estado) {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "actualizarEstadoPersona",
                data: {
                    "id"                : id,
                    "estado"            : estado,
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
                this.getAllTrabajadores();

            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }
          },
          showAlerta() {
            this.showAlert = true;
            setTimeout(() => {
              this.hideAlert();
            }, 1500);
          },
          hideAlert() {
            this.showAlert = false;
          },
          async ShowModalEliminar(id, correo){
            this.datosEliminar = {
              id:id, 
              correo:correo
            }
            this.modalEliminar = true;
          },
          hideModalEliminar() {
            this.modalEliminar = false;
          },
          async exportarPersonas() {
            try {
              var tipoPerfil = "";
              switch (this.stg_perfil) {
                case '1':
                  tipoPerfil = 2
                  break;
                case '2':
                  tipoPerfil = 3
                  break;
                case '3':
                  tipoPerfil = 4
                  break;
              }

              const response = await axios.get(this.BASE_URL_AXIOS + 'exportarPersonas/' + tipoPerfil + '/1,0', { responseType: 'blob' });
              const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

              // Crea un objeto URL para el blob
              const url = window.URL.createObjectURL(blob);

              // Crea un elemento de enlace temporal y establece su atributo de descarga y URL
              const link = document.createElement('a');
              link.href = url;

              switch (this.stg_perfil) {
                case '1':
                  link.setAttribute('download', 'Administradores ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');
                  break;

                case '2':
                  link.setAttribute('download', 'Operadores ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');
                  break;

                case '3':
                  link.setAttribute('download', 'Trabajadores ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');
                  break;

              }

              // Simula un clic en el enlace para iniciar la descarga
              link.click();

              // Libera el objeto URL y elimina el elemento de enlace
              window.URL.revokeObjectURL(url);
              link.remove();
            } catch (error) {
              console.error(error);
            }
          },
          async getAllTrabajadores() {
            try {
              var tipoPerfil = "";
              switch (this.stg_perfil) {
                case '1':
                  tipoPerfil = 2
                  break;
                case '2':
                  tipoPerfil = 3
                  break;
                case '3':
                  tipoPerfil = 4
                  break;
              }
              const response = await axios.get(this.BASE_URL_AXIOS + 'getPersonas/'+tipoPerfil+'/1,0');
              this.trabajadores = response.data;
            } catch (error) {
              console.error(error);
            }
          },
          async eliminarPersona(id) {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "actualizarEstadoPersona",
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
                this.getAllTrabajadores();

            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }
          },
        }
    }
</script>

<style>
.custom-thead 
{
  background-color: #1977cc !important;
}

.img_export {
  width: 20px;
  margin-right: 5px;
}
</style>