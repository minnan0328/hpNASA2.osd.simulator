<template>
    <div v-if="mainSectionNodes || secondarySectionNodes" :class="['setting', { 'two-columns': isTwoColumns }]">
        <template v-if="mainSectionNodes && mainSectionNodes.mode != ModeType.exit">
            <div class="main-section">

                <div class="setting-item unset-grid" v-if="currentPanelNumber == 4">
                    <div class="item border-bottom-line" v-text="toLanguageText(mainSectionNodes.language!)"></div>
                </div>

                <template v-for="(secondNodes, secondNodesIdx) in mainSectionNodes.nodes">
                    <div v-if="isEnableNode(secondNodes) && mainSectionNodes.mode && handlePagination(mainSectionNodes, secondNodesIdx) && secondNodes.key != 'Exit'" 
                        :class="['setting-item', secondNodes.key, { 'unset-grid': isTwoColumns }]">

                        <previousPageButtons
                            :currentNodes="secondNodes"
                            :nodes="secondarySectionNodes"
                            :previousNodes="mainSectionNodes">
                        </previousPageButtons>
                        
                        <info :currentNode="secondNodes"></info>

                        <buttonItem
                            :currentNode="secondNodes"
                            :nodes="secondarySectionNodes"
                            :previousNodes="mainSectionNodes"
                            :childNodes="thirdSectionNodes"
                            :bottomLine="false">
                        </buttonItem>

                        <customizeRadio
                            :currentNode="secondNodes" :nodes="secondarySectionNodes"
                            :previousNodes="mainSectionNodes" :bottomLine="false">
                        </customizeRadio>

                        <customizeCheckbox
                            :currentNode="secondNodes" :nodes="secondarySectionNodes"
                            :previousNodes="mainSectionNodes" :bottomLine="false">
                        </customizeCheckbox>

                        <!-- 設定狀態 -->
                        <div class="item state-item" v-if="secondNodes.displayState">
                            <span class="state" >state：{{toDisplayValueLanguageText(secondNodes)}}</span>
                        </div>
                        <!-- 設定狀態 -->

                        <nextPageButtons
                            :currentNodes="secondNodes"
                            :nodes="secondarySectionNodes"
                            :previousNodes="mainSectionNodes">
                        </nextPageButtons>

                        <!-- value -->
                        <div v-if="isShowValue(secondNodes, mainSectionNodes)"
                            :class="['item item-value', { disabled: secondNodes.disabled }]">
                            <span v-if="secondNodes.mode != ModeType.info" v-text="toDisplayValueLanguageText(secondNodes)"></span>
                            <span v-else-if="secondNodes.mode == ModeType.info" v-text="secondNodes.result"></span>
                            <span v-if="secondNodes.unit" v-text="toLanguageText(secondNodes.unit)"></span>
                        </div>
                        <!-- value -->
                    </div>
                </template>
            </div>
            <div v-if="mainSectionNodes && secondarySectionNodes && secondarySectionNodes.nodes" 
                :class="['secondary-section', { 'customRGB-range-section': secondarySectionNodes.key == 'CustomRGB' }]">

                <template v-for="(thirdNodes, thirdNodesIdx) in secondarySectionNodes.nodes">
                    <div :class="['setting-item unset-grid', thirdNodes.key]"
                        v-if="isEnableNode(thirdNodes) && thirdNodes.mode != ModeType.verticalRange
                            && isEnableNode(thirdNodes) && thirdNodes.mode != ModeType.horizontalRange
                            && handlePagination(secondarySectionNodes, thirdNodesIdx)">
                        
                        <previousPageButtons
                            :currentNodes="thirdNodes"
                            :nodes="thirdSectionNodes"
                            :previousNodes="secondarySectionNodes">
                        </previousPageButtons>

                        <info :currentNode="thirdNodes"></info>
                        
                        <buttonItem
                            :currentNode="thirdNodes"
                            :nodes="thirdSectionNodes"
                            :previousNodes="secondarySectionNodes"
                            :currentPanelNumber="currentPanelNumber"
                            :bottomLine="thirdNodes.key == 'Volume'">
                        </buttonItem>
                        
                        <customizeRadio
                            :currentNode="thirdNodes" :nodes="thirdSectionNodes"
                            :previousNodes="secondarySectionNodes" :bottomLine="secondarySectionNodes.key == 'Audio'">
                        </customizeRadio>
                        
                        <customizeCheckbox
                            :currentNode="thirdNodes" :nodes="thirdSectionNodes"
                            :previousNodes="secondarySectionNodes" :bottomLine="secondarySectionNodes.key != 'Audio'">
                        </customizeCheckbox>

                        <!-- 設定狀態 -->
                        <div class="item state-item" v-if="thirdNodes.displayState">
                            <span class="state" >state：{{toDisplayValueLanguageText(thirdNodes)}}</span>
                        </div>
                        <!-- 設定狀態 -->

                        <nextPageButtons
                            :currentNodes="thirdNodes"
                            :nodes="thirdSectionNodes"
                            :previousNodes="secondarySectionNodes">
                        </nextPageButtons>
                    </div>
                    <verticalRange :currentNode="thirdNodes" :nodes="thirdSectionNodes"></verticalRange>
                    <horizontalRange :currentNode="thirdNodes" :nodes="thirdSectionNodes"></horizontalRange>
                </template>

                <div class="setting-item factory-reset-image" v-if="secondarySectionNodes.key == 'FactoryReset'">
                    <img src="@/assets/images/energy-star.jpg" alt="">
                </div>

                <div class="setting-item image-scaling" v-if="secondarySectionNodes.key == 'ImageScaling'">
                    <p>The “Image Scaling” OSD menu for this product is disabled for all 16:9 aspect ratio resolutions.</p>
                    <br/>
                    <p>But for this OSD training simulation, the menu will remain active for the simulated 1920x1080 resolution.</p>
                </div>

            </div>
        </template>
        <template v-if="mainSectionNodes && mainSectionNodes.mode == ModeType.exit">
            <div class="full-image">
                <img src="@/assets/images/hp-old-logo.svg" alt="">
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { Nodes } from '@/types';
import { ModeType } from '@/types';
import { isEnableNode, toLanguageText, toDisplayValueLanguageText } from '@/service/service';
// components
import info from './_info.vue';
import buttonItem from './_button-item.vue';
import verticalRange from './_vertical-range.vue';
import horizontalRange from './_horizontal-range.vue';
import customizeCheckbox from './_customize-checkbox.vue';
import customizeRadio from './_customize-radio.vue';
import previousPageButtons from './_previous-page-buttons.vue';
import nextPageButtons from './_next-page-button.vue';

const props = defineProps({
    mainSectionNodes: {
        type: Object as PropType<Nodes | null>,
        default: null
    },
    secondarySectionNodes: {
        type: Object as PropType<Nodes | null>,
        default: null
    },
    thirdSectionNodes: {
        type: Object as PropType<Nodes | null>,
        default: null
    },
    currentPanelNumber: {
        type: Number,
        default: 0
    }
});

function isShowValue(Nodes: Nodes, previousNodes: Nodes) {
    return !props.secondarySectionNodes && Nodes.displayValue
            || props.secondarySectionNodes && !props.secondarySectionNodes!.nodes && !props.thirdSectionNodes && Nodes.result && Nodes.displayValue
            || props.secondarySectionNodes && !props.secondarySectionNodes!.nodes && !props.thirdSectionNodes && Nodes.result == 0 && Nodes.displayValue;
}

const isTwoColumns = computed(() => {
    return props.secondarySectionNodes?.nodes && props.secondarySectionNodes?.nodes!.length! > 0;
});


function handlePagination(node: Nodes, index: number) {
    return index > ((node.size * (node.page - 1)) - 1)&& index <= (node.size * (node.page));
};

</script>
<style lang="scss" scoped></style>