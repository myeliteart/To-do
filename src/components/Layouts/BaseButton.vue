<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps(['mode'])
    import { useTasks } from '@/composables/Tasks';
    const { tasks } = useTasks();
</script>

<style scoped>
    button {
        background-color: red;
        color: #fff;
        padding: 9px 16px;
        border: 1px solid red;
        border-radius: .3rem;
        cursor: pointer;
    }
    button:hover {
        background-color: rgb(205, 13, 13);
        padding: 9px 16px;
        border: 1px solid rgb(205, 13, 13);
        border-radius: .3rem;
    }

    .reverse {
        background-color: transparent;
        color: red;
        padding: 9px 16px;
        border: 1px solid red;
        border-radius: .3rem;
        cursor: pointer;
    }
    .reverse:hover {
        background-color: red;
        color: #fff;
        padding: 9px 16px;
        border: 1px solid red;
        border-radius: .3rem;
        cursor: pointer;
    }
</style>

