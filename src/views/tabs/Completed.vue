<template>
    <div v-if="!store.completedItems.length" class="text-center mt-11">
         <p>Completed tasks is currently empty</p>
         <base-button @click="router.push('/')" mode="reverse" class="mt-3">Go to inbox</base-button>
    </div>
    <div v-if="store.completedItems.length">
        <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
        <p class="pb-1 mb-0 text-heading border-b-1 border-b-gray-400">Completed</p>
        <div class="text-gray-600" v-for="task in store.taskCompleted" :key="task.main">
            <div class="flex items-center py-4">
                <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-2 text-green-700"></font-awesome-icon> 
                <div class="flex flex-col">
                    <small>{{ task.completedAt.toLocaleDateString() }} - {{ task.completedAt.toLocaleTimeString([], { timeStyle: 'short' }) }}</small>
                    <div>{{ 'You completed a task:' }} <span class="font-bold">{{ task.main }}</span></div>
                </div>
                
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