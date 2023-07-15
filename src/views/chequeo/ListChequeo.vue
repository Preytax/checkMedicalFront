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
          <button v-if="idPerfil == 3" @click="exportarChequeos()" class="btn btn-success d-table">
            <img class="img_export" src="../../assets/iconos/descargaMasiva.svg">
            Exportar
          </button>
          <table class="table">
            <thead class="custom-thead">
              <tr>
                <th>Id</th>
                <th>Id de Cita</th>
                <th v-if="idPerfil == 3">Id de Trabajador</th>
                <th>Estado</th>
                <th>Fecha de Enisi&oacute;n</th>
                <th>Fecha de Venciniento</th>
                <th>Chequeo Medico</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chequeoMedico in chequeosMedicos" :key="chequeoMedico.id">
                <td>{{ chequeoMedico.id }}</td>
                <td>{{ chequeoMedico.idCita }}</td>
                <td v-if="idPerfil == 3">{{ chequeoMedico.idPersona }}</td>
                <td>{{ chequeoMedico.estado == 1 ? "Pendiente" : chequeoMedico.estado == 2 ? "Aprovado" : "Reprobado" }}</td>
                <td>{{ chequeoMedico.fechaEmision }}</td>
                <td>{{ chequeoMedico.fechaVencimiento }}</td>
                <td><button v-if="chequeoMedico.estado == 1 || chequeoMedico.estado == 2" type="button" @click="donwloadChequeoMedico(chequeoMedico.pdf)" class="btn btn-success m-1">Ver</button></td>
                <td v-if="idPerfil != 4">
                  <button v-if="chequeoMedico.estado == 1" type="button" @click="ShowModalEliminar(chequeoMedico.id, chequeoMedico.correo)" class="btn btn-danger m-1">Eliminar</button>
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
    import moment from 'moment';
    import axios from 'axios';
    
    export default {
      beforeRouteEnter(to, from, next) {
          // Verificar si la variable de sesión existe
          if (!localStorage.getItem('id')) {
              // Redirigir a la página de inicio de sesión
              next('/');
          } else if(localStorage.getItem('id_perfil') < 3){
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
          chequeosMedicos : [],
          idPersona       : localStorage.getItem('id'),
          idPerfil        : localStorage.getItem("id_perfil"),
        };
      },
      mounted() {
        this.getChequeoMedicos();
      },
      methods: {
        async exportarChequeos() {
            try {
                const response = await axios.get(this.BASE_URL_AXIOS + 'exportarCheuqeosMedicos', { responseType: 'blob' });
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Crea un objeto URL para el blob
                const url = window.URL.createObjectURL(blob);

                // Crea un elemento de enlace temporal y establece su atributo de descarga y URL
                const link = document.createElement('a');
                link.href = url;

                link.setAttribute('download', 'Chequeos Medicos ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');

                // Simula un clic en el enlace para iniciar la descarga
                link.click();

                // Libera el objeto URL y elimina el elemento de enlace
                window.URL.revokeObjectURL(url);
                link.remove();
            } catch (error) {
                console.error(error);
            }
        },
        async getChequeoMedicos() {
            try {
              let response = "";
              if(this.idPerfil != 4){
                response = await axios.get(this.BASE_URL_AXIOS + 'getChequeoMedicos');

              }else{
                response = await axios.get(this.BASE_URL_AXIOS + 'getChequeoMedicoByIdPersona/'+this.idPersona);
              }

              this.chequeosMedicos = response.data;
            } catch (error) {
              console.error(error);
            }
          },
          async donwloadChequeoMedico(nombreArchivo) {
            const url = this.BASE_URL_AXIOS + 'descargarChequeoMedico/' + nombreArchivo;

            try {
              const response = await axios.get(url, {
                responseType: 'blob' // Especificar que la respuesta es un objeto Blob
              });

              const urlArchivo = window.URL.createObjectURL(new Blob([response.data]));

              // Crear un enlace temporal y hacer clic en él para descargar el archivo
              const enlace = document.createElement('a');
              enlace.href = urlArchivo;
              enlace.setAttribute('download', nombreArchivo);
              document.body.appendChild(enlace);
              enlace.click();
              document.body.removeChild(enlace);
            } catch (error) {
              console.error('Error al descargar el archivo:', error);
            }
          }
      }
    };
  </script>

<style>
.img_export {
  width: 20px;
  margin-right: 5px;
}
</style>