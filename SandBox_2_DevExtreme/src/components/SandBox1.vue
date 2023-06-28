<template>
  <AppSandBoxContainer title="Tabella DevExtreme (Nuovo modo di settare le colonne)">
    <DxDataGrid
      class="kl-dataGrid"
      :data-source="projects"
      :columns="columns"
      key-expr="id"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
      :show-row-lines="true"
      :show-column-lines="true"
      :hover-state-enabled="false"
      :row-alternation-enabled="false"
      >
        <template #businessTemplate="{ data }">
            {{ data.data.businessesIds }}
        </template>
        <template #statusTemplate="{ data }">
            <h1
            :class="[
              'border-2 border-solid rounded-md p-1',
              { 'text-red-500 border-red-500': data.displayValue.color === 'red' },
              { 'text-green-500 border-green-500': data.displayValue.color === 'green' },
              { 'text-yellow-500 border-yellow-500': data.displayValue.color === 'yellow' },
              { 'text-gray-500 border-gray-500': data.displayValue.color === 'gray' }
            ]"
            >
                {{ data.displayValue.text }}
            </h1>
        </template>
        <DxPaging :page-size="50" />
        <!-- <DxSearchPanel :visible="true" :width="240" placeholder="Search..." /> -->
        <DxSorting mode="multiple" />
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
        <DxLoadPanel :enabled="true" text="" :show-pane="false" />
        <DxPager
            :allowed-page-sizes="[5, 10, 20, 30, 40, 50]"
            :show-info="true"
            :show-navigation-buttons="true"
            :show-page-size-selector="true"
            :visible="true" 
        />
    </DxDataGrid>
  </AppSandBoxContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppSandBoxContainer from './SandBoxContainer';
import {
  DxDataGrid,
  //DxSearchPanel,
  DxSorting,
  DxFilterRow,
  DxLoadPanel,
  DxHeaderFilter,
  DxPager,
  DxPaging,
  DxSelection,
} from 'devextreme-vue/data-grid';

//Prima Tabella
import type { Project } from '../models';

const projects = ref<Project[]>([
  {
    id: '1',
    businessesIds: ['gabel', 'loropiana', 'versace'],
    status: 0
  },
  {
    id: '2',
    businessesIds: ['gabel'],
    status: 7
  },
  {
    id: '3',
    businessesIds: ['loropiana'],
    status: 1
  },
  {
    id: '4',
    businessesIds: ['versace'],
    status: 2
  },
  {
    id: '5',
    businessesIds: ['loropiana', 'versace'],
    status: -1
  }
]);
const columns = computed(() => {
  return [
    {
      caption: 'Id',
      dataField: 'id',
      allowSorting: false,
      allowHeaderFiltering: false,
      allowFiltering: false,
      visible: false
    },
    {
      caption: 'Businesses',
      dataField: 'businessesIds',
      allowSorting: false,
      allowHeaderFiltering: false,
      allowFiltering: true,
      cellTemplate: 'businessTemplate',
      calculateCellValue: function (data: Project): string {
        return data?.businessesIds.toString() ?? '';
      },
      filterOperations: ['contains', 'notcontains']
    },
    {
      caption: 'Status',
      dataField: 'status',
      dataType: 'string',
      allowSorting: true,
      allowHeaderFiltering: true,
      allowFiltering: false,
      alignment: 'center',
      cellTemplate: 'statusTemplate',
      calculateDisplayValue: function (data: Project): Record<string, string> {
        if (data.status === 0) return { text: 'Completed', color: 'gray' };
        if (data.status === 7) return { text: 'Queued', color: 'yellow' };
        if (data.status > 0) return { text: 'Crawling', color: 'green' };
        return { text: 'Error', color: 'red' };
      },
      calculateCellValue: function (data: Project): number {
        if (data.status === 0) return 0;
        if (data.status === 7) return 1;
        if (data.status > 0) return 2;
        return -1;
      },
      headerFilter: {
        dataSource: function (data: any) {
          data.dataSource.postProcess = function () {
            return [
              {
                text: 'Completed',
                value: 0
              },
              {
                text: 'Queued',
                value: 1
              },
              {
                text: 'Crawling',
                value: 2
              },
              {
                text: 'Error',
                value: -1
              }
            ];
          };
        }
      }
    }
  ];
});
</script>