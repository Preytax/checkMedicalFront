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
            <h2>Lista de Ambientes</h2>
            <ol>
              <li>
                <router-link to="/home">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Lista de Ambientes</li>
            </ol>
          </div>
  
        </div>
      </section><!-- End Breadcrumbs Section -->
  
      <section class="inner-page">
        <div class="container">
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
                  <tr v-for="ambiente in ambientes" :key="ambiente.id">
                    <td>{{ ambiente.id }}</td>
                    <td>{{ ambiente.ambiente }}</td>
                    <td>{{ ambiente.estado == 1 ? "Habilitado" : "Dehabilitado"}}</td>
                    <td>
                      <a v-if="ambiente.estado == 0" class="btn btn-success m-1" @click="suspender(ambiente.id, ambiente.estado)">Habilitar</a>
                      <a v-if="ambiente.estado == 1" class="btn btn-secondary m-1" @click="suspender(ambiente.id, ambiente.estado)">Deshabilitar</a>
                      <button type="button" @click="ShowModalEliminar(ambiente.id, ambiente.correo)" class="btn btn-danger m-1">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
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
          ambientes: []
        };
      },
      mounted() {
        this.getAllAmbientes();
      },
      methods: {
        async getAllAmbientes() {
            try {
              const response = await axios.get(this.BASE_URL_AXIOS + 'getAmbientes');
              this.ambientes = response.data;
            } catch (error) {
              console.error(error);
            }
          },
      }
    };
  </script>