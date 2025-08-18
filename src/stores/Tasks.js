import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export const useTasksStore = defineStore('Tasks', () => {
    const router = useRouter();
    const route = useRoute();
    
     let tasks = ref([]);
     let favorites = ref([]);
   //   let taskCompleted = ref([]);
     let labels = ref([]);
     let taskCount = ref(0);
     let completedCount = ref(0);
     let favoritesCount = ref(0);
     let labelCount = ref(0)
     let isChecked = ref (false);
     let completedItems = ref ([]);
     const searchItem = ref (null)
     const search = ref('');
     const isHovered = ref(false);
     const currentPriority = ref(null);

     const sResults = () => {  
        if(search.value == searchItem.value.main) {
            router.push({name: 'searchResults', params: {id: searchItem.value.main.toLowerCase().split(' ').join('-')}})
        }
    }
      let text = ref ({
             txt: '',
             dsc: '',
             createLabel: '',
             checkedLabels: [],
             selectedPriority: ''
           });

           let priority = ref(
            {
                level: ['High', 'Medium', 'Low', 'No', '']
            }
           )
          const editText = ref(null);
          const strikeThrogh = ref (null);
          const modal = ref(null);
          const modalFav = ref(null);
          const modalTrash = ref(null);
           const modalSearch = ref(null);
          const modalforLabel = ref(false);
          const modalDeleteLabel = ref(null);
          const currentLabel = ref (false);
         const modalforPriority = ref(null);
         const findTasksWithLabel = ref(null);
         const editableLabel = ref('')
         const editingId = ref(null);
         const isMenuOpen = ref(false);

    const addTask = () => {
        const only = text.value.txt.length < 3 || tasks.value.find(tsk => tsk.main == text.value.txt)
         if(editText.value == null) {
            if(only){
                return;
            } else {
                const eli = {
                id: tasks.value.length + 1,
                main: text.value.txt,
                desc: text.value.dsc,
                lbls: text.value.checkedLabels
               .map(id => labels.value.find(lbl => lbl.id === id))
               .filter(lbl => lbl !== undefined),
                priority: text.value.selectedPriority
            }
                 tasks.value.unshift(eli)
                 taskCount.value++
                 text.value.checkedLabels = []
            }
         } else {
                let index = tasks.value.findIndex(itm => itm.id == editText.value.id)
                tasks.value[index].main = text.value.txt
                tasks.value[index].desc = text.value.dsc
                tasks.value[index].lbls = text.value.checkedLabels.map(id => labels.value.find(lbl => lbl.id === id)).filter(lbl => lbl !== undefined)
                tasks.value[index].priority = text.value.selectedPriority

                text.value.checkedLabels = []
                editText.value = null
         }
         console.log(tasks.value);

        text.value.txt = ''
        text.value.dsc = ''
        text.value.selectedPriority = ''
    }

    const addToFav = (task) => {
         const here = favorites.value.find(fav => fav.id == task.id)
         if(!here) {    
             favorites.value.unshift(task)
             favoritesCount.value++
         } else{
            return;
         }
          console.log(task.priority)
        }
       
     const cancel = () => {
        text.value.txt = ''
        text.value.dsc = ''
        text.value.selectedPriority = ''
        editText.value = null
     }

      const completed = (task) => {
           // taskCompleted.value.unshift(task.main)
            const hello = completedItems.value.find(itm => itm == task.main)
            if(!hello) {
                 completedCount.value--
            } else {
                 completedCount.value++
                 isChecked.value = true
                  text.value.txt = ''
                  text.value.dsc = ''
                  text.value.selectedPriority = ''
                  editText.value = null

                 setTimeout(function(){
                    isChecked.value = false
                }, 5000)
            }        
}
    console.log(completedItems.value)
    
    const confirmDeletion = () => {
        tasks.value = tasks.value.filter(item => item.main !== modal.value.main);
        favorites.value = favorites.value.filter(item => item.main !== modal.value.main);
        completedItems.value = completedItems.value.filter(item => item !== modal.value.main);
        taskCount.value--
        favoritesCount.value--
        completedCount.value--
        console.log(modal.value)

        modal.value = null;
        editText.value = null
        text.value.txt = ''
        text.value.dsc = ''
    }

    const confirmSearchDlt = () => {
        tasks.value = tasks.value.filter(item => item.id !== modalSearch.value.id);
        modalSearch.value = null;
    }

    const trashIt = (task) => {
        modal.value = task

    }

    const trashLbl = (lbl) => {
       modalDeleteLabel.value = lbl
    }
    const trashSearch = (searchTrash) => {
        modalSearch.value = searchTrash
    }

    const confirmFaveDeletion = () => {
         favorites.value = favorites.value.filter(item => item !== modalFav.value);
         favoritesCount.value--
        //  trash.value.push(modalFav.value);
        //  trashCount.value++
         modalFav.value = null;
    }

     const cancelDeletion = () => {
        modal.value = null;
        modalFav.value = null;
        modalTrash.value = null;
        modalforLabel.value = false;
        modalforPriority.value = false;
        modalDeleteLabel.value = null;
     }

     const edited = (task) => {
        text.value.txt = task.main
        text.value.dsc = task.desc
        text.value.checkedLabels = task.lbls.map(lbl => lbl.id)
        text.value.selectedPriority = task.priority
        editText.value = task
     }

     const suggesionResult = (result) => {
      search.value = result.main;
      searchItem.value = result
     }

     const addLabel = () => {
       const alreadyExists = labels.value.find(
        lbl => lbl.txt === text.value.createLabel
    )
    const tooShort = text.value.createLabel.length < 3
     if (!alreadyExists && !tooShort) {
            const newLabel = {
            id: labels.value.length + 1,
            txt: text.value.createLabel
         }
         labels.value.unshift(newLabel)
         editableLabel.value = newLabel.txt
         labelCount.value++
         text.value.createLabel = ''
     }  
     }

     const cancelLabel = () => {
        modalforLabel.value = false;
        text.value.createLabel = ''
     }
     
     const theLabelDetails = (lbl) => {
        router.push({name: 'LabelDetails', params: {id: lbl.id}})
     }

     const deleteLabel = () => {
        labels.value = labels.value.filter(l => l.id !== modalDeleteLabel.value.id)
        labelCount.value--

         tasks.value.forEach(task => {
            task.lbls = task.lbls.filter(lbl => lbl.id !== modalDeleteLabel.value.id)
         })
        modalDeleteLabel.value = null
     }

     const saveThisLabel = (lbl) => {
        if(editableLabel.value !== '') {
             if(editingId.value !== lbl.id) {
                editingId.value = lbl.id
                editableLabel.value = lbl.txt

               tasks.value.forEach(task => {
               task.lbls.forEach(lbl => {
                  if (lbl.id === editableLabel.value.id) {
                     lbl.txt = editableLabel.value.txt
                  }
               })
               })

        } else {
             lbl.txt = editableLabel.value
             editingId.value = null
        }
        }
     }

     const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
      };

    const closeMobileMenu = () => {
        isMenuOpen.value = false
     }

     const weatherData = ref(null)

      const getWeaterData = () => {
           axios.get(
            'https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=4e9f8834496e02ff06bddafa1b9660f2'
           )
           .then(response => {
                console.log(response.data)
                weatherData.value = response.data
           })
           .catch(err => {
             console.log(err)
           })
        };

    const taskWithLabel = computed(() => { 
    return tasks.value.filter(task => task.lbls.some(lbl => lbl.id === findLabels.value.id))})

     const findLabels = computed(() => {
        return labels.value.find(lbl => lbl.id == route.params.id); 
     })

     const suggessions = computed (() => {
        return tasks.value.filter(task => search.value == '' || task.main.toLowerCase().includes(search.value))
     })

      const mySearch = computed (() => {
        return tasks.value.find(task => task.main.toLowerCase().split(' ').join('-') == route.params.id);
      })

  return { tasks, text, strikeThrogh, modal, weatherData, isHovered, isMenuOpen, editingId, editText, taskWithLabel, modalforLabel, editableLabel, currentLabel, completedItems, findTasksWithLabel, modalDeleteLabel, favorites, labelCount, search, modalFav, suggessions, modalTrash, taskCount, completedCount, favoritesCount, priority, labels, modalforPriority, modalSearch, isChecked, searchItem, findLabels, currentPriority, trashSearch, edited, addTask, cancel, completed, cancelDeletion, addToFav, confirmDeletion, confirmFaveDeletion, suggesionResult, trashIt, trashLbl, addLabel, saveThisLabel, cancelLabel, theLabelDetails, confirmSearchDlt, toggleMenu, sResults, deleteLabel, closeMobileMenu, getWeaterData, mySearch }
})