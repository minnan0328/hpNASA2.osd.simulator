<template>
    <div class="modal toast auto-adjustment" v-if="open && message">
        <div class="image">
            <img :src="images" alt="">
        </div>
        <div>
            <p>{{ toLanguageText(message) }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { onMounted } from 'vue';
import type { Language } from '@/types/index';
import { toLanguageText } from '@/service/to-display-language-text';

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    message: {
        type: Object as PropType<Language | null>,
        default: null
    },
    images: {
        type: String,
        default: ""
    }
});

</script>
<style lang="scss" scoped>
</style>