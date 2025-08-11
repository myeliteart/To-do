<template>
    <div v-if="!store.favorites.length" class="text-center mt-11">
         <p>Favorites tasks is currently empty</p>
         <base-button @click="router.push('/')" mode="reverse" class="mt-3">Go to inbox</base-button>
    </div>
   
    <div v-if="store.favorites.length">
     <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
    <p class="pb-0 text-heading border-b-1 border-b-gray-400">Favorites</p>
     <ul>
            <li v-for="fav in store.favorites" :key="fav.id" class="text-gray-600 mt-0 w-full">
               <div class="py-4">
                <div class="flex flex-row justify-between items-center">
                    <div>
                       
                        <div class="flex flex-row items-center wrap-break-word">
                            <input type="checkbox" v-model="store.completedItems" :value="fav.main" class="cursor-pointer" @change="store.completed(fav)">
                            <div :class="store.completedItems.find(itm => itm == fav.main) ? 'strike' : ''" class="wrap-break-word max-w-64 sm:max-w-80 lg:max-w-[630px] ml-2 flex-grow"> {{ fav.main }}</div>
                        </div>
                        
                         <div class="wrap-break-word flex-grow max-w-64 sm:max-w-80 lg:max-w-[630px]">
                               <small class="block">{{ fav.desc }}</small>

                               <div v-for="itm in fav.lbls" class="flex flex-row mt-2 cursor-pointer">
                                   <font-awesome-icon :icon="['fas', 'tag']" class="mr-1 pt-1"></font-awesome-icon> 
                                   <span @click="store.theLabelDetails(itm)" class="hover:underline">{{ itm.txt }}</span>
                               </div>

                              <div class="flex flex-row items-center mt-2">
                                <font-awesome-icon v-if="fav.priority !== ''" :class="fav.priority == 'High' ? ' text-red-600' : fav.priority == 'Medium' ? ' text-amber-600' : fav.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                <small class="ml-1" v-if="fav.priority !== ''" :class="fav.priority == 'High' ? ' text-red-600' : fav.priority == 'Medium' ? ' text-amber-600' : fav.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'">{{ fav.priority }} Priority</small>
                            </div>
                         </div>
                    </div>
                    
                    <div class="ml-11 flex flex-row justify-between items-center">
                        <font-awesome-icon @click="store.modalFav = fav" :icon="['fas', 'trash']" class="cursor-pointer mr-0 text-gray-500" />
                    </div>
                </div>
               </div>
                <hr class="text-gray-400" v-if="store.favorites.length">
            </li>
        </ul>
        </div>
         <teleport to="body">
            <base-dialog v-if="store.modalFav">
                <div class="py-6 px-7 wrap-break-word">
                    <div class="text-lg"> {{ `Are you sure you want to delete '${store.modalFav.main}'` }}</div>
                    <div class="flex flex-row justify-end items-center mt-4">
                         <base-button @click="store.cancelDeletion" mode="reverse" class="mr-3">Cancel</base-button>
                         <base-button @click="store.confirmFaveDeletion">Confirm</base-button>
                    </div>
                </div>
            </base-dialog>
        </teleport>
</template>

<script setup>
     import { useRouter } from 'vue-router';
     const router = useRouter();
     
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()
</script>

<style scoped>
    select {
            font-family: 'Font Awesome\ 5 Brands' , 'arial'
        }
        .mrgn {
            margin-top: 13px;
        }
        .lmrgn {
            margin-top: 9px;
        }
        .strike {
        text-decoration: line-through;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>