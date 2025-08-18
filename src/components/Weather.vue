<template>
     <div v-if="store.weatherData" class="text-xs sm:text-sm flex items-center gap-x-3 sm:gap-x-5 gap-y-0">
            <img :src="`https://openweathermap.org/img/wn/${store.weatherData.weather[0].icon}@2x.png`" class="w-8 h-8 sm:w-12 sm:h-12">
            <h2 class="text-base font-medium">{{ store.weatherData.name }}</h2>
            <p>
                <font-awesome-icon :icon="['fas', 'temperature-full']" class="mr-0"></font-awesome-icon> 
                {{ store.weatherData.main.temp.toFixed(1) }} °F
            </p>
            <p>
                <font-awesome-icon :icon="['fas', 'cloud']" class="mr-0"></font-awesome-icon> 
                {{ store.weatherData.weather[0].description  }}
            </p>
         </div>
         <div v-else>
            ...Loding Weather   
         </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

      onMounted(() => {
       store.getWeaterData();
    })
   
</script>