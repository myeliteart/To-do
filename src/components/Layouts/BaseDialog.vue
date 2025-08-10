<template>
    <div @click="store.cancelDeletion"></div>
    <dialog open  class="w-[70%] sm:w-[60%] md:w-[50%] lg:w-[35%]">
        <slot></slot>
    </dialog>
</template>

<style scoped>
    div{
        position: fixed;
        opacity: 0.8;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }
    dialog {
        position: fixed;
        top: 40%;
        left: 0%;
        margin: 0 auto;
        border: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: .4rem;
        overflow: hidden;
        z-index: 100;
    }
</style>

<script setup>
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

</script>