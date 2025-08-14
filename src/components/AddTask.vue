<template>
     <div class="rounded-lg border border-gray-500 p-3 w-full">
        <div class="">
             <input type="text" v-model.trim="store.text.txt" class="grow w-full text-gray-600 font-medium focus:outline-none" placeholder="Task name"> <br>
             <textarea placeholder="Description" v-model.trim="store.text.dsc" class="text-gray-600 grow w-full focus:outline-none text-sm mt-1"></textarea> <br>
         </div>
             <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center w-full">
            <div class="w-full">
                <select v-model="store.text.selectedPriority" class="mr-9 focus:outline-none border border-gray-300 p-2 rounded-sm cursor-pointer text-gray-600">
                    <option value="" disabled selected>Please select</option>
                    <option v-for="p in store.priority.level.slice(0, 4)" :value="p">
                        {{ p }} Priority
                    </option>
                </select>
             <button class="cursor-pointer text-gray-600 mt-2" @click="store.modalforLabel = true">{{ store.editText == null ? 'Add' : 'Edit' }} Label</button>
            </div>
        <div class="flex flex-row sm:justify-end mt-5 sm:mt-0 items-center w-full">
             <base-button :disabled="disabling1" mode="reverse" @click="store.cancel">Cancel</base-button>
             <base-button @click="store.addTask" :disabled="disabling" class="ml-2">
                <font-awesome-icon :icon="['fas', store.editText == null ? 'plus' : 'pen']" class="cursor-pointer mr-1 w-full"/>
                 {{ store.editText == null ? 'Add' : 'Edit' }} Task
            </base-button>
        </div>
        </div>

    </div>

     <teleport to="body">
            <base-dialog v-if="store.modalforLabel">
                <div class="text-end pr-2 pt-2 cursor-pointer" @click="store.modalforLabel = false"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></div>
                <div class="py-6 px-7">
                    <div class="flex flex-col mb-3">
                        <label>Label Note</label>
                        <input v-model="store.text.createLabel" type="text" class="border border-gray-500 focus:outline-none p-2 mt-1 rounded-sm" placeholder="Enter label name">
                    </div>
                    <div class="flex flex-row items-center leading-8" v-for="lbl in store.labels">
                        <input type="checkbox" v-model="store.text.checkedLabels"  :value="lbl.id">
                        <label class="ml-2 wrap-break-word max-w-[93%]">{{ lbl.txt }}</label>
                    </div>
                    <div class="flex flex-row justify-end items-center mt-4">
                        <base-button @click="store.cancelLabel" :mode="disabling2 ? 'disabled2' : 'reverse'" class="mr-3">Cancel</base-button>
                        <base-button @click="store.addLabel" :class="store.text.createLabel.length < 3  || store.tasks.find(tsk => tsk.main == store.text.createLabel) ? 'disabled' : ''">Create</base-button>
                    </div>
                </div>
            </base-dialog>
        </teleport>

</template>

<script setup>
    import { computed } from 'vue';

    import { useTasksStore } from '@/stores/Tasks'
    const store = useTasksStore();

     const disabling = computed(() => {
        if(store.editText == null) {
            return store.text.txt.length < 3 || store.tasks.find(tsk => tsk.main == store.text.txt)
        } else {
            return store.text.txt.length < 3
        }
        
    })

     const disabling1 = computed(() => {
        return store.text.txt.length < 3 || store.tasks.find(tsk => tsk.main == store.text.txt && store.editText == null)
    })

     const disabling2 = computed(() => {
        return store.text.createLabel.length < 3 || store.labels.find(lbl => lbl == store.text.createLabel)
    })
    console.log(store.text.checkedLabels)
</script>

<style scoped>
     .disabled {
        pointer-events: none;
        background-color: rgb(163, 163, 163);
        border: none;
    }
     /* .disabled2 {
        pointer-events: none;
        border: 1px solid rgb(163, 163, 163);
        background-color: transparent;
        color: rgb(163, 163, 163);
    } */
    textarea { resize: none; }

    input[type=checkbox], input[type=radio] {
        width: 18px;
        height: 18px;
    }
  </style>