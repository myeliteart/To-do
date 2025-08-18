<template>
    <div v-if="store.search.length">
        <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>

        <div class="flex items-center justify-between md:gap-7 gap-0 pb-1 text-heading border-b-1 border-b-gray-400">
            <p class="text-heading max-w-40 sm:max-w-64 md:max-w-64 lg:max-w-[525px] grow wrap-break-word">Results for "{{ store.mySearch.main }}"</p>
            <div>
                <weather></weather>
            </div>
        </div>
        <ul>
            <li class="text-gray-600 border-t-1 border-t-gray-400 w-full">
               <div class="py-4">
                <div class="flex flex-row items-center justify-between">
                    <div>
                         <div class="flex flex-row items-center wrap-break-word">
                            <input type="checkbox" v-model="store.completedItems" :value="store.mySearch.main" class="cursor-pointer" @change="store.completed(store.mySearch)">
                            <div :class="store.completedItems.find(itm => itm == store.mySearch.main) ? 'strike' : ''" class="wrap-break-word max-w-48 sm:max-w-64 lg:max-w-[630px] flex-grow ml-2"> {{ store.mySearch.main }}</div>
                        </div>
                        
                         <div class="wrap-break-word max-w-48 sm:max-w-64 lg:max-w-[630px] flex-grow mt-1">
                               <small class="block">{{ store.mySearch.desc }}</small>

                               <div v-for="itm in store.mySearch.lbls" class="flex flex-row mt-2 cursor-pointer">
                                   <font-awesome-icon :icon="['fas', 'tag']" class="mr-2 pt-1"></font-awesome-icon> 
                                   <span @click="store.theLabelDetails(itm)" class="hover:underline">{{ itm.txt }}</span>
                               </div>

                              <div class="flex flex-row items-center mt-2">
                                <font-awesome-icon v-if="store.mySearch.priority !== ''" :class="store.mySearch.priority == 'High' ? ' text-red-600' : store.mySearch.priority == 'Medium' ? ' text-amber-600' : store.mySearch.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                <small v-if="store.mySearch.priority !== ''" class="ml-1" :class="store.mySearch.priority == 'High' ? ' text-red-600' : store.mySearch.priority == 'Medium' ? ' text-amber-600' : store.mySearch.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'">{{ store.mySearch.priority }} Priority</small>
                            </div>
                         </div>
                    </div>
                    
                    <div class="ml-11 flex flex-row justify-between items-center">
                        <font-awesome-icon @click="store.addToFav(store.mySearch)" :icon="['fas', 'heart']" :class="!store.favorites.length ? 'text-gray-500' : 'text-red-600'" class="cursor-pointer"/>
                    </div>
                </div>
               </div>
            </li>
        </ul>
    </div>

    <teleport to="body">
        <base-dialog v-if="store.modalSearch">
            <div class="text-end pr-2 pt-2 cursor-pointer" @click="store.modalSearch = null"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></div>
            <div class="py-6 px-7 sm:max-w-115 max-w-96 wrap-break-word">
                <div class="text-lg"> {{ `Are you sure you want to delete '${store.modalSearch.main}'` }}</div>
                <div class="flex flex-row justify-end items-center mt-4">
                    <base-button @click="store.modalSearch = null" mode="reverse" class="mr-3">Cancel</base-button>
                    <base-button @click="store.confirmSearchDlt">Confirm</base-button>
                </div>
            </div>
        </base-dialog>
    </teleport>

</template>

<script setup>
    import Weather from '@/components/Weather.vue';
     import { useRouter, useRoute } from 'vue-router';
     const router = useRouter();
     const route = useRoute();

    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

</script>

<style scoped>
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
     .strike {
        text-decoration: line-through;
    }
</style>