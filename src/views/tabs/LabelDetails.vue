<template>
    <div v-if="store.labels.length">
         <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
         <p class="text-heading border-b-1 border-gray-400 pb-1 wrap-break-word">{{ store.findLabels.txt }}</p>
         <ul>
            <li class="text-gray-600 border-t-1 border-t-gray-400" v-for="lblTsk in store.taskWithLabel">
               <div class="py-4">
                <div class="flex flex-row items-center justify-between">
                    <div>
                        <div class="flex flex-row items-center wrap-break-word">
                            <input type="checkbox" v-model="store.completedItems" :value="lblTsk.main" class="cursor-pointer" @change="store.completed(lblTsk)">
                            <div :class="store.completedItems.find(itm => itm == lblTsk.main) ? 'strike' : ''" class="md:max-w-150 sm:max-w-95 max-w-110 ml-2 text-md"> {{ lblTsk.main }}</div>
                        </div>
                        
                         <div class="wrap-break-word w-full md:max-w-150 sm:max-w-95 max-w-110 mt-1">
                               <small class="block">{{ lblTsk.desc }}</small>

                               <div v-for="itm in lblTsk.lbls" class="flex flex-row mt-2">
                                   <font-awesome-icon :icon="['fas', 'tag']" class="mr-2 pt-1"></font-awesome-icon> 
                                   <span>{{ itm }}</span>
                               </div>
                               
                             <div class="flex flex-row items-center mt-2">
                                <font-awesome-icon :class="store.text.selectedPriority == 'High' ? ' text-red-600' : store.text.selectedPriority == 'Medium' ? ' text-amber-600' : store.text.selectedPriority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                <small class="ml-1" :class="store.text.selectedPriority == 'High' ? ' text-red-600' : store.text.selectedPriority == 'Medium' ? ' text-amber-600' : store.text.selectedPriority == 'Low' ? 'text-blue-700' : 'text-gray-500'">{{ store.text.selectedPriority }} Priority</small>
                            </div>
                         </div>
                    </div>
                    
                    <div class="ml-11 flex flex-row justify-between items-center">
                        <font-awesome-icon @click="store.addToFav(store.findLabels)" :icon="['fas', 'heart']" :class="!store.favorites.length ? 'text-gray-500' : 'text-red-600'" class="cursor-pointer"/>
                    </div>
                </div>
               </div>
            </li>
         </ul>
    </div>
</template>

<script setup>
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