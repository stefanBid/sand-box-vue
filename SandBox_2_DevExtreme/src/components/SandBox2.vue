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
        <template #employeeTemplate="{data}">
          <div 
            v-if="typeOfEmployee(data.data.Employee) === 0"
            class="flex flex-row items-center gap-x-7">
            <div 
              class="bg-center bg-cover border-2 border-black border-solid rounded-full w-14 h-14"
              style="background-image: url(https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1688038265~exp=1688038865~hmac=85b1b4675e468df3856c03a610457e372d97ff3781a5e03ff4ea6a677a9f3dff);"/>
            <h1 >{{ data.data.Employee }}</h1>
          </div>
          <div 
            v-else-if="typeOfEmployee(data.data.Employee) === 1"
            class="flex flex-row items-center gap-x-7">
            <div 
              class="bg-center bg-cover border-2 border-black border-solid rounded-full w-14 h-14"
              style="background-image: url(https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=1060&t=st=1688038545~exp=1688039145~hmac=ddef869d1b1638e268d33934b26d5b5fc16a3645a28bc6ea77c1d891b33b510a);"/>
            <h1 >{{ data.data.Employee }}</h1>
          </div>
          <div 
            v-else-if="typeOfEmployee(data.data.Employee) === 2"
            class="flex flex-row items-center gap-x-7">
            <div 
              class="bg-center bg-cover border-2 border-black border-solid rounded-full w-14 h-14"
              style="background-image: url(https://img.freepik.com/free-photo/portrait-smiling-young-man-looking-camera_23-2148193854.jpg?w=360&t=st=1688038619~exp=1688039219~hmac=eb478a341644cc7492741079c7e2222fd41fffd3bf485d55356103fcf0cbbd63);"/>
            <h1 >{{ data.data.Employee }}</h1>
          </div>
          <div 
            v-else-if="typeOfEmployee(data.data.Employee) === 3"
            class="flex flex-row items-center gap-x-7">
            <div 
              class="bg-center bg-cover border-2 border-black border-solid rounded-full w-14 h-14"
              style="background-image: url(https://img.freepik.com/free-photo/expressive-redhead-guy-beige-shirt_176420-32329.jpg?w=1060&t=st=1688038746~exp=1688039346~hmac=564ed82935d58b9f7cbf9f0e6f683afad991db746cf809d2a6e4a0d9bc2d2782);"/>
            <h1 >{{ data.data.Employee }}</h1>
          </div>
          <div 
            v-else
            class="flex flex-row items-center gap-x-7">
            <div 
              class="bg-center bg-cover border-2 border-black border-solid rounded-full w-14 h-14"
              style="background-image: url(https://img.freepik.com/free-photo/anonymous-man-head-covered-with-paper-bag_53876-146314.jpg?w=1060&t=st=1688046107~exp=1688046707~hmac=bb4d2a39340c6f77e1ca9425b65deb60690465acd9531cd751186707fd076ae7);"/>
            <h1 >Unknow</h1>
          </div>

        </template>
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
      cellTemplate: 'employeeTemplate',
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

const typeOfEmployee = (employee: string) => {
  switch (employee) {
    case 'Harv Mudd':
      return 0;
    case 'Jim Packard':
      return 1;
    case 'Todd Hoffman':
      return 2;
    case 'Clark Morgan':
      return 3;
    default:
      return 4;
  }
};

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