import { ref } from 'vue';

const aliveList = ref([]);

export function useAliveList() {
    const add = (key) => {
        if (!aliveList.value.includes(key) && key != undefined) {
            aliveList.value.push(key);
        }
    };

    const remove = (key) => {
        aliveList.value = aliveList.value.filter(page => page !== key);
    };

    return {
        aliveList,
        add,
        remove
    };
}
