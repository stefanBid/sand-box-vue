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
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import { DxDataGrid, DxFilterRow, DxHeaderFilter, DxSorting, DxLoadPanel, DxPager } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import apolloClient from '../main';
import gql from 'graphql-tag';
import { computed } from 'vue';

//1) Setup Tabella

const pageSizes = [5, 10];

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
      dataField: 'id',
      caption: 'Book ID',
      dataType: 'number',
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
      alignment: 'left',
      cellTemplate: 'ratingTemplate',
      width: 200
    },
    {
      dataField: 'year',
      caption: 'Year',
      dataType: 'date',
      allowSorting: true,
      allowFiltering: true,
      allowHeaderFiltering: false,
      alignment: 'left',
      width: 200
    }
  ]
});


const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      author
      description
      rating
      year
    }
  }
`;

//2) Setup Remote Operations
//INFO UTILI
// - Se load prende parametri bisogna dichiarare la proprierà loadMode a "processed"
// - Il metodo load deve ritornare un oggetto con le proprietà data e totalCount
const books = new CustomStore({
  key: 'id',
  loadMode: 'processed',
  load: async () => {
    console.log("LOADING BOOKS");
    //Result è un ref
    const { result, loading } = provideApolloClient(apolloClient)(() => {
      return useQuery(ALL_BOOKS_QUERY);
    });
    while (loading.value) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log("RESULT OF QUERY");
    console.log(result);
    return {
      data: result?.value?.allBooks,
      totalCount: result?.value?.allBooks?.length
    };
  }
});

</script>