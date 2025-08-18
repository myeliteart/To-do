<template>
    <div class="flex items-center justify-between md:gap-7 gap-0">
         <p class="text-heading">Inbox</p>
         <div>
            <weather></weather>
         </div>
    </div>
   
    <div class="mt-0">
         <tasks></tasks>
         <add-task></add-task>
    </div>
</template>

<script setup>
     import { onMounted } from 'vue';
     import { useRouter } from 'vue-router';
     const router = useRouter();

    import Weather from '@/components/Weather.vue';
    import AddTask from '@/components/AddTask.vue';
    import Tasks from '@/components/Tasks.vue';

     onMounted(() => {
       store.getWeaterData();
    })


    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>