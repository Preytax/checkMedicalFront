<template>
    <!-- ======= Header ======= -->
    <header v-if="urlRouter == '' || urlRouter == 'home'" id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
           
            <h1 class="logo me-auto"><a href="index.html">CHECKMEDICAL</a></h1>
            <!-- Uncomment below if you prefer to use an image logo -->
            <!-- <a href="index.html" class="logo me-auto"><img src="@/assets/img/logo.png" alt="" class="img-fluid"></a>-->
            <nav id="navbar" class="navbar order-last order-lg-0">
                <ul>
                    <template v-if="urlRouter == ''">
                        <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
                        <li><a class="nav-link scrollto" href="#services">Servicios</a></li>
                        <!--
                        <li><a class="nav-link scrollto" href="#about">About</a></li>
                        <li><a class="nav-link scrollto" href="#departments">Departments</a></li>
                        <li><a class="nav-link scrollto" href="#doctors">Doctors</a></li>
                        <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="#">Drop Down 1</a></li>
                                <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Drop Down 2</a></li>
                                <li><a href="#">Drop Down 3</a></li>
                                <li><a href="#">Drop Down 4</a></li>
                            </ul>
                        </li>
                        -->
                        <li><a class="nav-link scrollto" href="#contact">Soporte</a></li>
                    </template>
                    <li v-if="urlRouter == 'home'">
                        <button href="#" class="btn btn-success" @click="singOut()">Cerrar sesión</button>
                    </li>
                </ul>
                <i v-if="urlRouter == 'home'" @click="modalNavegation()" class="bi bi-list mobile-nav-toggle"></i>
            </nav><!-- .navbar -->
        </div>
    </header>
    <nav v-show="showNanvegation" class="navAuxiliar">
        <button href="#" class="btn btn-success" @click="singOut()">Cerrar sesión</button>
    </nav>
    <!-- End Header -->
</template>

<script>
    export default {
        inject: ['BASE_URL'],
        name: "inc_nav",
        data() {
            return {
                urlRouter: this.$route.path.split("/")[1],
                showNanvegation: false,
            };
        },
        methods: {
            modalNavegation(){
                this.showNanvegation = !this.showNanvegation;
            },
            async singOut() {
                localStorage.clear();
                this.$router.push({ name: 'login' });
            },
        }  
    };
</script>

<style>

@media (min-width: 991px)
{
    .navAuxiliar {
        display: none;
    }
}

@media (max-width: 991px)
{
    .navAuxiliar {
        position: absolute;
        z-index: 999;
        width: 100%;
        background-color: white;
        margin-top: 5vh;
    }
}
</style>