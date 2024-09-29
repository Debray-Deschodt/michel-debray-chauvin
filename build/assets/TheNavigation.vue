<script setup lang="ts">
import Logos from '@/components/TheLogos.vue'
import { reactive, onMounted, computed, watch, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router'
import router from '@/router'
import { destinations } from '@/data/routerData';

const VIEWER_ROUTES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const props = defineProps({
    wheelEventIsAvailable: {
        type: Boolean,
        required: true
    }
})

const currentRouteIndex = computed(() => {
    return destinations.findIndex((destinations) => destinations.path == '/' + router.currentRoute.value.path.split('/')[1])
})

const HTML = reactive({
    get nav() {
        return document.querySelector('.nav')
    },
    get divDisappear() {
        return document.querySelector('.divDisappear')
    },
    get h1Disappear() {
        return document.querySelector('.h1Disappear')
    }
})

const eventDOM = {
    mouseEnter: false,
    delayed: true,
    wheelAvailable: true,
    mouseOverNavigation: () => {
        HTML.nav?.setAttribute('style', 'opacity: 1')
    },

    mouseOutNavigation: () => {
        if (VIEWER_ROUTES.includes(currentRouteIndex.value))
            HTML.nav?.setAttribute('style', 'opacity : 0.35')
    },

    wheel: (event: WheelEvent) => {
        if (event.deltaY > 0 && eventDOM.wheelAvailable) {

            eventDOM.wheelAvailable = false
            setTimeout(() => {
                eventDOM.wheelAvailable = true
            }, 200)

            if (currentRouteIndex.value < destinations.length - 1) router.push({ path: destinations[currentRouteIndex.value + 1].path })

            if (VIEWER_ROUTES.includes(currentRouteIndex.value + 1)) {
                HTML.nav?.setAttribute('style', 'opacity: 0.35')
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 1')
            } else {
                HTML.nav?.setAttribute('style', 'opacity: 1')
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 0')
            }
        } else if (eventDOM.wheelAvailable) {

            eventDOM.wheelAvailable = false
            setTimeout(() => {
                eventDOM.wheelAvailable = true
            }, 200)

            if (currentRouteIndex.value > 0) router.push({ path: destinations[currentRouteIndex.value - 1].path })

            if (VIEWER_ROUTES.includes(currentRouteIndex.value - 1)) {
                HTML.nav?.setAttribute('style', 'opacity: 0.35')
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 1')
            } else {
                HTML.nav?.setAttribute('style', 'opacity: 1')
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 0')
            }
        }
    }
}

const refresh = {
    timeoutClear: setTimeout(() => { }, 0),
    exec: () => {
        clearTimeout(refresh.timeoutClear)
        refresh.timeoutClear = setTimeout(() => {
            if (eventDOM.mouseEnter) {
                if (VIEWER_ROUTES.includes(currentRouteIndex.value)) {
                    HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
                    HTML.h1Disappear?.setAttribute('style', 'opacity: 1')
                } else {
                    HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
                    HTML.h1Disappear?.setAttribute('style', 'opacity: 0')
                }
            }
        }, 2500)

        if (!eventDOM.mouseEnter) {
            clearTimeout(refresh.timeoutClear)
            if (VIEWER_ROUTES.includes(currentRouteIndex.value)) {
                HTML.nav?.setAttribute('style', 'opacity: 0.35')
                HTML.divDisappear?.setAttribute('style', 'margin-top: -48px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 1')
            } else {
                HTML.nav?.setAttribute('style', 'opacity: 1')
                HTML.divDisappear?.setAttribute('style', 'margin-top: 0px')
                HTML.h1Disappear?.setAttribute('style', 'opacity: 0')
            }
        }
    }
}

watch(() => currentRouteIndex.value, () => refresh.exec())
watch(() => props.wheelEventIsAvailable, (value) => {
    if (value) window.onwheel = eventDOM.wheel
})

onMounted(() => {
    window.onwheel = eventDOM.wheel
    setTimeout(() => refresh.exec(), 1000)
})

onUnmounted(() => {
    window.onwheel = () => { }
})

</script>

<template>
    <section id="navigation" @mouseover="eventDOM.mouseOverNavigation" @mouseout="eventDOM.mouseOutNavigation"
        @mouseenter="eventDOM.mouseEnter = true" @mouseleave="eventDOM.mouseEnter = false; refresh.exec()"
        @click="refresh.exec()" draggable="true" @dragstart.prevent>
        <div style="overflow:hidden">
            <div class="divDisappear">
                <nav class="nav">
                    <RouterLink :to="'/'">
                        <h1>MICHEL DEBRAY CHAUVIN</h1>
                    </RouterLink>
                    <RouterLink v-for="destination in destinations" :key="destination.id" :to="destination.path">
                        <h2>{{ destination.text }}</h2>
                    </RouterLink>
                    <Logos />
                </nav>
            </div>
        </div>
    </section>
    <section id="navigation2" draggable="true" @dragstart.prevent>
        <h1 class="h1Disappear" style="opacity: 0">
            MICHEL DEBRAY CHAUVIN
        </h1>
    </section>
</template>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;
@use '@/assets/animations.scss' as *;

#navigation {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 253px;
    padding: calc(8vh - 10px) 0 20px 50px;
}

#navigation2 {
    position: absolute;
    top: calc(10vh - 17px);
    left: calc(200px + 6vw + 8vh + 39vh + 39vh);
    height: 2vw;
    width: calc(100vw - (200px + 6vw + 8vh + 39vh + 39vh)); //20.5vw;
    overflow: hidden;

    h1 {
        transition: all 0.6s ease-out;
        width: max-content;
        color: black;
        font-size: 1.5vw;
        font-weight: 100;
        margin: 0 0 0 calc(((100vw - (200px + 6vw + 8vh + 39vh + 39vh)) - 20.5vw) /2);
    }
}

nav {
    opacity: 1;
    transition: all 0.6s ease-out;
    height: calc(22px + 34px + 180px + 24px - 17px + 11.5vh);
    height: fit-content;
}

h1 {
    font-size: 17px;
    margin: 0 0 34px 20px;
    font-weight: 300;
    color: black !important;
}

h2 {
    font-size: 12px;
    font-weight: 500;
    padding: 7.5px 20px;
}

a {
    color: black;
    transition: all 0.1s ease-out;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}

.divDisappear {
    transition: all 1s;
}

.router-exact-active-link {
    color: rgb(170, 170, 170) !important;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}

.router-active-link {
    color: rgb(170, 170, 170) !important;

    &:hover {
        color: rgb(170, 170, 170) !important;
    }
}

@media screen and (max-width: 1200px) {
    #navigation {
        padding: calc(8vh - 10px) 0 20px 1vw;
    }
}

@media screen and (max-width: 1380px) {
    #navigation2 {
        display: none;
    }
}
</style>
