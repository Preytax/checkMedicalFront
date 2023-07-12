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
            <h2>Listar Chequeos Medicos</h2>
            <ol>
              <li>
                <router-link to="/home">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Listar Chequeos Medicos</li>
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
                <th>Trabajador</th>
                <th>Estado</th>
                <th>Fecha de Enision</th>
                <th>Fecha de Venciniento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chequeoMedico in chequeosMedicos" :key="chequeoMedico.id">
                <td>{{ chequeoMedico.id }}</td>
                <td>{{ chequeoMedico.idPersona }}</td>
                <td>{{ chequeoMedico.estado == 1 ? "Finalizado" : "Dehabilitado"}}</td>
                <td>{{ chequeoMedico.fechaEmision }}</td>
                <td>{{ chequeoMedico.fechaVencimiento }}</td>
                <td>
                  <a v-if="trabajador.estado == 0" class="btn btn-success m-1" @click="suspender(chequeoMedico.id, chequeoMedico.estado)">Finalizar</a>
                  <a v-if="chequeoMedico.estado == 1" class="btn btn-secondary m-1" @click="suspender(chequeoMedico.id, chequeoMedico.estado)">Deshabilitar</a>
                  <button v-if="chequeoMedico.estado != 2" type="button" @click="ShowModalEliminar(chequeoMedico.id, chequeoMedico.correo)" class="btn btn-danger m-1">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
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
      name: "inc_head",
      components:{
        Inc_top_bar,
        Inc_nav
      },
      data() {
        return {
          chequeosMedicos: []
        };
      },
      mounted() {
        this.getChequeoMedicos();
      },
      methods: {
        async getChequeoMedicos() {
            try {
              const response = await axios.get(this.BASE_URL_AXIOS + 'getChequeoMedicos/4/1,0');
              this.chequeosMedicos = response.data;
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