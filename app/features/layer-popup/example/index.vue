<template>
  <div v-if="hasData">
    <lxp-toast-grid 
      :grid-id="'guide-example-grid'"
      :options="gridOptions"
      @get-grid="getGrid"
    />
  </div>
</template>

<script setup>
import { labelComponentRenderer } from '~/components/lxp/toast/componentRenderer';

const model = defineModel();

const hasData = ref(false);

const paymentList = ref([]);

watch(() => model.value, () => {
  if (model.value && model.value.paymentList) {
    paymentList.value = model.value.paymentList;
    hasData.value = true;
  }
}, { immediate: true })

const grid = ref();

const contentGrid = inject('contentGrid');

const getGrid = (_grid) => {
  grid.value = _grid;
  contentGrid.value = _grid;
}

const gridOptions = reactive({
  rowHeaders: [
    {
      type: 'rowNum',
      width: 43,
    }
  ],
  data: paymentList.value,
  scrollY: false,
  header: {
    height: 40,
  },
  columnOptions: {
    resizable: true,
  },
  columns: [
    {
      header: '결재자',
      name: 'userName',
      minWidth: 113,
      sortable: true,
    },
    {
      header: '직급',
      name: 'position',
      minWidth: 66,
      sortable: true,
    },
    {
      header: '결재상태',
      name: 'status',
      minWidth: 107,
      sortable: true,
      renderer: {
        type: labelComponentRenderer,
        options: {
          labelType: 'single-label',
          componentProps: (rowObject) => {
            const status = rowObject.status;

            return approvalStatusLabelOptions(status);
          }
        }
      }
    },
    {
      header: '결재일',
      name: 'approvalDate',
      minWidth: 115,
      sortable: true,
    },
    {
      header: '의견',
      name: 'comment',
      minWidth: 287,
      sortable: true,
      formatter: (e) => {
        return e.value === '' ? '-' : e.value;
      }
    },
  ],
})

const approvalStatusLabelOptions = (status) => {
  const options = {
    type: 'blinker',
    label: '',
    color: '',
  }

  switch (status) {
    case 'APPROVED':
        options.label = '결재승인';
        options.color = 'green';
        break;
    case 'REJECTED':
      options.label = '결재반려';
      options.color = 'red';
      break;
    case 'IN_PROGRESS':
      options.label = '결재중';
      options.color = 'purple';
      break;
    case 'PENDING':
      options.label = '결재대기';
      options.color = 'blue';
      break;
  }

  return options;
}
</script>

<style lang="scss" scoped>
.example-wrapper {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .bind-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background-color: #ffffff;
  }
}
</style>