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
            <h2>Listar Trabajadores</h2>
            <ol>
              <li>
                <router-link to="/home">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Listar Trabajadores</li>
            </ol>
          </div>
  
        </div>
      </section><!-- End Breadcrumbs Section -->
  
      <section class="inner-page">
        <div class="container">
          <table class="table">
            <thead class="custom-thead">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trabajador in trabajadores" :key="trabajador.id">
                <td>{{ trabajador.id }}</td>
                <td>{{ trabajador.nombres }}</td>
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

    export default {
        inject: ['BASE_URL_AXIOS','BASE_URL'],
        name: "listTrabajador",
        components:{
            Inc_top_bar,
            Inc_nav
        },
        data() {
          return {
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
          async getAllTrabajadores() {
            try {
              const response = await axios.get(this.BASE_URL_AXIOS + 'getPersonas/2/1,0');
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
</style>