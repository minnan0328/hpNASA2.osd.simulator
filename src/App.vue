<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import config from '@/config/config';

onMounted(() => {
	document.title = `${config.company}_${config.screenModel}`;
});
</script>

<template>
	<RouterView />
</template>

<style lang="scss" scoped>

</style>
