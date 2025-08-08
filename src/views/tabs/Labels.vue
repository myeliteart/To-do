<template>
    <font-awesome-icon @click="router.back" :icon="['fas', 'arrow-left']" class="cursor-pointer"/>
    <div>
   <p class="pb-0 text-heading border-b-1 border-b-gray-400">Labels</p>
    <ul v-if="store.labels.length">
      <li v-for="lbl in store.labels" :key="lbl.id" class="text-gray-600 mt-0">
            <div class="flex items-center justify-between w-full gap-2 py-4">
               <div class="flex flex-row items-center min-w-0 wrap-break-word">
                  <font-awesome-icon :icon="['fas', 'tag']" class="mr-2 shrink-0"></font-awesome-icon>
                   <span v-if="store.editingId !== lbl.id" class=" w-[200px] sm:w-[305px] md:w-[255px] lg:w-[420px]">
                        {{ lbl.txt }}
                    </span>
                    <input type="text" v-else v-model.trim="store.editableLabel" class="w-96 flex-grow px-2 py-1 focus:outline-none">
                  <!-- <input v-if="store.editingId == lbl.id" v-model.trim="store.editableLabel" :disabled="store.editingId == null" type="text" class="focus:outline-0 flex-grow text-md">  -->
               </div>
               <div class="ml-9 flex flex-row items-center">
                  <font-awesome-icon @click="store.theLabelDetails2(lbl)" :icon="['fas', 'angle-right']" class="cursor-pointer mr-4 text-gray-500" />
                  <font-awesome-icon @click="store.saveThisLabel(lbl)" :icon="['fas', store.editingId == lbl.id ? 'check' : 'pen']" class="cursor-pointer mr-4 text-gray-500" />
                  <font-awesome-icon @click="store.trashLbl(lbl)" :icon="['fas', 'trash']" class="cursor-pointer mr-0 text-gray-500" />
               </div>
            </div>
         <hr class="text-gray-400" v-if="store.labels.length">
      </li>
   </ul>
   <base-button mode="reverse" class="cursor-pointer mt-4" @click="store.modalforLabel = true">
      <font-awesome-icon :icon="['fas', 'tag']" class="mr-1"></font-awesome-icon> 
      Create new Label
   </base-button>

   </div>

    <teleport to="body">
            <base-dialog v-if="store.modalforLabel">
                <div class="text-end pr-2 pt-2 cursor-pointer" @click="store.modalforLabel = false"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></div>
                <div class="py-6 px-7 sm:w-110 md:w-130 w-95 sm:max-w-110 md:max-w-130 max-w-95">
                    <div class="flex flex-col mb-3">
                        <label>Label Note</label>
                        <input v-model.trim="store.text.createLabel" type="text" class="border border-gray-500 focus:outline-none p-2 mt-1 rounded-sm" placeholder="Enter label name">
                    </div>
                  
                    <div class="flex flex-row justify-end items-center mt-4">
                        <base-button :mode="disabling ? 'disabled2' : 'reverse'" @click="store.cancelLabel" class="mr-3">Cancel</base-button>
                        <base-button @click="store.addLabel" :class="store.text.createLabel.length < 3  || store.labels.find(lbl => lbl.txt == store.text.createLabel) ? 'disabled' : ''">Save</base-button>
                    </div>
                </div>
            </base-dialog>
        </teleport>

        <teleport to="body">
            <base-dialog v-if="store.modalDeleteLabel">
                <div class="py-6 px-7 sm:max-w-115 max-w-96 wrap-break-word">
                    <div class="text-lg"> {{ `Are you sure you want to delete '${store.modalDeleteLabel.txt }'` }}</div>
                    <div class="flex flex-row justify-end items-center mt-4">
                         <base-button @click="store.cancelDeletion" mode="reverse" class="mr-3">Cancel</base-button>
                         <base-button @click="store.deleteLabel">Confirm</base-button>
                    </div>
                </div>
            </base-dialog>
        </teleport>
</template>

<script setup>
   import { computed } from 'vue';
     import { useRouter } from 'vue-router';
     const router = useRouter();
    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore()

      const disabling = computed(() => {
        return store.text.createLabel.length < 3 || store.labels.find(lbl => lbl == store.text.createLabel)
    })
</script>

<style scoped>
    .disabled {
        pointer-events: none;
        background-color: rgb(163, 163, 163);
        border: none;
    }
     .disabled2 {
        pointer-events: none;
        border: 1px solid rgb(163, 163, 163);
        background-color: transparent;
        color: rgb(163, 163, 163);
    }
</style>