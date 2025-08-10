<template>
        <draggable  
             v-model="store.tasks"
             :disabled="!store.isHovered"
            item-key="name"
            class="list-group"
            ghost-class="ghost"
            >
    <template #item="{ element }">
            <div class="text-gray-600 border-t-1 border-t-gray-400 w-full">
               <div class="py-4">
                   <div class="flex flex-row items-center justify-between">
                        <div>
                            <div class="flex flex-row items-center">
                                <input type="checkbox" v-model="store.completedItems" :value="element.main" class="cursor-pointe" @change="store.completed(element)">
                                <div :class="store.completedItems.find(itm => itm == element.main) ? 'strike' : ''" class="ml-2 wrap-break-word max-w-24 sm:max-w-48 lg:max-w-[630px] flex-grow"> {{ element.main }}</div>
                            </div>

                            <div class="mt-1 wrap-break-word flex-grow max-w-32 sm:max-w-48 lg:max-w-[630px]">
                                <small class="block">{{ element.desc }}</small>
                            </div>
                        
                                <div v-for="itm in element.lbls" class="flex flex-row mt-2 cursor-pointer">
                                    <font-awesome-icon :icon="['fas', 'tag']" class="mr-1 pt-1"></font-awesome-icon> 
                                    <span @click="store.theLabelDetails(itm)" class="hover:underline">{{ itm }}</span>
                                </div>
                                <div class="flex flex-row items-center mt-2">
                                    <font-awesome-icon :class="element.priority == 'High' ? 'text-red-600' : element.priority == 'Medium' ? 'text-amber-600' : element.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                    <small class="ml-1" :class="element.priority == 'High' ? ' text-red-600' : element.priority == 'Medium' ? ' text-amber-600' : element.priority == 'Low' ? 'text-blue-700' : 'text-gray-500'">{{ element.priority }} Priority</small>
                                </div>
                        </div> 
                            
                        <div class="ml-9 flex flex-row items-center">
                            <font-awesome-icon @click="store.edited(element)" :icon="['fas', 'pen']" class="cursor-pointer mr-4 text-gray-500" />
                            <font-awesome-icon @click="store.trashIt(element)" :icon="['fas', 'trash']" class="cursor-pointer mr-4 text-gray-500" />
                            <font-awesome-icon @click="store.addToFav(element)" :icon="['fas', 'heart']" :class="store.favorites.find(itm => itm.main == element.main) ? 'text-red-600' : 'text-gray-500'"  class="cursor-pointer"/>
                            <font-awesome-icon  @mouseover="store.isHovered = true" @mouseleave="store.isHovered = false" :icon="['fas', 'grip-vertical']" class="ml-5 sm:block hidden" :class="{'draggable-active': store.isHovered}"></font-awesome-icon>
                        </div>
                 </div>
            </div>
         </div>
        </template>
        </draggable>

        <teleport to="body">
            <base-dialog v-if="store.modal">
                <div class="py-6 px-7 sm:max-w-115 max-w-96 wrap-break-word">
                    <div class="text-lg"> {{ `Are you sure you want to delete '${store.modal.main}'` }}</div>
                    <div class="flex flex-row justify-end items-center mt-4">
                         <base-button @click="store.cancelDeletion" mode="reverse" class="mr-3">Cancel</base-button>
                         <base-button @click="store.confirmDeletion">Confirm</base-button>
                    </div>
                </div>
            </base-dialog>
        </teleport>
</template>

<script setup>
    import draggable from "vuedraggable";
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

 </script>

 <style scoped>
    .strike {
        text-decoration: line-through;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    select.appearance {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        }

        select {
            font-family: 'Font Awesome\ 5 Brands' , 'arial'
        }
        .mrgn {
            margin-top: 13px;
        }
        .lmrgn {
            margin-top: 9px;
        }

        .draggable-active {
            cursor: grab;
        }
</style>
