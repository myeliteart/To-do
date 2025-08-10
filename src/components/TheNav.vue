<template>
    <nav class="md:hidden bg-gray-100 list-none">
        <div class="flex flex-row justify-between items-center">
                <router-link to="/" class="text-gray-600 pt-2 pl-6">
                    <h2 @click="" class="text-bigger-heading font-bold mb-2.5 text-red-600 font-ds">To Do App</h2>
                </router-link>

            <button @click="store.toggleMenu" class="pr-6 cursor-pointer">
                <span class="block h-0.5 w-6 bg-gray-700 mb-1"></span>
                <span class="block h-0.5 w-6 bg-gray-700 mb-1"></span>
                <span class="block h-0.5 w-6 bg-gray-700"></span>
            </button>
        </div>

          <!-- Mobile Menu -->
           
         <div v-if="store.isMenuOpen" class="bg-gray-100 border-b-2 border-b-gray-600 fixed top-0 right-0 w-full z-50 flex flex-col px-0 leading-14">
             <div class="flex flex-row justify-between items-center px-6">
                <router-link to="/" class="text-gray-600 pt-1" @click="store.closeMobileMenu">
                    <h2 @click="" class="text-bigger-heading font-bold mb-2.5 text-red-600 font-ds">To Do App</h2>
                </router-link>

                <button @click="store.toggleMenu" class="absolute top-4 right-4 text-2xl cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon>
                </button>
            </div>
            
        <ul class="pt-2">
             <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
                <router-link to="/" class="block text-gray-600" @click="store.closeMobileMenu">
                    <font-awesome-icon :icon="['fas', 'inbox']" class="mr-1"></font-awesome-icon> 
                    Inbox
                </router-link>
                  <small>{{ store.taskCount }}</small>
             </li>
             
               <li  v-if="store.tasks.length" class="border-t-1 border-t-gray-400 px-7">
                <router-link to="/search" class="block text-gray-600" @click="store.closeMobileMenu">
                   <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-1"></font-awesome-icon> 
                   Search
                </router-link>
             </li>

              <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7" v-if="store.completedItems.length">
                <router-link to="/completed" class="block text-gray-600" @click="store.closeMobileMenu">
                   <font-awesome-icon :icon="['fas', 'list']" class="mr-1"></font-awesome-icon> 
                   Completed
                </router-link>
                  <small>{{ store.completedCount }}</small>
             </li>

               <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7">
                <router-link to="/labels" class="block text-gray-600" @click="store.closeMobileMenu">
                   <font-awesome-icon :icon="['fas', 'tag']" class="mr-1"></font-awesome-icon> 
                   Labels
                </router-link>
                  <small>{{ store.labelCount }}</small>
             </li>

              <li class="flex justify-between items-center border-t-1 border-t-gray-400 px-7" v-if="store.favorites.length">
                <router-link to="/favorites" class="block text-gray-600" @click="store.closeMobileMenu">
                   <font-awesome-icon :icon="['fas', 'heart']" class="mr-1"></font-awesome-icon> 
                   Favorites
                </router-link>
                  <small>{{ store.favoritesCount }}</small>
             </li>
             </ul>
        </div>
    </nav>
    
      <!-- desktop Menu -->

    <ul class="py-6 md:w-64 md:px-7 leading-10 hidden md:block bg-gray-100">
         <li class="flex flex-row">
            <router-link to="/" class="text-gray-600">
                 <h2 @click="" class="text-bigger-heading font-bold mb-2.5 text-red-600 font-ds">To Do App</h2>
           </router-link>
       </li>
        <li class="flex justify-between items-center">
            <router-link to="/" class="text-gray-600">
                <font-awesome-icon :icon="['fas', 'inbox']" class="mr-1"></font-awesome-icon>
                Inbox
            </router-link>
            <small>{{ store.taskCount }}</small>
        </li>
         <li v-if="store.tasks.length">
            <router-link to="/search" class="text-gray-600">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-1"></font-awesome-icon> 
                Search
            </router-link>
        </li>
         <li class="flex justify-between items-center" v-if="store.completedItems.length">
            <router-link to="/completed" class="text-gray-600">
                <font-awesome-icon :icon="['fas', 'list']" class="mr-1"></font-awesome-icon>
                Completed
            </router-link>
            <small>{{ store.completedCount }}</small>
        </li>
         <li class="flex justify-between items-center">
            <router-link to="/labels" class="text-gray-600">
                <font-awesome-icon :icon="['fas', 'tag']" class="mr-1"></font-awesome-icon>
                Labels
            </router-link>
            <small> {{ store.labelCount }}</small>
        </li>
         <li class="flex justify-between items-center" v-if="store.favorites.length">
            <router-link to="/favorites" class="text-gray-600">
                 <font-awesome-icon :icon="['fas', 'heart']" class="mr-1"></font-awesome-icon>
                Favorites
            </router-link>
             <small>{{ store.favoritesCount }}</small>
        </li>
    </ul>
    
</template>

<script setup>
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>

<style scoped>
    .active {
        font-weight: 700;
    }
</style>