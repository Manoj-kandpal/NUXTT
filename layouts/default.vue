<template>
    <div>
        <TheHeader 
            @sidenavToggle="displaySidenav = !displaySidenav"
        />
        <TheSideNav 
            :show="displaySidenav"
            @close="displaySidenav=false"
        />
        <nuxt />
    </div>
</template>

<script>

//components that are used only once should be name The....
import TheHeader from '@/components/Navigation/TheHeader.vue';
import TheSideNav from '@/components/Navigation/TheSideNav.vue';
export default {
    components: {
        TheHeader,
        TheSideNav,
    },
    data() {
        return {
            displaySidenav: false
        }
    }
}
</script>

<style>
html {
    font-family: 'Gluten', cursive;
}
body {
    margin: 0;
}
</style>