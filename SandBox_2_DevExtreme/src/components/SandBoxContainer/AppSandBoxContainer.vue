<script setup lang="ts">
export interface SandBoxContainerProps{
  title?: string;
}

const props = withDefaults(defineProps<SandBoxContainerProps>(), {
  title: 'SandBox Container'
});
</script>

<template>
  <div class="space-y-7">
    <h1 class="text-4xl font-semibold">{{ props.title }}</h1>
    <slot />
  </div>
</template>