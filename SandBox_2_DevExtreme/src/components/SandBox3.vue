<template>
  <AppSandBoxContainer title="Tabella DevExtreme (Remote Operations)">
     <p v-for="book in result?.allBooks" :key="book.id">{{book.title}}</p>
  </AppSandBoxContainer>
</template>

<script setup lang="ts">
import AppSandBoxContainer from './SandBoxContainer';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

//Creazione di una query
const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      rating
    }
  }
`;
//Result è un ref
const { result } = useQuery(ALL_BOOKS_QUERY);
</script>