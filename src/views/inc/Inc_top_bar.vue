<template>
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
        <p style="margin: 0 10px 0 0;">{{ stg_correo }}</p>
        <button href="#" class="btn btn-success" @click="singOut()">Cerrar sesión</button></div>
      </div>
  </div>
</template>

<script>
  export default {
    inject: ['BASE_URL_AXIOS','BASE_URL'],
    name: "Inc_top_bar",
    data() {
        return {
          stg_correo: localStorage.getItem("correo"),
          session   : false
        };
    },
    mounted() {
      if(localStorage.getItem('id')){
        this.session = true;
      }
    } ,
    methods: {
      async singOut(){
        localStorage.removeItem('id');
        localStorage.removeItem('id_sede');
        localStorage.removeItem('id_ambiente');
        localStorage.removeItem('id_perfil');
        localStorage.removeItem('id_multiuser');
        localStorage.removeItem('nombres');
        localStorage.removeItem('apellido_paterno');
        localStorage.removeItem('apellido_materno');
        localStorage.removeItem('correo');
        localStorage.removeItem('dni');

        this.$router.push({name:'login'});
      },
    } 
  };
</script>