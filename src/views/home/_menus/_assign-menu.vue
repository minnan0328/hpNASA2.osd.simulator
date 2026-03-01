<template>
    <div :class="['assign-setting', mainSectionNodes!.key]">
        <template v-for="secondNodes in mainSectionNodes!.nodes">
            <div :class="['setting-item', secondNodes.key, { 'unset-grid': secondNodes.mode != ModeType.info }]"
                v-if="isEnableNode(secondNodes) 
                && secondNodes.key != ResetNodesEnum.key
                && isEnableNode(secondNodes) && secondNodes.key != BackNodesEnum.key
                && isEnableNode(secondNodes) && secondNodes.mode != ModeType.verticalRange
                && secondNodes.assignDisplay">
                
                <info :currentNode="secondNodes"></info>

                <buttonItem
                    :currentNode="secondNodes"
                    :nodes="secondarySectionNodes"
                    :previousNodes="mainSectionNodes"
                    :bottomLine="false">
                </buttonItem>

                <customizeRadio
                    :currentNode="secondNodes" :nodes="secondarySectionNodes"
                    :previousNodes="mainSectionNodes" :bottomLine="false">
                </customizeRadio>

                <!-- value -->
                <template v-if="secondNodes.mode == ModeType.info">
                    <div :class="['item item-value', {
                        disabled: secondNodes.disabled
                    }]">
                        <span v-text="secondNodes.result"></span>
                    </div>
                </template>
                <!-- value -->
            </div>
            <verticalRange :currentNode="secondNodes"></verticalRange>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Nodes } from '@/types';
import { ModeType } from '@/types';
import { isEnableNode } from '@/service/service';
// components
import info from './_info.vue';
import buttonItem from './_button-item.vue';
import verticalRange from './_vertical-range.vue';
import customizeRadio from './_customize-radio.vue';

import { BackNodes, ResetNodes, ExitNodes } from '@/models/class/_utilities';

const BackNodesEnum = new BackNodes();
const ResetNodesEnum = new ResetNodes();
const ExitNodesEnum = new ExitNodes();

const props = defineProps({
    mainSectionNodes: {
        type: Object as PropType<Nodes | null>,
        default: null
    },
    secondarySectionNodes: {
        type: Object as PropType<Nodes | null>,
        default: null
    }
});

</script>

<style lang="scss" scoped>

</style>