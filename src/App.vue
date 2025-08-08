<template>
  <div class="md:min-h-screen flex md:flex-row flex-col justify-between w-full">
    <the-nav></the-nav>
    <section class="flex-grow sm:max-w-[65%] md:max-w-[50%] lg:max-w-[55%] max-w-[75%] w-full mx-auto md:my-11 my-9 relative">
      <router-view></router-view>
   </section>
  </div>
  
  <div v-if="store.isChecked" class="flex flex-row items-center text-center bg-black text-1xl text-white rounded-lg py-3 px-6 fixed bottom-5 left-5">
     <span class="mr-5">1 task completed</span>
     <font-awesome-icon class="text-gray-500 cursor-pointer" :icon="['fas', 'xmark']" @click="store.isChecked = false"></font-awesome-icon>  
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import TheNav from './components/TheNav.vue';
  import { useTasksStore } from '@/stores/Tasks'
  const store = useTasksStore()

  // import { useTasks } from '@/composables/Tasks';
  // const { tasks, complete } = useTasks();

</script>

