<template>
  <AppSandBoxContainer title="Tabella DevExtreme (Remote Operations) dati con GraphQL">
    <DxDataGrid
      :show-borders="true"
      :data-source="books"
      :remote-operations="operations"
      :columns="columns"
      :show-row-lines="true"
      :show-column-lines="true"
      :hover-state-enabled="true"
      :row-alternation-enabled="false"
      :column-auto-width="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      height="400">
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
        <template #ratingTemplate="{ data }">
          <p class="font-semibold">
            <span class="text-green-500">{{ data.data.rating }}</span>
            <span>/ 5.0</span>
          </p>
        </template>
    </DxDataGrid> 
  </AppSandBoxContainer>
</template>

<script setup lang="ts">
import AppSandBoxContainer from './SandBoxContainer';
import { DxDataGrid, DxFilterRow, DxHeaderFilter, DxSorting, DxLoadPanel, DxPager } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import apolloClient from '../apolloClient';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import AllBooksString from '../graphql/allBooks.query.graphql';
import GetBooksCountString from '../graphql/getBooksCount.query.graphql';
import gql from 'graphql-tag';
import { computed, ref } from 'vue';

//1) Setup Tabella

const pageSizes = ref([2, 4, 20]);

const operations = computed(() => {
  return {
    paging: true,
    sorting: true,
  }
});

const columns = computed(() => {
  return [
    {
      dataField: 'id',
      caption: 'Book ID',
      dataType: 'string',
      allowSorting: true,
      alignment: 'center',
      allowFiltering: true,
      allowHeaderFiltering: false,
      width: 200,
      fixed: true
    },
    {
      dataField: 'title',
      caption: 'Title of Book',
      dataType: 'string',
      allowSorting: true,
      alignment: 'left',
      allowFiltering: true,
      allowHeaderFiltering: false,
      width: 200
    },
    {
      dataField: 'author',
      caption: 'Author of Book',
      dataType: 'string',
      allowSorting: true,
      alignment: 'left',
      width:200
    },
    {
      dataField: 'description',
      caption: 'Book description',
      dataType: 'string',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      alignment: 'left',
      width: 500
      
    },
    {
      dataField: 'rating',
      caption: 'Rating',
      dataType: 'number',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      alignment: 'center',
      cellTemplate: 'ratingTemplate',
      width: 200
    },
    {
      dataField: 'year',
      caption: 'Year',
      dataType: 'number',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      alignment: 'left',
      width: 100
    }
  ]
});

//2) Definizione delle query GraphQL

// Dato che UseQuery si aspetta un DocumentNode ( rappresentazione AST di una query GraphQL) invece di una stringa (AllBooksString)
// Si effettua questo passaggio intermedio
const AllBooks = gql`
  ${AllBooksString}
`;
const GetBooksCount = gql`
  ${GetBooksCountString}
`;

//Esequendo questa query si ottiene il numero di libri presenti nel database
// Salvo il risultato in un ogetto DocumentNode
const bookCountQuery = useQuery(GetBooksCount);


//3) Setup Remote Operations
//INFO UTILI
// - Se load prende parametri bisogna dichiarare la proprierà loadMode a "processed"
// - Il metodo load deve ritornare un oggetto con le proprietà data e totalCount
const books = new CustomStore({
  key: 'id',
  loadMode: 'processed',
  load: async (loadOptions: any) => {
    //Load è una funzione asincrona che lavora nel seguente modo:
    //1. Esegue la query GraphQL per ottenere i dati
    //  1.1 Se loadOptions contiene parametri di ordinamento o di paginazione, questi vengono passati alla query
    //2. Aspetta che la query sia stata eseguita per evitare di ritornare un array vuoto o undefined

    // Creo un oggetto queryParams che contiene tutti i parametri che accetta la query per ottenere i dati
    // I parametri vengono settati secondo gli attributi di un altro oggetto (loadOptions) che viene passato alla funzione load
    let queryParams = {
      take: loadOptions.take,
      skip: loadOptions.skip,
      sortSelector: loadOptions.sort ? loadOptions.sort[0].selector : undefined ,
      sortDescending: loadOptions.sort ? loadOptions.sort[0].desc : undefined
    };

    console.log("PARAMETRI QUERY: " + JSON.stringify(queryParams));
    
    const { result, loading } = provideApolloClient(apolloClient)(() => {
      console.log("Eseguo  la query...")
      return useQuery(AllBooks, queryParams);
    });
    
    //PASSO 2
    while (loading.value) {
      console.log("LOADING BOOKS... Status: " + loading.value + "");
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    //3) Ritorno i dati e il numero totale di libri
    return {
      data: result.value.allBooks,
      totalCount: bookCountQuery.result.value.getBooksCount
    }
  }
});


</script>

