<template>
  <AppSandBoxContainer title="Tabella DevExtreme (Remote Operations)">
    <DxDataGrid
      :show-borders="true"
      :data-source="customs"
      :remote-operations="operations"
      :columns="columns"
      :show-row-lines="true"
      :show-column-lines="true"
      :hover-state-enabled="true"
      :row-alternation-enabled="false"
      :column-auto-width="true"
      :allow-column-resizing="true"
      height="500">

        <DxSorting mode="multiple" />
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxLoadPanel :enabled="true" text="Caricamento" :show-pane="true" />
        <DxPager
              :allowed-page-sizes="pageSizes"
              :show-info="true"
              :show-navigation-buttons="true"
              :show-page-size-selector="true"
              :visible="true" 
        />
    </DxDataGrid>
  </AppSandBoxContainer>
</template>

<script setup lang="ts">
import AppSandBoxContainer from './SandBoxContainer';
import{DxDataGrid, DxFilterRow, DxHeaderFilter, DxSorting, DxLoadPanel, DxPager } from 'devextreme-vue/data-grid';

import CustomStore from 'devextreme/data/custom_store';
import { computed } from 'vue';

//1) Setup Tabella

const pageSizes = [5, 10, 20, 30, 40, 50];

const operations = computed(() => {
  return {
    paging: true,
    filtering: true,
    sorting: true,
  }
});

const columns = computed(() => {
  return [
    {
      dataField: 'OrderNumber',
      caption: 'Order ID',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      dataType: 'number',
      alignment: 'center',
    },
    {
      dataField: 'OrderDate',
      caption: 'Date of Order',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      dataType: 'date',
      alignment: 'left',
    },
    {
      dataField: 'StoreCity',
      caption: 'City of Store',
      allowSorting: true,
      allowFiltering: false,
      allowHeaderFiltering: true,
      dataType: 'string',
      alignment: 'left',
    },
    {
      dataField: 'StoreState',
      caption: 'Country of Store',
      allowSorting: true,
      allowFiltering: false,
      allowHeaderFiltering: true,
      dataType: 'string',
      alignment: 'left',
    },
    {
      dataField: 'Employee',
      caption: 'Employee',
      allowSorting: true,
      allowFiltering: false,
      allowHeaderFiltering: true,
      dataType: 'string',
      alignment: 'left',
    },
    {
      dataField: 'SaleAmount',
      caption: 'Sale Amount',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      dataType: 'number',
      alignment: 'left',
      format: 'currency',
    }
  ]
});

//2) Setup Remote Operations

const url = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'

const errorMessage = 'Impossibile caricare i dati';

/*Come DevExtreme gestisce le chiamate remote? */

// Devextreme  utilizza il component CuastomStore per gestire le chiamate remote
// e di conseguenza caricare e modificare i dati da un origini esterna(personalizzata);
// Poi li visualiiza nel DataGrid

/* Come è organizzata la comunicazione tra Server e CustomStore? */

// 1) Il CustomStore invia le impostazioni di elaborazione dei dati al server;
// 2) Il server applica le impostazioni e restituisce i dati elaborati;

const customs = new CustomStore({
  //Chiave primaria dei dati da recuperare
  key: 'OrderNumber',

  //Funzione che carica i dati
  load: (loadOptions: any) => {
    let params = '?';
    ['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'sort', 'filter', 'totalSummary', 'group', 'groupSummary']
      .forEach((op: string) => {
        if (op in loadOptions && isNotEmpty(loadOptions[op])) {
          params += `${op}=${JSON.stringify(loadOptions[op])}&`;
          //console.log(params);
        }
      });
    //per rimuovere l'ultimo carattere ossia la & finale
    params = params.slice(0, -1);
    //console.log(params);
    return fetch(`${url}${params}`)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      return {
        data: response.data,
        totalCount: response.totalCount,
        summary: response.summary,
        groupCount: response.groupCount
      };
    })
    .catch(() => { throw errorMessage });
  },

  /*---- Se le operazioni SERVER SIDE sono anche di tipo INSERT, UPDATE, REMOVE ----*/
  /* 
  //Funzione che inserisce i dati
  insert: (values: any) => {
    return fetch('https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    .then(handleErrors)
    .catch(() => { throw errorMessage });
  },
  //Funzione che aggiorna i dati
  update: (key: any, values: any) => {
    return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify(values)
    })
    .then(handleErrors)
    .catch(() => { throw errorMessage });
  },
  //Funzione che elimina i dati
  remove: (key: any) => {
    return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders/${encodeURIComponent(key)}`, {
      method: 'DELETE'
    })
    .then(handleErrors)
    .catch(() => { throw errorMessage });
  }
*/
});

const isNotEmpty = (value: any) => {
  return value !== undefined && value !== null && value !== '';
}

const handleErrors = (response: any) => {
  if (!response.ok) {
     throw Error(response.statusText);
  }
  return response;
}
</script>