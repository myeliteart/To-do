<template>
    <div  v-if="store.trash.length">
    <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
   <p class="text-heading  border-b-1 border-gray-400 pb-1">Trash</p>
      <ul>
            <li v-for="task in store.trash" :key="task.id" class="text-gray-600">
               <div class="py-4">
                <div class="flex flex-row justify-between items-center">
                    <div>
                        <div class="flex flex-row items-center wrap-break-word">
                            <div class="w-full md:max-w-150 sm:max-w-95 max-w-110 ml-0 text-md"> {{ task.main }}</div>
                        </div>
                         <div class="wrap-break-word w-full md:max-w-145 sm:max-w-85 max-w-60 mt-1">
                               <small class="block">{{ task.desc }}</small>
                               <div class="flex flex-row items-center mt-3">
                                <font-awesome-icon :class="store.selectedPriority == 'High' ? 'text-red-600' : store.selectedPriority == 'Medium' ? 'text-amber-600' : store.selectedPriority == 'Low' ? 'text-blue-700' : 'text-gray-500'" :icon="['fas', 'flag']"></font-awesome-icon>
                                </div>
                         </div>
                    </div>
                    
                    <div class="ml-11 flex flex-row justify-between items-center">
                        <font-awesome-icon @click="store.modalTrash = task" :icon="['fas', 'trash']" class="cursor-pointer mr-0 text-gray-500" />
                    </div>
                </div>
               </div>
                <hr class="text-gray-400">
            </li>
               <div class="text-center mt-7" @click="dltAll">
                  <base-button mode="reverse" class="">Delete All items</base-button>
               </div>
        </ul>
      </div>
        <teleport to="body">
            <base-dialog v-if="store.modalTrash">
                <div class="py-6 px-7 sm:max-w-115 max-w-96 wrap-break-word">
                    <div class="text-lg"> {{ `Are you sure you want to permenently delete '${store.modalTrash.main}'` }}</div>
                    <div class="flex flex-row justify-end items-center mt-4">
                         <base-button @click="store.cancelDeletion" mode="reverse" class="mr-3">Cancel</base-button>
                         <base-button @click="store.confirmTrashDeletion">Confirm</base-button>
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