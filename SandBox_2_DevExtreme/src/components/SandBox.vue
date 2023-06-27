<template>
    <div class="flex flex-col items-start justify-start h-full p-10 mx-20 bg-yellow-500 rounded-lg ring-8 ring-orange-800 gap-y-7">
        <div>
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
            <!-- <DxToolbar>
                <DxItem location="before" template="titleTemplate" />
                <DxItem location="after" template="actionTemplate" />
            </DxToolbar> -->
                <template #businessTemplate="{ data }">
                    {{ data.data.businessesIds }}
                </template>
                <template #statusTemplate="{ data }">
                    <h1
                    :class="[
                        'border-2 border-solid rounded-md p-1',
                        {'text-red-500 border-red-500': data.displayValue.color === 'red'},
                        {'text-green-500 border-green-500': data.displayValue.color === 'green'},
                        {'text-yellow-500 border-yellow-500': data.displayValue.color === 'yellow'},
                        {'text-gray-500 border-gray-500': data.displayValue.color === 'gray'}
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
        </div>
        <div class="w-full overflow-x-hidden">
          <DxDataGrid
           key-expr="url"
           :data-source="crawlerTableData"
           :columns="columnsCrawledURL"
           :allow-column-reordering="true"
           :allow-column-resizing="true"
           :column-auto-width="true"
           :show-borders="true"
           :show-row-lines="true"
           :show-column-lines="true"
           :hover-state-enabled="true"
           :row-alternation-enabled="false"
           :word-wrap-enabled="true"
           >
              <!--FILTERS-->
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />
              <!--PAGINATION-->
              <DxPaging :page-size="pageSize" />
              <DxPager
               :allowed-page-sizes="pageSizes"
               :show-info="true"
               :show-navigation-buttons="true"
               :show-page-size-selector="true"
               :visible="true" 
              />
              <!--LOAD PANEL-->
              <DxLoadPanel :enabled="true" text="" :show-pane="false" />
              <!--SORTING-->
              <DxSorting mode="multiple" />
              <!--CHOOSER-->
              <DxColumnChooser 
               :enabled="true" 
               mode="select" 
               title="Choose columns" 
              />
              <!--FIXING-->
              <DxColumnFixing :enabled="true" />
              <!--SCROLLING-->
              <DxScrolling column-rendering-mode="virtual"/>

          </DxDataGrid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  DxDataGrid,
  //DxSearchPanel,
  DxSorting,
  DxFilterRow,
  DxLoadPanel,
  DxHeaderFilter,
  DxPager,
  DxPaging,
  //DxToolbar,
  //DxItem,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxScrolling
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

//Seconda Tabella
/*---- IMPORTS ----*/
import type { CrawledURLs } from '../models';
/*---- DATA ----*/
const crawledURLs = ref<CrawledURLs[]>([
  {
    url: 'https://www.google.com',
    statusCode: '200',
    isInternal: true,
    content:['html', 'utf-8'],
    indexable: true,
    depth: 0,
    inLinks: 0,
    outLinks: 0,
    metaRobots1:'aaaaa,bbbbb'
  }
]);
const pageSize = ref<number>(10);
const pageSizes = ref<number[]>([10, 20, 50, 100, 200, 500]);
/*---- COMPUTED ----*/
const crawlerTableData = computed(()=>{
  if(!crawledURLs.value.length) return;
  let crawledURLsTransformed = crawledURLs.value.map((singleUrl:CrawledURLs)=>{
    // Trasformo il dato ottentuto dal server in un oggetto che può essere letto dalla tabella
    let urlExported:string = singleUrl.url;
    let urlLen:number = singleUrl.url.length;
    let protocol:string = '';
    if(singleUrl.url.startsWith('http:')) protocol = 'http';
    else if(singleUrl.url.startsWith('https:')) protocol = 'https';

    return{
      ...singleUrl,
      urlExported,
      urlLen,
      protocol
    }
  })
  console.log(crawledURLsTransformed);
  return crawledURLsTransformed;
})

const columnsCrawledURL = computed(()=>{
  return [
    {
      //cellTemplate: "urlTitleCellTemplate",
      dataField: "url",
      caption: "URL",
      dataType: "string",
      alignment: "left",
      width:350,
      allowHeaderFiltering: false,
      fixed: true,
      fixedPosition: "left",
      visible:true
    },
    {
      dataField: "urlExported",
      caprion:"Export URL",
      dataType: "string",
      alignment: "left",
      width:350,
      allowHeaderFiltering: false,
      visible:false,
    },
    {
      dataField: "urlLen",
      caption: "URL Length",
      alignment: "left",
      visible:false,
      allowHeaderFiltering: false,
    },
    {
      //cellTemplate: "statusCellTemplate",
      dataField: "statusCode",
      caption: "HTTP Status Code",
      alignment: "left",
      width:200,
    },
    {
      dataField: "isInternal",
      caption: "URL Type",
      dataType:"string",
      alignment: "left",
      width:130,
    },
    {
      //cellTemplate: "contentTypeCellTemplate",
      dataField: "content",
      caption: "Content Type",
      dataType: "string",
      alignment: "left",
      width:150,
    },
    {
      //cellTemplate: "indexableCellTemplate",
      dataField: "indexable", 
      caption: "Indexable", 
      alignment: "left",
      width: 150,
    },
    {
      //cellTemplate: "schemeCellTemplate",
      dataField: "protocol",
      caption: "Scheme",
      alignment: "left",
      width:110,
    },
    {
      //cellTemplate: "depthCellTemplate",
      dataField: "depth",
      caption: "Crawl Depth",
      alignment: "left",
      width:140,
    },
    {
      dataField: "inLinks", 
      caption: "In-links", 
      dataType: "number",
      alignment: "left",
      allowHeaderFiltering: false,
      width: 110,
    },
    {
      dataField: "outLinks", 
      caption: "Out-Links", 
      dataType: "number",
      alignment: "left",
      allowHeaderFiltering: false,
      visible:false,
      width: 110,
    },
    {
      //cellTemplate: "metaRobotsCellTemplate",
      dataField: "metaRobots1",
      caption: "Meta Robots",
      dataType: "string",
      alignment: "left",
      width:140,
    }
  ]
})
</script>