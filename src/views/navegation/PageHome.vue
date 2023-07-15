<template>
    <!-- ======= Top Bar ======= -->
    <Inc_top_bar/>
    <!-- ======= Header ======= -->
    <Inc_nav/>

    <main id="main">
        <!-- ======= services Section ======= -->
        <section class="services">
          <div class="container">
              <div class="section-title">
                <h2>Servicios</h2>
                <p>Los servicios principales que ofrece CHECKMEDICAL permiten brindar un 
                  control adecuado sobre los trabajadores y sus chequeos médicos, así como 
                  gestionar recordatorios personalizados a nivel individual.</p>
              </div>
              
            <div class="row">
              <template v-if="stg_perfil == 4">
                <!-- <router-link to="/addTrabajador" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-notes-medical"></i></div>
                      <h4><a href="">Registrar Chequeo Medico </a></h4>
                      <p>Agregar un nuevo Cheqeo Medico al sistema de gestion de registros</p>
                    </div>
                  </div>
                </router-link> -->
                <router-link to="/listChequeo" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
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

              <template v-if="stg_perfil == 2">
                <router-link to="/addClinic" class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-notes-medical"></i></div>
                      <h4><a href="">Registrar Clinica</a></h4>
                      <p>Agregar a una nueva Clinica en el sistema de chequeos medicos</p>
                    </div>
                  </div>
                </router-link>
                <router-link to="/listClinics" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fa fa-list-check"></i></div>
                      <h4><a href="">Listar Clinicas</a></h4>
                      <p>Listar Clinicas previamente agregado en el sistema de registros</p>
                    </div>
                  </div>
                </router-link>
              </template>

              <template v-if="stg_perfil == 3">
                <router-link to="/addRecordatorio" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fas fa-hospital-user"></i></div>
                      <h4><a href="">Agregar Citas</a></h4>
                      <p>Agregar citas personalizadas por cada trabajador en sistema de registros</p>
                    </div>
                  </div>
                </router-link>

                <router-link to="/listRecordatorios" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                  <div>
                    <div class="icon-box">
                      <div class="icon"><i class="fa fa-list-check"></i></div>
                      <h4><a href="">Listar Citas</a></h4>
                      <p>Listar citas previamente agregado en el sistema de registros</p>
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
    beforeRouteEnter(to, from, next) {
        // Verificar si la variable de sesión existe
        if (!localStorage.getItem('id')) {
            // Redirigir a la página de inicio de sesión
            next('/login');
        } else {
            next();
        }
    },
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

<style>
.services {
  margin-top: 10vh;
}
</style>