<template>
    <p class="text-heading">Inbox</p>
    <div class="mt-0">
         <tasks></tasks>
         <add-task></add-task>
    </div>
   
</template>

<script setup>
     import { useRouter } from 'vue-router';
     const router = useRouter();

    import AddTask from '@/components/AddTask.vue';
    import Tasks from '@/components/Tasks.vue';

    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>