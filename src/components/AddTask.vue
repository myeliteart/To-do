<template>
     <div class="rounded-lg border border-gray-400 p-3 w-full">
             <input type="text" v-model.trim="store.text.txt" class="text-gray-600 font-bold focus:outline-none w-[90%] sm:max-w-[100%] lg:max-w-[100%] flex-grow" placeholder="New Task"> <br>
             <textarea placeholder="Description" v-model.trim="store.text.dsc" class="text-gray-600 focus:outline-none text-sm w-[90%] sm:max-w-[100%] lg:max-w-[100%] flex-grow"></textarea> <br>
          <div class="flex sm:flex-row flex-col sm:justify-between sm:items-center">
            <div class="w-full">
                <select v-model="store.text.selectedPriority" class="mr-9 focus:outline-none p-0 rounded-md cursor-pointer text-gray-600">
                    <option v-for="p in store.priority.level" :value="p">
                        {{ p }} Priority
                    </option>
                </select>
             <button class="cursor-pointer text-gray-600" @click="store.modalforLabel = true">Add Label</button>
            </div>
        <div class="flex flex-row sm:justify-end mt-5 sm:mt-0 items-center w-full">
             <base-button :mode="disabling1 ? 'disabled2' : 'reverse'" @click="store.cancel">Cancel</base-button>
             <base-button @click="store.addTask" :class="disabling ? 'disabled' : ''" class="ml-3 w-full">
                <font-awesome-icon :icon="['fas', store.editText == null ? 'plus' : 'pen']" class="cursor-pointer mr-1"/>
                 {{ store.editText == null ? 'Add' : 'Edit' }} Task
            </base-button>
        </div>
        </div>
        
    </div>

     <teleport to="body">
            <base-dialog v-if="store.modalforLabel">
                <div class="text-end pr-2 pt-2 cursor-pointer" @click="store.modalforLabel = false"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></div>
                <div class="py-6 px-7 sm:w-110 md:w-130 w-95 sm:max-w-110 md:max-w-130 max-w-95">
                    <div class="flex flex-col mb-3">
                        <label>Label Note</label>
                        <input v-model="store.text.createLabel" type="text" class="border border-gray-500 focus:outline-none p-2 mt-1 rounded-sm" placeholder="Enter label name">
                    </div>
                    <div class="flex flex-row items-center leading-8" v-for="lbl in store.labels">
                        <input type="checkbox" v-model="store.text.labels" :name="store.text.labels" :value="lbl.txt">
                        <label class="ml-2">{{ lbl.txt }}</label>
                    </div>
                    <div class="flex flex-row justify-end items-center mt-4">
                        <base-button @click="store.modalforLabel = false" :mode="disabling2 ? 'disabled2' : 'reverse'" class="mr-3">Cancel</base-button>
                        <base-button @click="store.addLabel" :class="store.text.createLabel.length < 3  || store.tasks.find(tsk => tsk.main == store.text.createLabel) ? 'disabled' : ''">Save</base-button>
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
    console.log(store.text.labels)
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
    textarea { resize: none; }

    input[type=checkbox], input[type=radio] {
        width: 18px;
        height: 18px;
    }
  
</style>