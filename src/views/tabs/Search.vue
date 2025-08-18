<template>
    <div  v-if="store.tasks.length">
    <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
     <div class="flex items-center justify-between md:gap-x-7 gap-0">
        <p class="text-heading">Search</p>
         <div>
            <weather></weather>
        </div>
     </div>
    
      <div class="rounded-sm border border-gray-300 mt-1 w-full" v-if="store.tasks.length">
        <div class="flex flex-row items-center justify-between">
            <input type="text" @keyup.enter="store.sResults" v-model="store.search" class="text-gray-600 focus:outline-none p-3  flex-grow" placeholder="Search...">
             <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-3 cursor-pointer" @click="store.sResults"></font-awesome-icon> 
        </div>
        <div v-for="itm in store.suggessions" :key="itm" @click="store.suggesionResult(itm)" class="p-3 cursor-pointer border-t border-gray-300 hover:bg-gray-400 hover:text-white wrap-break-word">
            {{ itm.main }}
         </div>
    </div>
    </div> 
      
    <!-- <input type="text" list="browsers" class="w-full border border-gray-500 focus:outline-none p-2 rounded-sm mt-1" placeholder="Search...">
    <datalist id="browsers" @keyup.enter="">
        <option :value="task.main" v-for="task in store.tasks"></option>
    </datalist> -->
    
</template>

<script setup>
  import Weather from '@/components/Weather.vue';
     import { useRouter } from 'vue-router';
     const router = useRouter();
     
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

</script>