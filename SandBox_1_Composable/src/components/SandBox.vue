<template>
    <div class="flex flex-col items-start justify-start h-full p-10 mx-20 bg-yellow-500 rounded-lg ring-8 ring-orange-800 gap-y-7">
        <div id="mouse-composable">
            <h1 class="text-3xl font-semibold text-black">Use Mouse Composable: </h1>
            <p class="text-xl font-semibold text-black">Mouse x: <span class="font-normal">{{ x }}</span></p>
            <p class="text-xl font-semibold text-black">Mouse y: <span class="font-normal">{{ y }}</span></p>
        </div>
        <div id= "breackpoint-composable">
            <h1 class="text-3xl font-semibold text-black">Use Breackpoint Composable: </h1>
            <p class="text-xl font-semibold text-black">
                Is sm: 
                <span :class="['font-normal', sm ? 'text-green-500' : 'text-red-500']">
                    {{ sm }}
                </span>
            </p>
            <p class="text-xl font-semibold text-black">
                Is md: 
                <span :class="['font-normal', md ? 'text-green-500' : 'text-red-500']">
                    {{ md }}
                </span>
            </p>
            <p class="text-xl font-semibold text-black">
                Is lg: 
                <span :class="['font-normal', lg ? 'text-green-500' : 'text-red-500']">
                    {{ lg }}
                </span>
            </p>
            <p class="text-xl font-semibold text-black">
                Is xl: 
                <span :class="['font-normal', xl ? 'text-green-500' : 'text-red-500']">
                    {{ xl }}
                </span>
            </p>
        </div>
        <div id="title-composable">
            <h1 class="text-3xl font-semibold text-black">Use Title Composable: </h1>
            <input 
             type="text" 
             placeholder="Type a title here..."
             class="p-3 text-xl font-semibold text-black placeholder-gray-500 rounded-lg placeholder:italic" 
             v-model="title"
            />
        </div>
        <div id="ref-history-composable">
            <h1 class="text-3xl font-semibold text-black">Use Ref History Composable: </h1>
            <p class="text-xl font-semibold text-black">Count: <span class="font-normal">{{ count }}</span></p>
            <div class="my-3 overflow-y-auto border border-white border-solid h-28">
                <p
                 v-for="(h, index) in history"
                 :key="index"
                 class="text-xl font-semibold text-black"
                >
                    {{ new Date(h.timestamp).toLocaleString()}} : {{ h.snapshot }}
                </p>
            </div>
            <div class="space-x-7">
                <button 
                    class="p-3 text-xl font-semibold text-black bg-green-500 rounded-lg hover:bg-green-600"
                    @click="count++"
                >
                    Increment
                </button>
                <button 
                    class="p-3 text-xl font-semibold text-black bg-red-500 rounded-lg hover:bg-red-600"
                    @click="count--"
                >
                    Decrement
                </button>
                <button 
                    class="p-3 text-xl font-semibold text-black bg-green-500 rounded-lg hover:bg-green-600"
                    @click="undo()"
                >
                    Undo
                </button>
                <button 
                    class="p-3 text-xl font-semibold text-black bg-green-500 rounded-lg hover:bg-green-600"
                    @click="redo()"
                > 
                    Redo
                </button>
            </div>
        </div>
        <div id="color-mode-composable">
            <h1 class="text-3xl font-semibold text-black">Use Color Mode Composable: </h1>
            <div 
             class="relative inline-block w-10 mr-2 duration-300 ease-in-out select-none " 
             @click="changeColorMode"
            >
                <input 
                 type="checkbox" 
                 class="absolute right-0 w-6 h-6 align-middle bg-white border-4 rounded-full appearance-none cursor-pointer"
                 :class="[mode === 'dark' ? 'right-0 bg-slate-900 ' : 'left-0 bg-slate-50']"
                />
                <label 
                 for="toggle" 
                 class="block h-6 overflow-hidden bg-green-300 rounded-full cursor-pointer toggle-label"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// Mouse Composable
import { useMouse } from '../composables/mouse';
const { x, y } = useMouse();

//Breackpoint Composable using VueUse
import {useBreakpoints} from '@vueuse/core';
const breackpoint = useBreakpoints({ sm: 768, md: 991, lg: 1200, xl: 1279});
const sm = breackpoint.between('sm', 'md');
const md = breackpoint.between('md', 'lg');
const lg = breackpoint.between('lg', 'xl');
const xl = breackpoint.greaterOrEqual('xl');

// Tittle Composable using VueUse
import { useTitle } from '@vueuse/core';
const title = ref('')
useTitle(title, {titleTemplate:'Composable Sandbox | %s'});

//Ref History Composable using VueUse
import {useRefHistory} from '@vueuse/core';
const count = ref(0);
const {undo, redo, history} = useRefHistory(count);


// Color Mode Composable using VueUse
import { useColorMode } from '@vueuse/core';
const mode = useColorMode();

const changeColorMode = () =>{
    if(mode.value === 'light'){
        mode.value = 'dark';
    }else{
        mode.value = 'light';
    }
}


</script>