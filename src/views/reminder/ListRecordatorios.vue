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
            <h2>Inner Page</h2>
            <ol>
              <li>
                <router-link to="/login">
                    <a href="#"><span class="d-md-inline">Inicio</span></a>
                </router-link>
              </li>
              <li>Inner Page</li>
            </ol>
          </div>
  
        </div>
      </section><!-- End Breadcrumbs Section -->
  
      <section class="inner-page">
        <div class="container">
          <p>
            Example inner page template
          </p>
        </div>
      </section>
  
    </main><!-- End #main -->
  
    <div id="preloader" class="d-none"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </template>
  
  <script>
    import Inc_nav from "./inc/Inc_nav";
    import Inc_top_bar from "./inc/Inc_top_bar";
  
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
        };
      },
      mounted() {
      },
      methods: {
      }
    };
  </script>