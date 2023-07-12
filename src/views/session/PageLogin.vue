<template>
    <!--  Body Wrapper -->
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
            
            <!-- Nuevo Login -->
            <section class="shadow_section">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="img-fluid" alt="Sample image">
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <!-- <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" class="btn btn-primary btn-floating mx-1">
                                <i class="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" class="btn btn-primary btn-floating mx-1">
                                <i class="fab fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-primary btn-floating mx-1">
                                <i class="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-3 mb-0">Or</p>
                            </div> -->

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <input v-model="correo" type="email" class="form-control form-control-lg" placeholder="Correo" aria-describedby="emailHelp">
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <input v-model="password" type="password" class="form-control form-control-lg" :maxlength="10" placeholder="Contraseña">
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                                <!-- Checkbox -->
                                <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">
                                    Recordarme
                                </label>
                                </div>
                                <!-- <a href="#!" class="text-body">Forgot password?</a> 
                                <a class="text-primary fw-bold" href="#" @click="showCambioContraseña()">&#191;Olvidaste tu contraseña&#63;</a>-->
                            </div>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button type="button" @click="singIn" class="btn btn-success btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                    <!-- Alertas -->
                    <div v-show="alerta_credenciales" class="alert alert-danger" role="alert">
                        Credenciales Invalidas
                    </div>
                    <div v-show="alerta_campos" class="alert alert-warning" role="alert">
                        Complete los campos
                    </div>
                </div>
            </section>

            <!-- <div class="d-flex align-items-center justify-content-center w-100">
                <div class="row justify-content-center w-100">
                    <div class="col-md-8 col-lg-6 col-xxl-3">
                        <div class="card mb-0">
                            <div class="card-body">
                                <a href="#" class="text-nowrap logo-img text-center d-block py-3 w-100">
                                <img src="@/assets/images/logos/dark-logo.svg" width="180" alt="">
                                </a>
                                <p class="text-center">Your Social Campaigns</p>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Correo</label>
                                    <input v-model="correo" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-4">
                                    <label for="exampleInputPassword2" class="form-label">Constraseña</label>
                                    <input v-model="password" type="password" class="form-control" :maxlength="10" id="exampleInputPassword12">
                                </div>
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="form-check">
                                    <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" v-model="recordarCuenta" checked>
                                    <label class="form-check-label text-dark" for="flexCheckChecked">
                                        Recordar cuenta
                                    </label>
                                    </div>
                                    <a class="text-primary fw-bold" href="#" @click="showCambioContraseña()">&#191;Olvidaste tu contraseña&#63;</a>
                                </div>
                                <template class="recapchat">
                                    <vue-recaptcha ref="recaptcha" sitekey="6LcZTN8mAAAAACVNg476nioNvmjd10s7ACP8eIhi" @verify="onRecaptchaVerify" />                               
                                </template>
                                <button @click="singIn" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Iniciar sesion</button>
                                <div class="d-flex align-items-center justify-content-center">
                                    <p class="fs-4 mb-0 fw-bold">&#191;Aun no estas registrado&#63;</p>
                                    <a class="text-primary fw-bold ms-2" :href="`${BASE_URL}registrarse`">Crear cuenta</a>
                                </div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <p class="fs-4 mb-0 fw-bold">&#191;Necesitas ayuda&#63;</p>
                                    <a class="text-primary fw-bold ms-2" href="#" @click="showSolicitudAyuda()">Escribenos</a>
                                </div>
                            </div>
                            <div v-show="alerta_recapchat" class="alert alert-warning" role="alert">
                                Complete el capchat
                            </div>
                            <div v-show="alerta_campos" class="alert alert-warning" role="alert">
                                Complete los campos
                            </div>
                            <div v-show="alerta_credenciales" class="alert alert-danger" role="alert">
                                Credenciales invalidas
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div v-show="cambioContraseña" class="modal" tabindex="-1" style="display: block;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Recuperación de Contraseña</h5>
                            <button type="button" @click="hideCambioContraseña()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3" @submit="enviarCorreo()">
                                <label for="exampleInputPassword132" class="form-label">Correo Electrónico</label>
                                <input type="text" v-model="chatCorreo" class="form-control" id="exampleInputPassword14">
                            </div>
                            <div class="modal-footer">
                                <button v-show="!spinner" type="button" @click="hideCambioContraseña()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button v-show="!spinner" type="button" @click="enviarCorreo()" class="btn btn-primary">Enviar</button>
                                <button v-show="spinner" type="button" class="ben btn-primary">
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Enviando...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="solicitudAyuda" class="modal" tabindex="-1" style="display: block;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Solicitud de Ayuda</h5>
                            <button v-show="!spinner" type="button" @click="hideSolicitudAyuda()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="134" class="form-label">Nombre</label>
                                <input type="text" v-model="chatNombre" class="form-control" id="exampleInputPassword12345">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPasswor357d1" class="form-label">Numero</label>
                                <input type="text" v-model="chatNumero" class="form-control" id="exampleInputPassword1678">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-show="!spinner" type="button" @click="hideSolicitudAyuda()" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button v-show="!spinner" type="button" @click="enviarMensajeWPP()" class="btn btn-primary">Enviar</button>
                            <button v-show="spinner" type="button" class="btn btn-primary">
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Enviando...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js';
    import axios from 'axios';
    //import { VueRecaptcha } from 'vue-recaptcha';

    export default {
        beforeRouteEnter(to, from, next) {
            // Verificar si la variable de sesión existe
            if(localStorage.getItem('id')){
                next('/home');
            } else {
                next();
            }
        },
        inject: ['BASE_URL_AXIOS','BASE_URL'],
        name: "page_login",
        components:{
            //VueRecaptcha
        },
        data() {
            return {
                datosPersona: [],
                correo: "",
                password: "",
                tokenRecaptcha: "123",
                alerta_recapchat: false,
                alerta_credenciales: false,
                alerta_campos: false,
                recordarCuenta: false,
                solicitudAyuda: false,
                alerta_ayuda: false,
                chatCorreo: "",
                cambioContraseña: false,
                numeroAyuda: "",
                spinner: false,
                modoAlerta: "",
                alerta_error_ayuda: false
            };
        },
        methods: {
            async singIn(){
                var passwordMD5 = CryptoJS.MD5(this.password).toString()

                if(this.correo == "" || this.password == ""){
                    this.alerta_campos = true;
                    this.alerta_recapchat = false;
                    this.alerta_credenciales = false;

                }else{
                    if(this.recordarCuenta){
                        if(!localStorage.getItem('hash') && !localStorage.getItem('besh')){
                            localStorage.setItem('hash', this.correo);
                            localStorage.setItem('besh', CryptoJS.MD5(this.password).toString());
                        }else{
                            if(this.password != "**-*-*-*-*"){
                            this.alerta_campos = false;
                            this.alerta_recapchat = false;
                            this.alerta_credenciales = true;
                            
                            localStorage.removeItem('hash');
                            localStorage.removeItem('besh');
                            return
                            }
                            passwordMD5 = localStorage.getItem('besh');
                        }
                        

                        }else{
                        localStorage.removeItem('hash');
                        localStorage.removeItem('besh');
                        }

                        // Realizar validación de ReCAPTCHA
                        if(this.tokenRecaptcha != ""){

                        const responseTipoDocumento = await axios.get( this.BASE_URL_AXIOS +'singIn/'+this.correo+'/'+passwordMD5);
                        this.datosPersona = responseTipoDocumento.data;

                        if(this.datosPersona != ""){
                            this.alerta_campos = false;
                            this.alerta_recapchat = false;
                            this.alerta_credenciales = false;

                            localStorage.setItem('id', this.datosPersona[0].id);
                            localStorage.setItem('id_ambiente', this.datosPersona[0].idAmbiente);
                            localStorage.setItem('id_sede', this.datosPersona[0].idSede);
                            localStorage.setItem('id_perfil', this.datosPersona[0].idPerfil);
                            localStorage.setItem('id_multiuser', this.datosPersona[0].usuarioRegistra);
                            localStorage.setItem('nombres', this.datosPersona[0].nombres);
                            localStorage.setItem('apellido_paterno', this.datosPersona[0].apellidoPaterno);
                            localStorage.setItem('apellido_materno', this.datosPersona[0].apellidoMaterno);
                            localStorage.setItem('dni', this.datosPersona[0].nroDocumento);
                            localStorage.setItem('correo', this.correo);
                            
                            if(localStorage.getItem('hash') != localStorage.getItem('correo'))
                            {
                                localStorage.setItem('hash', localStorage.getItem('correo'));
                            }

                            this.$router.push({name:'home'});

                        } else {
                            this.alerta_campos = false;
                            this.alerta_recapchat = false;
                            this.alerta_credenciales = true;
                        }

                    } else {
                        this.alerta_campos = false;
                        this.alerta_recapchat = true;
                    }
                }
            }
        },
        mounted() {
        }
    }
</script>

<style>
    .shadow_section
    {
        border: 4px solid #1977cc;
        border-radius: 10px;
        box-shadow: 2px 2px 20px 9px #1977cc;
    }

    .recapchat
    {
    display: flex;
    justify-content: space-around;
    margin: 0 0 20px 0;
    }

    .divider:after,
    .divider:before 
    {
        content: "";
        flex: 1;
        height: 1px;
        background: #eee;
    }

    .h-custom {
        height: calc(100% - 73px);
    }
    
    @media (max-width: 450px) 
    {
        .h-custom 
        {
            height: 100%;
        }
    }
</style>