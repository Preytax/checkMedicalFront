<template>
    <!-- ======= Top Bar ======= -->
    <Inc_top_bar/>
    <!-- ======= Header ======= -->
    <Inc_nav/>

    <main id="main">
        <!-- ======= services Section ======= -->
        <section class="services mt-4">
          <div class="container">
              <div class="section-title">
                <h2>Servicios</h2>
                <p>Los servicios principales que ofrece CHECKMEDICAL permiten brindar un 
                  control adecuado sobre los trabajadores y sus chequeos médicos, así como 
                  gestionar recordatorios personalizados a nivel individual.</p>
              </div>

            <div class="row">
              <router-link to="/addTrabajador" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div>
                  <div class="icon-box">
                    <div class="icon"><i class="fas fa-notes-medical"></i></div>
                    <h4><a href="">Registrar Trabajadores</a></h4>
                    <p>Agregar a un nuevo trabajador en el sistema de chequeos medicos</p>
                  </div>
                </div>
              </router-link>
              
              <router-link to="/listTrabajadores" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div>
                  <div class="icon-box">
                    <div class="icon"><i class="fas fa-heartbeat"></i></div>
                    <h4><a href="">Listar Trabajadores</a></h4>
                    <p>Listar trabajadores previamente registrados en el sistema de chequeos medicos</p>
                  </div>
                </div>
              </router-link>

              <router-link to="/mngmRecordatorio" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div>
                  <div class="icon-box">
                    <div class="icon"><i class="fas fa-hospital-user"></i></div>
                    <h4><a href="">Recordatorios</a></h4>
                    <p>Agregar, editar y listar recordatorios personalizados por cada trabajador</p>
                  </div>
                </div>
              </router-link>

              <router-link to="/addChequeo" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div>
                  <div class="icon-box">
                    <div class="icon"><i class="fa-solid fa-kit-medical"></i></div>
                    <h4><a href="">Registrar chequeo medico</a></h4>
                    <p>Agregar a un nuevo chequeo medico en el sistema de registros</p>
                  </div>
                </div>
              </router-link>

              <router-link to="/listChequeo" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div>
                  <div class="icon-box">
                    <div class="icon"><i class="fa fa-list-check"></i></div>
                    <h4><a href="">Listar chequeos medicos</a></h4>
                    <p>Listar chequeos medicos previamente agregado en el sistema de registros</p>
                  </div>
                </div>
              </router-link>

            <router-link to="/home" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div>
                <div class="icon-box">
                  <div class="icon"><i class="fas fa-pills"></i></div>
                  <h4><a href="">--------------</a></h4>
                  <p>--------------</p>
                </div>
              </div>
            </router-link>

            </div>
          </div>
        </section><!-- End services Section -->
    </main><!-- End #main -->

    <div id="preloader" class="d-none"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</template>

<script>
  import Inc_nav from "../inc/Inc_nav";
  import Inc_top_bar from "../inc/Inc_top_bar";

  export default {
    //inject: ['BASE_URL'],
    name: "inc_head",
    components:{
      Inc_top_bar,
      Inc_nav
    },
    data() {
      return {
      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>