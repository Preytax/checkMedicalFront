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
              <template v-if="stg_perfil == 4">
                <router-link to="/addTrabajador" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-notes-medical"></i></div>
                      <h4><a href="">Registrar Chequeo Medico </a></h4>
                      <p>Agregar un nuevo Cheqeo Medico al sistema de gestion de registros</p>
                    </div>
                  </div>
                </router-link>
                <router-link to="/listTrabajadores" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-heartbeat"></i></div>
                      <h4><a href="">Historial de Cheuqeos Medicos</a></h4>
                      <p>Historial de Cheuqeos Medicos previamente registrados en el sistema de chequeos medicos</p>
                    </div>
                  </div>
                </router-link>
              </template>
              <template v-if="stg_perfil != 4">
                <router-link to="/addTrabajador" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-notes-medical"></i></div>
                      <h4><a href="">Registrar {{ stg_perfil == 3 ? "Trabajador" : (stg_perfil == 2 ? "Operador" : "Administrador") }}</a></h4>
                      <p>Agregar a un nuevo {{ stg_perfil == 3 ? "Trabajador" : (stg_perfil == 2 ? "Operador" : "Administrador") }} en el sistema de chequeos medicos</p>
                    </div>
                  </div>
                </router-link>
                <router-link to="/listTrabajadores" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-heartbeat"></i></div>
                      <h4><a href="">Listar {{ stg_perfil == 3 ? "Trabajadores" : (stg_perfil == 2 ? "Operadores" : "Administradores") }}</a></h4>
                      <p>Listar {{ stg_perfil == 3 ? "Trabajadores" : (stg_perfil == 2 ? "Operadores" : "Administradores") }} previamente registrados en el sistema de chequeos medicos</p>
                    </div>
                  </div>
                </router-link>
              </template>
              <template v-if="stg_perfil == 1">
                <router-link to="/addAmbiente" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-notes-medical"></i></div>
                      <h4><a href="">Crear Ambiente</a></h4>
                      <p>Agregar a un nuevo Ambiente en el sistema de chequeos medicos</p>
                    </div>
                  </div>
                </router-link>
                <router-link to="/listAmbientes" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fa fa-list-check"></i></div>
                      <h4><a href="">Listar Ambientes</a></h4>
                      <p>Listar Ambientes previamente agregado en el sistema de registros</p>
                    </div>
                  </div>
                </router-link>
              </template>

              <template v-if="stg_perfil == 3">
                <router-link to="/addRecordatorio" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-hospital-user"></i></div>
                      <h4><a href="">Agregar Recordatorios</a></h4>
                      <p>Agregar, editar y listar recordatorios personalizados por cada trabajador</p>
                    </div>
                  </div>
                </router-link>

                <router-link to="/listRecordatorios" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fa fa-list-check"></i></div>
                      <h4><a href="">Listar Recordatorios</a></h4>
                      <p>Listar Recordatorios previamente agregado en el sistema de registros</p>
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

                <!-- <router-link to="/home" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-pills"></i></div>
                      <h4><a href="">--------------</a></h4>
                      <p>--------------</p>
                    </div>
                  </div>
                </router-link> -->
              </template>
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
        stg_perfil: localStorage.getItem("id_perfil"),
      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>