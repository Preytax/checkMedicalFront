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
        <h2>Lista de Clinicas</h2>
        <ol>
          <li>
            <router-link to="/home">
                <a href="#"><span class="d-md-inline">Inicio</span></a>
            </router-link>
          </li>
          <li>Lista de Clinicas</li>
        </ol>
      </div>

    </div>
  </section><!-- End Breadcrumbs Section -->

  <section class="inner-page">
    <div class="container">
      <button @click="exportarClinicas()" class="btn btn-success d-table">
        <img class="img_export" src="../../assets/iconos/descargaMasiva.svg">
        Exportar
      </button>
      <section class="inner-page">
        <div class="container">
          <table class="table">
            <thead class="custom-thead">
              <tr>
                <th>Id</th>
                <th>Clinica</th>
                <th>Direcci&oacute;n</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clinica in clinicas" :key="clinica.id">
                <td>{{ clinica.id }}</td>
                <td>{{ clinica.clinica }}</td>
                <td>{{ clinica.direccion }}</td>
                <td>{{ clinica.estado == 1 ? "Habilitado" : "Dehabilitado"}}</td>
                <td>
                  <a v-if="clinica.estado == 0" class="btn btn-success m-1" @click="actualizarEstado(clinica.id, clinica.estado)">Habilitar</a>
                  <a v-if="clinica.estado == 1" class="btn btn-secondary m-1" @click="actualizarEstado(clinica.id, clinica.estado)">Deshabilitar</a>
                  <button type="button" @click="ShowModalEliminar(clinica.id, clinica.clinica)" class="btn btn-danger m-1">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div v-show="modalEliminar" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Eliminaci&oacute;n de Clinica</h5>
              <button type="button" @click="hideModalEliminar()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>&#191;Quiere eliminar la clinica {{ datosEliminar.clinica }}&#63;</p>
            </div>
            <div class="modal-footer">
              <button type="button" @click="hideModalEliminar()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" @click="eliminarClinica(datosEliminar.id)" class="btn btn-danger btn-eliminar">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
  </section>

</main><!-- End #main -->
</template>
<script>
    import Inc_nav from "../inc/Inc_nav";
    import Inc_top_bar from "../inc/Inc_top_bar";
    import axios from 'axios';
    import moment from 'moment';

    export default {
        beforeRouteEnter(to, from, next) {
            // Verificar si la variable de sesión existe
            if (!localStorage.getItem('id')) {
                // Redirigir a la página de inicio de sesión
                next('/');
            } else if(localStorage.getItem('id_perfil') != 2){
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
                stg_id: localStorage.getItem("id"),
                clinicas: [],
                valorAlerta: "",
                modalEliminar: false,
                datosEliminar: {},
                showAlert: false
            };
        },
        mounted() {
            this.getAllClinicas();
        },
        methods: {
            async exportarClinicas() {
                try {
                    const response = await axios.get(this.BASE_URL_AXIOS + 'exportarClinicas', { responseType: 'blob' });
                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                    // Crea un objeto URL para el blob
                    const url = window.URL.createObjectURL(blob);

                    // Crea un elemento de enlace temporal y establece su atributo de descarga y URL
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', 'Clinicas ' + moment().format("DD-MM-Y HH_mm_ss") + '.xlsx');

                    // Simula un clic en el enlace para iniciar la descarga
                    link.click();

                    // Libera el objeto URL y elimina el elemento de enlace
                    window.URL.revokeObjectURL(url);
                    link.remove();
                } catch (error) {
                    console.error(error);
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
      hideModalEliminar() {
            this.modalEliminar = false;
          },
          async ShowModalEliminar(id, clinica){
            this.datosEliminar = {
              id:id, 
              clinica:clinica
            }
            this.modalEliminar = true;
          },
          async actualizarEstado(id, estado) {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "actualizarEstadoClinica",
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
                this.getAllClinicas();

            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }
          },
      async eliminarClinica(id) {
            const request = await axios({
                method: "PUT",
                url: this.BASE_URL_AXIOS + "actualizarEstadoClinica",
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
                this.getAllClinicas();

            }else{
                this.valorAlerta = respuesta[1];
                this.showAlerta();
            }
          },
            async getAllClinicas() {
            try {
              const response = await axios.get(this.BASE_URL_AXIOS + 'getClinicas/0,1');
              this.clinicas = response.data;
            } catch (error) {
              console.error(error);
            }
          },
        }
    }
</script>