<template>
    <div v-if="store.labels.length">
         <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
         <p class="text-heading border-b-1 border-gray-400 pb-1 wrap-break-word">{{ store.findLabels.txt }}</p>
         <ul>
            <li class="text-gray-600 border-t-1 border-t-gray-400" v-for="lblTsk in store.taskWithLabel" :key="lblTsk.id">
               <div class="py-4">
                <div class="flex flex-row items-center justify-between">
                    <div>
                        <div class="flex flex-row items-center wrap-break-word">
                            <input type="checkbox" v-model="store.completedItems" :value="lblTsk.main" class="cursor-pointer" @change="store.completed(lblTsk)">
                            <div :class="store.completedItems.find(itm => itm == lblTsk.main) ? 'strike' : ''" class="wrap-break-word max-w-48 sm:max-w-64 lg:max-w-[630px] flex-grow ml-2 text-md"> {{ lblTsk.main }}</div>
                        </div>
                        
                         <div class="wrap-break-word max-w-48 sm:max-w-64 lg:max-w-[630px] flex-grow mt-1">
                               <small class="block">{{ lblTsk.desc }}</small>

                               <div v-for="itm in lblTsk.lbls" class="flex flex-row mt-2">
                                   <font-awesome-icon :icon="['fas', 'tag']" class="mr-2 pt-1"></font-awesome-icon> 
                                   <span>{{ itm.txt }}</span>
                               </div>
                               
                             <div class="flex flex-row items-center mt-2">
                                <font-awesome-icon v-if="lblTsk.priority !== ''" :class="lblTsk.priority == 'High' ? ' text-red-600' : lblTsk.priority == 'Medium' ? ' text-amber-600' : lblTsk.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                <small class="ml-1" v-if="lblTsk.priority !== ''" :class="lblTsk.priority == 'High' ? ' text-red-600' : lblTsk.priority == 'Medium' ? ' text-amber-600' : lblTsk.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'">{{ lblTsk.priority }} Priority</small>
                            </div>
                         </div>
                    </div>
                    
                    <div class="ml-11 flex flex-row justify-between items-center">
                        <font-awesome-icon @click="store.addToFav(lblTsk)" :icon="['fas', 'heart']" :class="!store.favorites.length ? 'text-gray-500' : 'text-red-600'" class="cursor-pointer"/>
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