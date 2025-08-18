<template>
    <div v-if="!store.completedItems.length" class="text-center mt-11">
         <p>Completed tasks is currently empty</p>
         <base-button @click="router.push('/')" mode="reverse" class="mt-3">Go to inbox</base-button>
    </div>
    <div v-if="store.completedItems.length">
        <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
        
         <div class="flex items-center justify-between md:gap-x-7 gap-0  border-b-1 border-b-gray-400">
             <p class="pb-1 mb-0 text-heading">Completed</p>
            <div>
                <weather></weather>
            </div>
         </div>
       
        <div class="text-gray-600" v-for="task in store.completedItems">
            <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-3 text-green-700"></font-awesome-icon> 
                <p class="py-4">{{ 'You completed a task:' }} <span class="font-bold">{{ task }}</span></p>
            </div>
            
            <hr class="text-gray-400">
        </div>
    </div>
</template>

<script setup>
     import Weather from '@/components/Weather.vue';
     import { useRouter } from 'vue-router';
     const router = useRouter();
     
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>