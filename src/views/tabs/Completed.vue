<template>
    <div v-if="store.completedItems.length">
        <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
        <p class="pb-1 mb-0 text-heading border-b-1 border-b-gray-400">Completed</p>
        <div class="text-gray-600" v-for="task in store.completedItems">
            <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-2 text-green-700"></font-awesome-icon> 
                <p class="py-4">{{ 'You completed a task:' }} <span class="font-bold">{{ task }}</span></p>
            </div>
            
            <hr class="text-gray-400">
        </div>
    </div>
</template>

<script setup>
     import { useRouter } from 'vue-router';
     const router = useRouter();
     
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>