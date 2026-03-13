<template>
    <div class="menu-wrapper">
        <!-- 全部的選單 -->
        <div :class="['menus', { 'accessibility': menuStateResult.accessibility }]" v-if="openAllMenu && menuState.menuPanel">
            <div class="header">
                <p>{{config.company}} {{config.screenModel}}</p>
            </div>
    
            <div class="body">
                <div class="sidebar">
                    <div class="hp-logo">
                        <img src="@/assets/images/hp-old-logo.svg" alt="">
                    </div>
                    <div class="options">
                        <template  v-for="menu in menus.nodes" v-text="toLanguageText(menu.language)">
                            <div :class="['option', { selected: menuState.menuPanel?.key == menu.key, focus: menuState.menuPanel?.key == menu.key && menuState.secondPanel }]"
                                v-if="isEnableNode(menu)" v-text="toLanguageText(menu.language)">
                            </div>
                        </template>
                    </div>
                </div>
    
                <settingSection v-model:mainSectionNodes="displayCurrentNodes.mainSectionNodes"
                                v-model:secondarySectionNodes="displayCurrentNodes.secondarySectionNodes"
                                v-model:thirdSectionNodes="displayCurrentNodes.thirdSectionNodes"
                                v-model:currentPanelNumber="menuState.currentPanelNumber">
                </settingSection>
            </div>
    
            <div class="footer">
                <div class="current-mode">
                    {{ toLanguageText(menuStateResult.information.currentMode.language) }}: {{ menuStateResult.information.currentMode.selected }}
                </div>
                <div class="current-input">
                    {{ toLanguageText(menuStateResult.input.language) }}: {{ menuStateResult.input.selected }}
                </div>
            </div>
        </div>
        <!-- 全部的選單 -->

        <!-- 自訂的小選單 -->
        <div :class="['menu assign-menu', menuState.menuPanel.key, { 'accessibility': menuStateResult.accessibility }]"
            v-if="openAssignButton && menuState.menuPanel">
            <div class="header">
                <p>{{ toLanguageText(menuState.menuPanel.language!) }}</p>
            </div>
            <div class="body">
                <assignMenu
                    v-model:mainSectionNodes="menuState.menuPanel"
                    v-model:secondarySectionNodes="menuState.secondPanel">
                </assignMenu>
            </div>
        </div>
        <!-- 自訂的小選單 -->
        
        <!-- 原廠設定改變的 conform -->
        <confirm v-if="confirmState.openConfirm"
            v-model:mainSectionNodes="confirmState.confirmMainPanel"
            v-model:secondarySectionNodes="confirmState.confirmSecondPanel"
            v-model:thirdSectionNodes="confirmState.confirmThirdPanel">
        </confirm>
        <!-- 原廠設定改變的 conform -->

        <!-- 控制選單按鈕 -->
        <div :class="['controller-menus', { 'accessibility': menuStateResult.accessibility }]" v-if="openControllerMenus">
            <template v-for="currentButton in handleControllerButtonList">
                <div class="menu-item" v-if="currentButton.image">
                    <img :src="currentButton?.image" alt="">
                </div>
                <div class="menu-item" v-else></div>
            </template>
        </div>
        <!-- 控制選單按鈕 -->

        <!-- 控制選單按鈕-點擊範圍 -->
        <div class="controller">
            <template v-if="openMonitor && showScreen && !openControllerMenus">
                <button :class="['controller-btn', { 'show-guide':  showMonitorStatus}]" @click="handlerControllerMenus"></button>
                <button :class="['controller-btn', { 'show-guide':  showMonitorStatus}]" @click="handlerControllerMenus"></button>
                <button :class="['controller-btn', { 'show-guide':  showMonitorStatus}]" @click="handlerControllerMenus"></button>
                <button :class="['controller-btn', { 'show-guide':  showMonitorStatus}]" @click="handlerControllerMenus"></button>
            </template>
            <template v-else v-for="currentButton in handleControllerButtonList">
                <button v-if="currentButton.type == 'Button'" class="controller-btn" @click="currentButton.event"></button>
                <button v-if="currentButton.type == 'eventButton'" class="controller-btn"
                @mousedown="currentButton.event"
                @mouseup="currentButton.stopEvent"
                @mouseleave="currentButton.stopEvent"
                @touchstart.passive="currentButton.event"
                @touchend.passive="currentButton.stopEvent">
                </button>
            </template>
            <slot name="openMonitor"></slot> 

            <div class="power-guide" v-if="!openMonitor">Power Button</div>
            <div class="menu-buttons-guide" v-if="showMonitorStatus">Menu Buttons</div>
        </div>
        <!-- 控制選單按鈕-點擊範圍 -->
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from 'vue';
import { useStore, MenusDefaultModel } from '@/stores/index';
import type { StoreState } from '@/stores/index';
import type { Nodes, ControllerButtonList, HomeEvent } from '@/types';
import { ModeType } from '@/types';
import { isEnableNode, toLanguageText, toLowerCaseFirstChar } from '@/service/service';
import { menuStateResult } from '@/service/monitor-state-result';

import config from '@/config/config';

// components
import settingSection from './_setting-section.vue';
import assignMenu from './_assign-menu.vue';
import confirm from '@/views/home/_confirm/confirm.vue';
// svg
import iconAllMenu from '@/assets/icons/icon-menu.svg';
import iconBrightness from '@/assets/icons/icon-brightness.svg';
import iconColor from '@/assets/icons/icon-color.svg';
import iconInput from '@/assets/icons/icon-input.svg';
import iconNext from '@/assets/icons/icon-next.svg';
import iconNextRight from '@/assets/icons/icon-next-right.svg';
import iconArrowBottom from '@/assets/icons/icon-arrow-bottom.svg';
import iconArrowUp from '@/assets/icons/icon-arrow-up.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';
import iconArrowRight from '@/assets/icons/icon-arrow-right.svg';
import iconClose from '@/assets/icons/icon-close.svg';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconSubtract from '@/assets/icons/icon-subtract.svg';
import iconAdd from '@/assets/icons/icon-add.svg';
import iconPrevious from '@/assets/icons/icon-previous.svg';
import iconInformation from '@/assets/icons/icon-information.svg';
import iconAutoAdjustment from '@/assets/icons/icon-auto-adjustment.svg';

import PowerConfirmChangeNodes from '@/models/class/power/message/confirm-change';

import BrightnessNodes from '@/models/class/brightness/_brightness-nodes';
import ContrastNodes from '@/models/class/brightness/_contrast-nodes';
import VideoLevelNodes from '@/models/class/brightness/_video-level-nodes';

import ColorNodes from '@/models/class/color/color';
import CustomRGBNodes from '@/models/class/color/_custom-RGB-nodes';

import MenuPositionNodes from '@/models/class/menu/_menu-position-nodes';
import LanguageNodes from '@/models/class/menu/_language-nodes';

import FactoryResetNodes from '@/models/class/management/_factory-reset-nodes';
import AccessibilityNodes from '@/models/class/management/_accessibility-nodes';

import InputNodes from '@/models/class/input/input';

import AutoAdjustmentNodes from '@/models/class/image/_auto-adjustment-nodes';

import { 
    AssignAutoAdjustmentNodes, AssignBrightnessNodes,
    AssignColorNodes, AssignDisplayInformationNodes,
    AssignNextActiveInputNodes, AssignEmptyNodes
} from '@/models/class/menu/assign-buttons/_utilities';

import {
    DefaultNodes, BackNodes, ResetNodes, ExitNodes,
    OnNodes, OffNodes, YesNodes, NoNodes,
    NextPageButtonsNodes, PreviousPageButtonsNodes
} from '@/models/class/_utilities';
import { setBrightnessDefaultValue, setDynamicContrastValue } from '@/service/set-default-value';
const MenusDefaultEnum = new MenusDefaultModel();

const BrightnessNodesEnum = new BrightnessNodes();
const ContrastNodesEnum = new ContrastNodes();
const VideoLevelNodesEnum = new VideoLevelNodes();

const ColorNodesEnum = new ColorNodes();
const CustomRGBNodesEnum = new CustomRGBNodes();

const MenuPositionNodesEnum = new MenuPositionNodes();
const LanguageNodesEnum = new LanguageNodes();

const FactoryResetNodesEnum = new FactoryResetNodes();
const AccessibilityNodesEnum = new AccessibilityNodes();

const InputNodesEnum = new InputNodes();

const AutoAdjustmentNodesEnum = new AutoAdjustmentNodes();


const DefaultNodesEnum = new DefaultNodes();
const BackNodesEnum = new BackNodes();
const ResetNodesEnum = new ResetNodes();
const ExitNodesEnum = new ExitNodes();
const OnNodesEnum = new OnNodes();
const OffNodesEnum = new OffNodes();
const YesNodesEnum = new YesNodes();
const NoNodesEnum = new NoNodes();
const NextPageButtonsNodesEnum = new NextPageButtonsNodes();
const PreviousPageButtonsNodesEnum = new PreviousPageButtonsNodes();

const AssignAutoAdjustmentNodesEnum = new AssignAutoAdjustmentNodes();
const AssignBrightnessNodesEnum = new AssignBrightnessNodes();
const AssignColorNodesEnum = new AssignColorNodes();
const AssignDisplayInformationNodesEnum = new AssignDisplayInformationNodes();
const AssignNextActiveInputNodesEnum = new AssignNextActiveInputNodes();
const AssignEmptyNodesEnum = new AssignEmptyNodes();

const PowerConfirmChangeNodesEnum = new PowerConfirmChangeNodes();

const store = useStore();

const homeEvent = inject("homeEvent") as HomeEvent;

const props = defineProps({
    openMonitor: { type: Boolean, default: false },
    startUpFinish: { type: Boolean, default: false },
    showScreen: { type: Boolean, default: false },
    showMonitorStatus: { type: Boolean, default: false },
    openToast: { type: Boolean, default: false },
    enabledLanguageDirection: { type: Boolean, default: false }
});

const emit = defineEmits(['update:showScreen', 'update:showMonitorStatus', 'update:startUpFinish', 'update:enabledLanguageDirection']);

const menuTimeOutIntervalId = ref<number | null>(null);

const openControllerMenus = ref(false);
const openAllMenu = ref(false);
const openAssignButton = ref(false);
const factorySettings = ref(true);

const menus = computed(() => {
    return {
        ...DefaultNodesEnum,
        key: "menu",
        size: 9,
        page: 1,
        mode: ModeType.button,
        nodes: [
            store.$state.brightnessPlus,
            store.$state.color,
            store.$state.image,
            store.$state.input,
            store.$state.power,
            store.$state.menu,
            store.$state.management,
            store.$state.information,
            store.$state.exit
        ]
    }
});

// selected menuState and node
const menuState = reactive({
    menuPanel: null as Nodes | null,
    secondPanel: null as Nodes | null,
    thirdPanel: null as Nodes | null,
    fourthPanel: null as Nodes | null,
    temporaryStorage: null as Nodes | null, // node 的 livePreview 為 true 時才使用，紀錄上一次的設定值
    currentPanelNumber: 0,
    menuPanelIndex: 0,
    secondPanelIndex: 0,
    thirdPanelIndex: 0,
    fourthPanelIndex: 0,
    assignPanelOrderIndex: 0
});

const displayCurrentNodes = computed(() => {
    // 當選擇第四層時，將原本畫面第二層改為第三層，原本第三層改為第四層
    if(menuState.thirdPanel && menuState.thirdPanel.nodes && menuState.fourthPanel) {
        return {
            mainSectionNodes: menuState.secondPanel,
            secondarySectionNodes: menuState.thirdPanel,
            thirdSectionNodes: menuState.fourthPanel,
            currentPanelNumber: menuState.currentPanelNumber
        }
    } else {
        // 當不是第四層時，顯示第二層級第三層畫面
        return {
            mainSectionNodes: menuState.menuPanel,
            secondarySectionNodes: menuState.secondPanel,
            thirdSectionNodes: menuState.thirdPanel,
            currentPanelNumber: menuState.currentPanelNumber
        }
    }
});

// 自訂選單功能表
const assignMenus = computed(() => {
    return {
        [AssignAutoAdjustmentNodesEnum.key]: {
            key: AssignAutoAdjustmentNodesEnum.key,
            icon: iconAutoAdjustment,
            node: AssignAutoAdjustmentNodesEnum
        },
        [AssignBrightnessNodesEnum.key]: {
            key: AssignBrightnessNodesEnum.key,
            icon: iconBrightness,
            node: store.$state.brightnessPlus.nodes[0]
        }, 
        [AssignColorNodesEnum.key]: {
            key: AssignColorNodesEnum.key,
            icon: iconColor,
            node: store.$state.color
        },
        [AssignDisplayInformationNodesEnum.key]: {
            key: AssignDisplayInformationNodesEnum.key,
            icon: iconInformation,
            node: store.$state.information
        },
        [AssignNextActiveInputNodesEnum.key]: {
            key: AssignNextActiveInputNodesEnum.key,
            icon: iconInput,
            node: store.$state.input
        },
        [AssignEmptyNodesEnum.key]: {
            key: AssignEmptyNodesEnum.key,
            icon: null,
            node: null
        }
    }
});

// 取得自訂選單項目
const getAssignButton = computed(() => {
    return [
        assignMenus.value[`Assign${(store.$state.menu.nodes[5].nodes![0].result as string).replace(/\s/g, '')}`],
        assignMenus.value[`Assign${(store.$state.menu.nodes[5].nodes![1].result as string).replace(/\s/g, '')}`],
        assignMenus.value[`Assign${(store.$state.menu.nodes[5].nodes![2].result as string).replace(/\s/g, '')}`]
    ]
});

// 小選單項目順序
const assignPanelOrder = reactive([
    AssignBrightnessNodesEnum.key, AssignColorNodesEnum.key,
    AssignDisplayInformationNodesEnum.key, AssignNextActiveInputNodesEnum.key
]);

// power confirm message menuState
const confirmState = reactive({
    openConfirm: false,
    selectedMenus: null as string | null,
    confirmMainPanel: null as Nodes | null,
    confirmSecondPanel: null as Nodes | null,
    confirmThirdPanel: null as Nodes | null,
    confirmThirdPanelIndex: 0
});

// 是否開啟OSD Message，當是原廠設定時，且 OSD Message 是啟用時
const isOpenOSDMessage = computed(() => factorySettings.value && store.$state.menu.nodes[4].result.includes(store.$state.menu.nodes[5].nodes[2].result))

// 當關閉螢幕時，關閉所有狀態
watch(() => props.openMonitor, (newVal, oldVal) => {
    if(newVal == false) {
        handlerClose();
    };
});

// 開啟控制選單
function handlerControllerMenus() {
    if(props.openMonitor && props.showMonitorStatus && props.startUpFinish == false && !props.openToast) {
        emit("update:showMonitorStatus", false);
        emit("update:startUpFinish", true);
    }

    if(props.openMonitor && props.startUpFinish) {
        openControllerMenus.value = true;
    };
};

// 開啟主要選單
function handlerOpenAllMenu() {
    openAllMenu.value = true;
    openAssignButton.value = false;
    selectedMenuPanel(menus.value.nodes[0]);

    handlerMenuTimeout();
};

// 開啟自訂選單按鈕
function handleAssignButton(key: string) {
    if(key == AssignEmptyNodesEnum.key) {
        return;
    }

    if(key == AssignNextActiveInputNodesEnum.key) {
        openAllMenu.value = true;
        selectedMenuPanel(assignMenus.value[key].node as Nodes);
        handlerNextPanel();
    } else if(key == AssignAutoAdjustmentNodesEnum.key) {
        handlerClose();
        homeEvent.autoAdjustment();
        return;
    } else {
        menuState.menuPanel = null;
        menuState.secondPanel = null;
        menuState.menuPanelIndex = 0;
        menuState.secondPanelIndex = 0;
        menuState.assignPanelOrderIndex = assignPanelOrder.findIndex(a => a == key);
        openAssignButton.value = true;
        selectedMenuPanel(assignMenus.value[key].node as Nodes);
        handlerNextPanel();
    }

    handlerMenuTimeout();
};

/* 設定選擇的 menu */
function selectedMenuPanel(nodes: Nodes) {
    menuState.menuPanel = menuState.menuPanel ? menuState.menuPanel : nodes;
    menuState.currentPanelNumber = menuState.currentPanelNumber > 0 ? menuState.currentPanelNumber : 1;

    if(openAssignButton.value && menuState.currentPanelNumber > 1) {
        handlerNextPanel();
    }
};
/* 設定選擇的 menu */

/* 控制選單按鈕組合列表 */
// 是否啟用選單控制按鈕
const isControllerMenusButton = computed(() => openControllerMenus.value && !openAllMenu.value && !openAssignButton.value && !confirmState.openConfirm);

const ControllerTypes: Record<string, ControllerButtonList> = reactive({
    empty: { image: null, event: () => {}, stopEvent: () => {}, type: "Button" },
    close: { image: iconClose, event: handlerClose, stopEvent: () => {}, type: "Button" },
    checkClose: { image: iconCheck, event: handlerClose, stopEvent: () => {}, type: "Button" },
    checkSave: { image: iconCheck, event: handlerSave , stopEvent: () => {}, type: "Button" },
    nextSave: { image: iconNext, event: handlerSave , stopEvent: () => {}, type: "Button" },
    checkNextPanel: { image: iconCheck, event: handlerNextPanel, stopEvent: () => {}, type: "Button" },
    arrowBottom: { image: iconArrowBottom, event: handlerNavigationDown, stopEvent: stopNavigationTrigger, type: "eventButton" },
    arrowUp: { image: iconArrowUp, event: handlerNavigationUp, stopEvent: stopNavigationTrigger, type: "eventButton" },
    arrowRight: { image: iconArrowRight, event: () => { handlerNavigation('up') }, stopEvent: () => {}, type: "Button" },
    arrowLeft: { image: iconArrowLeft, event: () => { handlerNavigation('down') }, stopEvent: () => {}, type: "Button" },
    previous: { image: iconPrevious, event: handlePrevious, stopEvent: () => {}, type: "Button" },
    next: { image: iconNext, event: handlerNextPanel, stopEvent: () => {}, type: "Button" },
    nextRight: { image: iconNextRight, event: () => handlerNavigation('down'), stopEvent: () => {}, type: "Button" },
    nextAssignRight: { image: iconNextRight, event: handlerAssignNextPanel, stopEvent: () => {}, type: "Button" },
    rangeSubtract: { image: iconSubtract, event: handlerRangeSubtract, stopEvent: stopRangeValueTrigger, type: "eventButton" },
    rangeAdd: { image: iconAdd, event: handlerRangeAdd, stopEvent: stopRangeValueTrigger, type: "eventButton" },
    confirmClose: { image: iconClose, event: handlerCloseConfirmAction, stopEvent: () => {}, type: "Button" }
});

const confirmButtonList:ControllerButtonList[] = [ ControllerTypes.checkSave, ControllerTypes.arrowLeft, ControllerTypes.arrowRight, ControllerTypes.confirmClose ];

const handleControllerButtonList = computed<ControllerButtonList[] | null>(() => {
    if(!props.openMonitor) return[];

    if(isControllerMenusButton.value) {
        // 開啟螢幕及開啟全部選單列表時候的組合
        return [
            { image: iconAllMenu, event: handlerOpenAllMenu, stopEvent: () => {}, type: "Button" },
            { image: getAssignButton.value[2].icon, event: () => handleAssignButton(getAssignButton.value[2].key), stopEvent: () => {}, type: "Button"},
            { image: getAssignButton.value[1].icon, event: () => handleAssignButton(getAssignButton.value[1].key), stopEvent: () => {}, type: "Button" },
            { image: getAssignButton.value[0].icon, event:() => handleAssignButton(getAssignButton.value[0].key), stopEvent: () => {}, type: "Button" }
        ]
    } 
    
    if (openAllMenu.value) {
        return createMenuButtonList();
    }
    
    if(openAssignButton.value && menuState.menuPanel) {
        return handlerModeControllerButtonList(menuState.secondPanel!, menuState.menuPanel);
    } 
    
    if(confirmState.openConfirm && confirmState.confirmMainPanel) {
        return confirmButtonList;
    }

    return [];
});

function createMenuButtonList(): ControllerButtonList[] {
    if (!menuState.secondPanel) {
        return createFirstLayerButtonList();
    }

    if (menuState.thirdPanel) {
        return menuState.fourthPanel
            ? handlerModeControllerButtonList(menuState.fourthPanel, menuState.thirdPanel)
            : handlerModeControllerButtonList(menuState.thirdPanel, menuState.secondPanel);
    }

    return handlerModeControllerButtonList(menuState.secondPanel, menuState.menuPanel!);
}

function createFirstLayerButtonList(): ControllerButtonList[] {
    const mode = menuState.menuPanel?.mode as string;
    const buttonMap: Record<string, ControllerButtonList[]> = {
        [ModeType.info]: [ControllerTypes.empty, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.close],
        [ModeType.exit]: [ControllerTypes.checkClose, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.close],
        default: [ControllerTypes.next, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.close],
    };

    return buttonMap[mode] || buttonMap.default;
}

function handlerModeControllerButtonList(nodes: Nodes, previousNodes: Nodes) {
    // 當下一層有節點時候的組合
    const nextButtonList: ControllerButtonList[] = [ ControllerTypes.next, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.previous ];

    // 確認選擇的按鈕組合
    const confirmedButtonList: ControllerButtonList[] = [ ControllerTypes.checkSave!, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.previous ];
    // range value 組合
    const rangeButtonList: ControllerButtonList[] = [ ControllerTypes.checkSave!,  ControllerTypes.rangeSubtract,  ControllerTypes.rangeAdd, ControllerTypes.previous ];
    // 多個 range value 組合
    const rangeNextButtonList: ControllerButtonList[] = [ ControllerTypes.nextRight, ControllerTypes.rangeSubtract, ControllerTypes.rangeAdd, ControllerTypes.previous ];
    // 多個直向 range value 組合，且最後一個時候
    const rangeNextButtonListLast: ControllerButtonList[] = [ ControllerTypes.empty, ControllerTypes.rangeSubtract, ControllerTypes.rangeAdd, ControllerTypes.previous ];
    // 多個縱向 range value 組合 unfocus
    const rangeNextButtonListUnfocus: ControllerButtonList[] = [ ControllerTypes.nextSave, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.previous ];
    // assign button 確認選擇的按鈕組合
    const confirmedAssignButtonList: ControllerButtonList[] = [ ControllerTypes.checkSave, ControllerTypes.arrowBottom, ControllerTypes.arrowUp, ControllerTypes.nextAssignRight ];
    // assign button range value 組合
    const rangeAssignButtonList: ControllerButtonList[] = [ ControllerTypes.close, ControllerTypes.rangeSubtract, ControllerTypes.rangeAdd, ControllerTypes.nextAssignRight ];
    // assign button info 組合
    const infoAssignButtonList: ControllerButtonList[] = [ ControllerTypes.checkSave, ControllerTypes.empty, ControllerTypes.empty, ControllerTypes.nextAssignRight ];
    
    // 當為 reset and back, button 下一層沒有節點的時候
    const isLastNode = nodes.key == ResetNodesEnum.key || nodes.key == BackNodesEnum.key
        || (nodes.mode == ModeType.radio || nodes.mode == ModeType.button || nodes.mode == ModeType.checkBox || nodes.mode == ModeType.paginationButton) && !nodes.nodes;

    // 單個 range value node
    const isSingleRangeNode = (nodes.mode == ModeType.verticalRange || nodes.mode == ModeType.horizontalRange) && previousNodes.nodes?.length == 1;
    // 多個縱向 range value
    const isVerticalRangeNode = nodes.mode == ModeType.verticalRange && previousNodes.nodes && previousNodes.nodes?.length > 1;
    // 多個橫向 range value
    const isHorizontalRangeNode = nodes.mode == ModeType.horizontalRange && previousNodes.nodes && previousNodes.nodes?.length > 1;

    if(openAllMenu.value) {
        if(isLastNode) {
            return confirmedButtonList;
        } 

        if(isSingleRangeNode) {
            return rangeButtonList;
        } 

        if(isVerticalRangeNode) {
            // 判斷是不是最後一個
            return nodes.key == previousNodes!.nodes![previousNodes!.nodes!.length - 1].key ? rangeNextButtonListLast : rangeNextButtonList
        } 

        if(isHorizontalRangeNode) {
            // 多個橫向 range value， 是否為focus or unfocus
            return nodes.horizontalRangeFocus ? rangeNextButtonList : rangeNextButtonListUnfocus;
        } 

        return nextButtonList;

    } 
    
    if(openAssignButton.value) {
        if(previousNodes.mode == ModeType.info) {
            return infoAssignButtonList;
        } 

        if(nodes.mode == ModeType.verticalRange ) {
            return rangeAssignButtonList;
        }

        if(nodes.mode == ModeType.radio || (nodes.mode == ModeType.button && nodes.key == ExitNodesEnum.key)) {
            return confirmedAssignButtonList;
        }

        return confirmedAssignButtonList;
    }

    return [];
}
/* 控制選單按鈕組合列表 */

/* 控制上下一個自訂選單 assign button next panel */
function handlerAssignNextPanel() {

    if(menuState.temporaryStorage) {
        menuState.menuPanel!.result = menuState.temporaryStorage.result;
        menuState.temporaryStorage = null;
        setBrightnessDefaultValue();
    };

    menuState.menuPanel = null;
    menuState.secondPanel = null;
    menuState.menuPanelIndex = 0;
    menuState.secondPanelIndex = 0;
    menuState.assignPanelOrderIndex += 1;
    menuState.assignPanelOrderIndex = menuState.assignPanelOrderIndex == assignPanelOrder.length ? 0 : menuState.assignPanelOrderIndex;
    const key = assignPanelOrder[menuState.assignPanelOrderIndex];

    if(!isEnableNode(assignMenus.value[key].node)) {
        handlerAssignNextPanel();
        return;
    }    

    selectedMenuPanel(assignMenus.value[key].node as Nodes);
    handlerNextPanel();
    handlerMenuTimeout();
};
/* 控制上下一個自訂選單 assign button next panel */

/* 選擇下一層(Panel) */
// 選擇下一層目標
function handlerNextPanel() {
    let isRadioNodes = false;

    if(menuState.menuPanel?.nodes) {
        if(!menuState.secondPanel) {
            isRadioNodes = menuState.menuPanel!.mode == ModeType.radio && !!menuState.menuPanel!.nodes;

            if(isOpenOSDMessage.value && isRadioNodes) {
                handlerSave(1);
                return
            }

            // 第二層
            selectEnabledNode(menuState.menuPanel, menuState.secondPanelIndex, (nodes, index) => {
                menuState.secondPanel = nodes;
                menuState.secondPanelIndex = index;
                menuState.currentPanelNumber = 2;

                if(isRadioNodes) {
                    handlerSave(1);
                }

                if(menuState.secondPanel!.livePreview) {
                    // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                    menuState.temporaryStorage = null;
                    menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.menuPanel));
                }

            });
        } else if(menuState.secondPanel?.nodes && !menuState.thirdPanel) {
            isRadioNodes = menuState.secondPanel!.mode == ModeType.radio && !!menuState.secondPanel!.nodes;

            if(isOpenOSDMessage.value && isRadioNodes) {
                handlerSave(2);
                return
            }

            // 第三層
            selectEnabledNode(menuState.secondPanel, menuState.thirdPanelIndex, (nodes, index) => {
                menuState.thirdPanel = nodes;
                menuState.thirdPanelIndex = index;
                menuState.currentPanelNumber = 3;

                if(menuState.thirdPanel.mode == ModeType.horizontalRange) {
                    menuState.thirdPanel.horizontalRangeFocus = true;
                }

                if(isRadioNodes) {
                    handlerSave(2);
                }

                if(menuState.thirdPanel!.livePreview) {
                    // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                    menuState.temporaryStorage = null;
                    menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.secondPanel));
                }

                // 當為診斷模式時
                if(menuState.thirdPanel.parents == "DiagnosticPatterns") {
                    store.$state.isDiagnosticPatterns = true;
                }

                if(menuState.thirdPanel.parents == LanguageNodesEnum.key) {
                    emit("update:enabledLanguageDirection", true);
                }
            });
        } else if(menuState.secondPanel!.nodes && menuState.thirdPanel && menuState.thirdPanel.nodes && !menuState.fourthPanel) {
            isRadioNodes = menuState.thirdPanel?.mode == ModeType.radio && !!menuState.thirdPanel.nodes;

            if(isOpenOSDMessage.value && isRadioNodes) {
                handlerSave(3);
                return
            }

            // 第四層
            selectEnabledNode(menuState.thirdPanel, menuState.fourthPanelIndex, (nodes, index) => {
                menuState.fourthPanel = nodes;
                menuState.fourthPanelIndex = index;
                menuState.currentPanelNumber = 4;

                if(isRadioNodes) {
                    handlerSave(3);
                }

                if(menuState.secondPanel!.livePreview) {
                    // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                    menuState.temporaryStorage = null;
                    menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.thirdPanel));
                }
            });
        }
    }

    handlerMenuTimeout();
};

// 選擇啟用的節點
function selectEnabledNode(node: Nodes, startIndex: number, setValue: (node: Nodes, index: number) => void) {
    if (node.nodes) {
        let index = startIndex;
        const length = node.nodes.length;
        let attempts = 0; // 防止無窮迴圈

        do {
            // 檢查節點是否可用且未被禁用
            if (
                isEnableNode(node.nodes[index]) && !node.nodes[index].disabled && openAllMenu.value
                || (openAssignButton.value && node.nodes[index].mode !== ModeType.info)
                || (openAssignButton.value && node.nodes[index].mode == ModeType.button && !node.nodes[index].assignDisplay)
            ) {
                let selectedIndex = (node.selected || node.selected === 0) ? node.nodes.findIndex(n => n.selected === node.selected) : index;
                index = selectedIndex >= 0 ? selectedIndex : index;
                setValue(node.nodes[index], index);
                return;
            }

            // 轉到下一個節點
            index = (index + 1) % length;
            attempts++;
        } while (index !== startIndex && attempts < length);

        // 如果無法找到有效的節點，可能需要處理錯誤情況或做一些預設處理
        console.warn("No enabled node found.");
    }
};
/* 選擇下一層(Panel) */

/* 返回上一步 */
function handlePrevious() {
    undoTheStaging();

    if(menuState.menuPanel && menuState.secondPanel && !menuState.thirdPanel) {
        menuState.secondPanel = null;
        menuState.secondPanelIndex = 0;
        menuState.currentPanelNumber = 1;

    } else if(menuState.secondPanel && menuState.thirdPanel && !menuState.fourthPanel) {
        if(menuState.thirdPanel!.mode == ModeType.verticalRange && menuState.secondPanel.nodes!.length > 1 && menuState.thirdPanelIndex != 0) {
            menuState.thirdPanelIndex -= 1;
            menuState.thirdPanel = menuState.secondPanel.nodes![menuState.thirdPanelIndex];
            return;
        }

        if(menuState.thirdPanel!.mode == ModeType.horizontalRange && menuState.thirdPanel!.horizontalRangeFocus && menuState.secondPanel.nodes!.length > 1) {
            menuState.thirdPanel!.horizontalRangeFocus = false;
            return;
        }

        menuState.thirdPanel = null;
        menuState.thirdPanelIndex = 0;
        menuState.currentPanelNumber = 2;

    } else if(menuState.secondPanel && menuState.thirdPanel && menuState.thirdPanel.nodes && menuState.fourthPanel) {
        menuState.fourthPanel = null;
        menuState.fourthPanelIndex = 0;
        menuState.currentPanelNumber = 3;
    }

    // 設定亮度
    setBrightnessDefaultValue();
    //特殊邏輯，恢復預設值
    returnToDefaultValue();
    // 選單 timeout
    handlerMenuTimeout();
};
/* 返回上一步 */


/* 處理選單項目控制 */ 
// 控制上下一個項目
function handlerNavigation(direction: 'up' | 'down') {
    const step = direction === 'up' ? -1 : 1;

    if(openAllMenu.value || openAssignButton.value) {
        if (menus.value && menuState.menuPanel?.nodes) {
            if (!menuState.secondPanel) {
                updatePanelIndex(menus.value, menuState.menuPanelIndex, step, (page, index) => {
                    if(menuState.menuPanel) {
                        menus.value.page = page;
                        menuState.menuPanelIndex = index;
                        menuState.menuPanel = menus.value.nodes[menuState.menuPanelIndex];
    
                        if(menuState.menuPanel!.livePreview) {
                            // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                            if(menuState.temporaryStorage == null) {
                                menuState.temporaryStorage = JSON.parse(JSON.stringify(menus.value));
                            };
    
                            if(menuState.menuPanel!.mode == ModeType.button || menuState.menuPanel!.mode == ModeType.radio) {
                                // 目前只有 button 及 radio 類型才需要，如有其他類型在進行判斷
                                menus.value.result = menuState.menuPanel!.result as null;
                            }
                        }
                    }
                });
            } else if (menuState.secondPanel && !menuState.thirdPanel) {
                updatePanelIndex(menuState.menuPanel, menuState.secondPanelIndex, step, (page, index) => {
                    if(menuState.menuPanel && menuState.menuPanel.nodes) {
                        menuState.menuPanel.page = page;
                        menuState.secondPanelIndex = index;
                        menuState.secondPanel = menuState.menuPanel.nodes[menuState.secondPanelIndex];
                        
                        if(menuState.secondPanel.livePreview) {
                            // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                            if(menuState.temporaryStorage == null) {
                                menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.menuPanel));
                            }
    
                            if(menuState.secondPanel.mode == ModeType.button || menuState.secondPanel.mode == ModeType.radio) {
                                // 目前只有 button 及 radio 類型才需要，如有其他類型在進行判斷
                                
                                // 預覽所選擇顏色亮度
                                if(menuState.secondPanel!.parents == ColorNodesEnum.key) {
                                    if(
                                        menuState.secondPanel!.key != BackNodesEnum.key 
                                        && menuState.secondPanel!.key != ResetNodesEnum.key
                                        && menuState.secondPanel!.key != ExitNodesEnum.key
                                    ) {
                                        menus.value.nodes[0]!.nodes![0].result = menuState.secondPanel.brightness as number;
                                    }
                                }
                                
                                menuState.menuPanel.result = menuState.secondPanel.result;
                            } 
                        } else if(
                            menuState.temporaryStorage && menuState.secondPanel.mode == ModeType.button && menuState.secondPanel.key == ExitNodesEnum.key
                            || menuState.temporaryStorage && menuState.secondPanel.mode == ModeType.button && menuState.secondPanel.key == ResetNodesEnum.key
                            || menuState.temporaryStorage && menuState.secondPanel.mode == ModeType.button && menuState.secondPanel.key == BackNodesEnum.key
                        ) {
                            menuState.menuPanel.result = menuState.temporaryStorage.result;
                            menus.value.nodes[0]!.nodes![0].result = [menuState.menuPanel.result as string];
                            menuState.temporaryStorage = null;
                            setBrightnessDefaultValue();
                        }
                    }
                });
            } else if (menuState.secondPanel && menuState.secondPanel.nodes && menuState.thirdPanel && !menuState.fourthPanel) {
                updatePanelIndex(menuState.secondPanel, menuState.thirdPanelIndex, step, (page, index) => {
                    if(menuState.secondPanel && menuState.secondPanel.nodes) {
                        menuState.secondPanel.page = page;
                        menuState.thirdPanelIndex = index;
                        menuState.thirdPanel = menuState.secondPanel.nodes[menuState.thirdPanelIndex];
    
                        if(menuState.secondPanel.nodes.length > 0) {
                            if(
                                menuState.thirdPanelIndex > 0 && menuState.secondPanel.nodes[menuState.thirdPanelIndex - 1].mode == ModeType.horizontalRange 
                                && menuState.secondPanel.nodes[menuState.thirdPanelIndex - 1].horizontalRangeFocus 
                            ) {
                                menuState.secondPanel.nodes[menuState.thirdPanelIndex - 1].horizontalRangeFocus = false;
                                menuState.thirdPanel.horizontalRangeFocus = true;
                            }
                        }
    
                        if(menuState.thirdPanel.livePreview) {
                            // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                            if(menuState.temporaryStorage == null) {
                                menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.secondPanel));
                            }
                            if(menuState.thirdPanel.mode == ModeType.button || menuState.thirdPanel.mode == ModeType.radio) {
                                // 目前只有 button 及 radio 類型才需要，如有其他類型在進行判斷
                                menuState.secondPanel.result = menuState.thirdPanel.result;
                            }
                        }
                    }
                });
            } else if (menuState.secondPanel?.nodes && menuState.thirdPanel?.nodes && menuState.fourthPanel) {
                updatePanelIndex(menuState.thirdPanel, menuState.fourthPanelIndex, step, (page, index) => {
                    if(menuState.thirdPanel && menuState.thirdPanel.nodes) {
                        menuState.thirdPanel.page = page;
                        menuState.fourthPanelIndex = index;
                        menuState.fourthPanel = menuState.thirdPanel.nodes[menuState.fourthPanelIndex];
    
                        if(menuState.fourthPanel.livePreview) {
                            // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
                            if(menuState.temporaryStorage == null) {
                                menuState.temporaryStorage = JSON.parse(JSON.stringify(menuState.thirdPanel));
                            };
    
                            if(menuState.fourthPanel.mode == ModeType.button || menuState.fourthPanel.mode == ModeType.radio) {
                                // 目前只有 button 及 radio 類型才需要，如有其他類型在進行判斷
                                menuState.thirdPanel.result = menuState.fourthPanel.result;
                            }
                        }
                    }
                });
            }
        }

        handlerMenuTimeout();

    } else if(confirmState.openConfirm) {
        if (confirmState.confirmMainPanel && confirmState.confirmSecondPanel!.nodes && confirmState.confirmThirdPanel) {
            updatePanelIndex(confirmState.confirmSecondPanel!, confirmState.confirmThirdPanelIndex!, step, (page, index) => {
                if(confirmState.confirmSecondPanel) {
                    confirmState.confirmSecondPanel.page = page;
                    confirmState.confirmThirdPanelIndex = index;
                    confirmState.confirmThirdPanel = confirmState.confirmSecondPanel.nodes![confirmState.confirmThirdPanelIndex];
                }
            });
        }
    }
};
/* 處理選單項目index */ 
function updatePanelIndex(node: Nodes, nodeIndex: number, step: number, send: (page: number, index: number) => void) {
    let index = nodeIndex;
    let page = node.page;

    const updateIndex = (idx: number, length: number) => {
        return (idx + step + length) % length;
    };

    if(node.nodes) {
        index = updateIndex(index, node.nodes.length);
        
        const oldNodes = JSON.parse(JSON.stringify(node));

        if (
            !isEnableNode(node.nodes[index]) || node.nodes[index].disabled
            // 暫時先寫死跳過
            || openAllMenu.value && node.nodes[index].key == ExitNodesEnum.key && node.nodes[index].mode != ModeType.exit
            || openAssignButton.value && node.nodes[index].key == ResetNodesEnum.key
            || openAssignButton.value && node.nodes[index].key == BackNodesEnum.key
            || openAssignButton.value && node.nodes[index].mode == ModeType.button && !node.nodes[index].assignDisplay
        ) {
            updatePanelIndex(node, index ,step, send);
        } else {
            page = Math.floor(index / node.size) + 1;
            
            if(page != oldNodes.page) {
                index += index == 0 || index == (node.nodes.length - 1)
                    ? 0 : page > oldNodes.page
                    ? 1 : -1;
            }
            send(page, index);
        }
    }
};

const DELAY_TIME = 80;

const navigationIntervalId = ref<number | null>(null);
const currentNavigationStep = ref<'up' | 'down' | null>(null);

// 開始觸發
function startNavigationTrigger(direction:  'up' | 'down') {
    currentNavigationStep.value = direction;
    // 清除現有的計時器
    if (navigationIntervalId.value !== null) {
        clearInterval(navigationIntervalId.value);
    }
    // 設置新的計時器，每隔 100 毫秒觸發一次函式
    navigationIntervalId.value = window.setInterval(() => handlerNavigation(currentNavigationStep.value!), DELAY_TIME);
};
// 停止觸發
function stopNavigationTrigger() {
    if (navigationIntervalId.value !== null) {
        clearInterval(navigationIntervalId.value);
        navigationIntervalId.value = null;
    }
    handlerMenuTimeout();
};

// 下一個項目
function handlerNavigationDown() {
    startNavigationTrigger("down");
};
// // 上一個項目
function handlerNavigationUp() {
    startNavigationTrigger("up");
};
/* 處理選單項目控制 */ 


/* 控制 range value */
// 控制 range value
function handlerRangeValue(step: string) {
    switch(menuState.currentPanelNumber) {
        case 2:
            if(menuState.menuPanel && menuState.secondPanel) { calculateValue(menuState.secondPanel, menuState.menuPanel); }
            break;
        case 3:
            if(menuState.secondPanel && menuState.thirdPanel) { calculateValue(menuState.thirdPanel, menuState.secondPanel); }
            break;
        case 4:
            if(menuState.thirdPanel && menuState.fourthPanel) { calculateValue(menuState.fourthPanel, menuState.thirdPanel); }
            break;
    };

    // 增減 range value
    function calculateValue(nodes: Nodes, previousNodes: Nodes){
        if(nodes.mode == ModeType.verticalRange || nodes.mode == ModeType.horizontalRange) {
            if(step == "subtract" && (nodes.selected as number) > nodes.rangeMin && (nodes.selected as number) <= nodes.rangeMax) {
                (nodes.selected as number) -= 1;
                (nodes.result as number) -= 1;
            } else if(step == "add" && (nodes.selected as number) >= nodes.rangeMin && (nodes.selected as number) < nodes.rangeMax) {
                (nodes.selected as number) += 1;
                (nodes.result as number) += 1;
            }

            if(previousNodes.key != CustomRGBNodesEnum.key && nodes.mode != ModeType.horizontalRange) {
                previousNodes.selected = nodes.selected;
                previousNodes.result = nodes.result;
            }

            if(previousNodes.key == BrightnessNodesEnum.key) {
                const colorResult = menus.value.nodes[1]!.nodes.find(n => n.result === menus.value.nodes[1]!.result);
                colorResult.brightness = nodes.result as number;
            }

            // 當調整亮度與對比時候，關閉動態對比
            if(previousNodes.key == BrightnessNodesEnum.key || previousNodes.key == ContrastNodesEnum.key) {
                setDynamicContrastValue();
            }

            // 特例處理 MenuPosition 的顯示值
            if(previousNodes.key == MenuPositionNodesEnum.key) {
                let menuPositionText = `H=${previousNodes.nodes![0].result}, V=${previousNodes.nodes![1].result}`;
                previousNodes.selected = menuPositionText;
                previousNodes.result = menuPositionText;
            }
        };
    }
};

const rangeIntervalId = ref<number | null>(null);
const currentRangeStep = ref<string | null>(null);

// 開始觸發
function startRangeValueTrigger(step: string) {
    currentRangeStep.value = step;
    // 清除現有的計時器
    if (rangeIntervalId.value !== null) {
        clearInterval(rangeIntervalId.value);
    }
    // 設置新的計時器，每隔 100 毫秒觸發一次函式
    rangeIntervalId.value = window.setInterval(() => handlerRangeValue(currentRangeStep.value!), DELAY_TIME);
};
// 停止觸發
function stopRangeValueTrigger() {
    if (rangeIntervalId.value !== null) {
        clearInterval(rangeIntervalId.value);
        rangeIntervalId.value = null;
    }
    handlerMenuTimeout();
};

// 控制 range value 遞減
function handlerRangeSubtract() {
    startRangeValueTrigger("subtract");
};
// 控制 range value 遞增
function handlerRangeAdd() {
    startRangeValueTrigger("add");
};
/* 控制 range value */


// 儲存選擇節點的 value
function handlerSave(currentPanelNumber: number = 0) {
    currentPanelNumber = currentPanelNumber > 0 ? currentPanelNumber : menuState.currentPanelNumber;
    if(openAllMenu.value || openAssignButton.value) {
        switch(currentPanelNumber) {
            case 2:
                if(menuState.menuPanel && menuState.secondPanel) { saveNodesValue(menuState.secondPanel, menuState.menuPanel); }
                break;
            case 3:
                if(menuState.secondPanel && menuState.thirdPanel) { saveNodesValue(menuState.thirdPanel, menuState.secondPanel); }
                break;
            case 4:
                if(menuState.thirdPanel && menuState.fourthPanel) { saveNodesValue(menuState.fourthPanel, menuState.thirdPanel); }
                break;
        };
    
        handlerMenuTimeout();
    } else if(confirmState.openConfirm) {
        saveNodesValue(confirmState.confirmThirdPanel!, confirmState.confirmSecondPanel!);
    }
};

function saveNodesValue(nodes: Nodes, previousNodes: Nodes) {
    const nodesActions: { [key: string]: () => void } = {
        // 離開選單
        [ExitNodesEnum.key]: () => handlerClose(),
        // 返回上一步
        [BackNodesEnum.key]: () => handlePrevious(),
        // 恢復當前 menu 預設值
        [ResetNodesEnum.key]: () => {
            handleResetAction(previousNodes);
            handlerNavigation("down");
        },
        // 上下一頁 目前只處理 secondaryNodesPagination(第三層畫面)
        [NextPageButtonsNodesEnum.key]: () => handlerNavigation("down"),
        [PreviousPageButtonsNodesEnum.key]: () => handlerNavigation("up"),
        // 自動調整
        [AutoAdjustmentNodesEnum.key]: () => {
            handlerClose();
            homeEvent.autoAdjustment();
        }
    };

    const previousNodesActions: { [key: string]: () => void } = {
        // 處理 Confirm 動作
        ChangingMessage: () => handleChangingMessageAction(nodes),
        [FactoryResetNodesEnum.key]: () => handleFactoryResetAction(nodes, previousNodes)
    }

    // 當為 previousNodes.key 時，執行動作
    if (previousNodes.key in previousNodesActions) {
        previousNodesActions[previousNodes.key]();
        return;
    }

    // 當為 nodes.key 時，執行動作
    if (nodes.key in nodesActions) {
        nodesActions[nodes.key]();
        return;
    }

    // 當是原廠廠設定時，且 OSD Message 是啟用時，顏色與自動休眠的選擇設定結果不一樣時
    if(isOpenOSDMessage.value && (previousNodes.key == "Color" || previousNodes.key == "AutoSleepMode") && nodes.selected != previousNodes.selected) {
        factorySettingOSDMessage(nodes, previousNodes);
        return;
    }

    if(nodes.mode == ModeType.horizontalRange && previousNodes.nodes!.length > 1) {
        nodes.horizontalRangeFocus = true;
    };

    // checkbox 處理只處理 string[]
    if(nodes.mode == ModeType.checkBox && typeof nodes.selected == "string" && Array.isArray(previousNodes.selected) && Array.isArray(previousNodes.result)) {
        let checked: boolean = (previousNodes.selected as string[]).includes(nodes.selected as string);
        checked ? previousNodes.selected.splice(previousNodes.selected.indexOf(nodes.selected), 1) : previousNodes.selected.push(nodes.selected);
        previousNodes.result = previousNodes.selected;
    } else {
        if(nodes.mode != ModeType.horizontalRange && previousNodes.nodes!.length > 0) {
            if(previousNodes.key == CustomRGBNodesEnum.key) {
                menuState.menuPanel!.selected = previousNodes.selected;
                menuState.menuPanel!.selected  = previousNodes.result;
            } else {
                previousNodes.selected = nodes.selected;
                previousNodes.result = nodes.result;
            }
        }

        // 當垂直 range 調整後儲存返回上一步
        if(openAllMenu.value && nodes.mode == ModeType.verticalRange && previousNodes.nodes!.length == 1) {
            handlePrevious();
        }

        // 當開自訂選單時且為 垂直 range 調整後關閉
        if(openAssignButton.value && nodes.mode == ModeType.verticalRange && previousNodes.nodes!.length == 1) {
            handlerClose();
        }

        if(previousNodes.mode == ModeType.radio && nodes.mode == ModeType.radio) {
            // 目前只有第三層會出現的 radio 選擇時需要設定到第一層
            if(menuState.currentPanelNumber == 3) {
                menuState.menuPanel!.result = nodes.result
                menuState.menuPanel!.selected= nodes.selected
            }
        }

        const keyHandlers: { [key: string]: () => void } = {
            [LanguageNodesEnum.key]: () => reopenMenu(),
            [InputNodesEnum.key]: () => {
                homeEvent.restartScreen();
                handlerClose();
            },
            [ColorNodesEnum.key]: () => setBrightnessDefaultValue(),
            [VideoLevelNodesEnum.key]: () => restartScreenPreview(),
            [AccessibilityNodesEnum.key]: () => {
                store.$state.menu.nodes[0].disabled = previousNodes.result == OnNodesEnum.result;
                store.$state.menu.nodes[1].disabled = previousNodes.result == OnNodesEnum.result;

                reopenMenu();
            },
        };

        // 當為 previousNodes.key 時，執行動作
        if (previousNodes.key in keyHandlers) {
            keyHandlers[previousNodes.key]();
        }

        if(nodes.livePreview) {
            // 即時預覽效果的時候，暫存原始的值，當沒確認時，反回上一步需要恢復為暫存的值
            menuState.temporaryStorage = null;
        }
    }
};

// 重啟選單
function reopenMenu() {
    openAllMenu.value = false;
    openControllerMenus.value = false;

    setTimeout(() => {
        openAllMenu.value = true;
        openControllerMenus.value = true;
    }, 1000)
};

// 重啟螢幕
function restartScreenPreview() {
    emit("update:showScreen", false);

    setTimeout(() => {
        emit("update:showScreen", true);
    }, 1000)
}

// 重置動作
function handleResetAction(previousNodes: Nodes) {
    const key = toLowerCaseFirstChar(menuState.menuPanel!.key) as keyof StoreState;
    store.$patch({ [key]: { ...JSON.parse(JSON.stringify(MenusDefaultEnum[key])) } });

    if (previousNodes.key === "Color") setBrightnessDefaultValue();
};

//恢復原廠設定
function handleFactoryResetAction(nodes: Nodes, previousNodes: Nodes) {
    if (nodes.key == YesNodesEnum.key) {
        factorySettings.value = true;
        store.$resetAll();
        handlerClose();
        emit("update:showScreen", false);

        setTimeout(() => {
            emit("update:showScreen", true);
        }, 500);
    } else if (nodes.key == NoNodesEnum.key) {
        handlerNavigation("down");
    }
};

// 處理 Confirm 動作
function handleChangingMessageAction(nodes: Nodes) {
    const keyHandlers: { [key: string]: () => void } = {
        Confirm: () => {
            factorySettings.value = false;
            confirmState.openConfirm = false;
            restoreSelectedMenu();
            // 選擇下一層
            handlerNextPanel();
            // 處理儲存內容
            handlerSave(menuState.currentPanelNumber);
        },
        Cancel: () => handlerCloseConfirmAction()
    };

    // 當為 nodes.key 時，執行動作
    if (nodes.key in keyHandlers) {
        keyHandlers[nodes.key]();
    }
};

// 原廠設定電源警告判斷
function factorySettingOSDMessage(nodes: Nodes, previousNodes: Nodes, ) {

    // 設定 confirm State message
    const setupConfirmState = () => {
        confirmState.confirmMainPanel = PowerConfirmChangeNodesEnum;
        confirmState.confirmSecondPanel = PowerConfirmChangeNodesEnum.nodes[0];
        confirmState.confirmThirdPanel = PowerConfirmChangeNodesEnum.nodes[0].nodes[0];
        confirmState.openConfirm = true;
    }

    // 當是開啟全部選單時，暫時關閉且紀錄目前開啟的選當類型
    if(openAllMenu.value) {
        openAllMenu.value = false;
        confirmState.selectedMenus = "openAllMenu";
    };

    // 當是開啟自訂選單時，暫時關閉且紀錄目前開啟的選當類型
    if(openAssignButton.value) {
        openAssignButton.value = false;
        confirmState.selectedMenus = "openAssignButton";
    };

    handlerMenuTimeout();
    setupConfirmState();
};

// 重啟選擇的 menu
function restoreSelectedMenu() {
    if (confirmState.selectedMenus === "openAllMenu") {
        openAllMenu.value = true;
    } else {
        openAssignButton.value = true;
    }
}

// 處理 confirm 取消後的動作，選擇為返回(Back)或離開(Exit)選項
function handlerCloseConfirmAction() {
    factorySettings.value = true;
    confirmState.openConfirm = false;
    restoreSelectedMenu();
    undoTheStaging();

    if(menuState.currentPanelNumber == 2) {
        let index = openAllMenu.value
            ? menuState.menuPanel!.nodes?.findIndex(s => s.key == BackNodesEnum.key)
            : menuState.menuPanel!.nodes?.findIndex(s => s.key == ExitNodesEnum.key);
        menuState.secondPanelIndex = index as number;
        menuState.secondPanel = menuState.menuPanel!.nodes![menuState.secondPanelIndex];
    } else if(menuState.currentPanelNumber == 3) {
        let index = openAllMenu.value
            ? menuState.secondPanel!.nodes?.findIndex(s => s.key == BackNodesEnum.key)
            : menuState.secondPanel!.nodes?.findIndex(s => s.key == ExitNodesEnum.key);
        menuState.thirdPanelIndex = index as number;
        menuState.thirdPanel = menuState.secondPanel!.nodes![menuState.thirdPanelIndex];
    }

    setBrightnessDefaultValue();

}

// 恢復預覽的結果
function undoTheStaging() {
    if(!menuState.temporaryStorage) return;

    if(menuState.currentPanelNumber == 2) {
        menuState.menuPanel!.result = menuState.temporaryStorage.result;
    }

    if(menuState.currentPanelNumber == 3) {
        menuState.secondPanel!.result = menuState.temporaryStorage.result;

    }
    if(menuState.currentPanelNumber == 4) {
        menuState.thirdPanel!.result = menuState.temporaryStorage.result;
    }

    menuState.temporaryStorage = null;

};

// 關閉全部選單，包含清除目前狀態
function handlerClose() {

    undoTheStaging();
    
    openControllerMenus.value = false;

    openAllMenu.value = false;
    openAssignButton.value = false;

    menuState.menuPanel = null;
    menuState.secondPanel = null;
    menuState.thirdPanel = null;
    menuState.fourthPanel = null;

    menuState.currentPanelNumber = 0;
    menuState.menuPanelIndex = 0;
    menuState.secondPanelIndex = 0;
    menuState.thirdPanelIndex = 0;
    menuState.fourthPanelIndex = 0;
    menuState.assignPanelOrderIndex = 0;

    confirmState.openConfirm = false;
    confirmState.confirmMainPanel = null;
    confirmState.confirmSecondPanel = null;
    confirmState.confirmThirdPanel = null;
    confirmState.confirmThirdPanelIndex = 0;

    setBrightnessDefaultValue();
    returnToDefaultValue();

};

// 特殊邏輯
// 將語言及診斷模式、選單旋轉角度恢復
function returnToDefaultValue() {

    // 關閉診斷模式
    store.$state.isDiagnosticPatterns = false;
    // 恢復英文且回到第一頁
    store.$state.menu.nodes[0].selected = "English";
    store.$state.menu.nodes[0].result = "English";
    store.$state.menu.nodes[0].page = 1;
    emit("update:enabledLanguageDirection", false);

    //取消無障礙模式
    store.$state.management.nodes[3].selected = OffNodesEnum.selected;
    store.$state.management.nodes[3].result = OffNodesEnum.result;

}


// 開放給 home 使用
defineExpose({ handlerClose });

// 處理選單顯示時效
function handlerMenuTimeout() {
    clearInterval(menuTimeOutIntervalId.value!);
    menuTimeOutIntervalId.value = null;

    // 當為診斷模式時關閉倒數關閉
    if (menuTimeOutIntervalId.value != null && store.$state.isDiagnosticPatterns) {
        clearInterval(menuTimeOutIntervalId.value!);
        menuTimeOutIntervalId.value = null;
    } else if(menuTimeOutIntervalId.value == null && store.$state.isDiagnosticPatterns == false) {
        menuTimeOutIntervalId.value = setTimeout(() => {
            if(openAssignButton.value) {
                handlerClose();
            }
    
            openAllMenu.value = false;
            openControllerMenus.value = false;
    
            if(menuState.menuPanel && menuState.secondPanel) {

                if(menuState.menuPanel.key == "Color") {
                    menuState.menuPanel.result = menuState.menuPanel.selected;
                    menuState.secondPanel = null;
                    menuState.secondPanelIndex = 0;
                    menuState.currentPanelNumber = 1;
                }

                menuState.thirdPanel = null;
                menuState.thirdPanelIndex = 0;
                menuState.fourthPanel = null;
                menuState.fourthPanelIndex = 0;
                menuState.currentPanelNumber = 2;

                // 恢復原本選擇亮度
                setBrightnessDefaultValue();
                // 特殊邏輯，恢復預設值
                returnToDefaultValue();
            }
    
        }, (menuStateResult.value.menuTimeout as number) * 1000);
    } else {
        clearInterval(menuTimeOutIntervalId.value!);
        menuTimeOutIntervalId.value = null;
    }
}

</script>
<style lang="scss" scoped>
@use '@/styles/_var' as *;

.menu-wrapper {
    position: absolute;
    content: "";
    top: 0px;
    left: 0px;
    width: $screen-width;
    height: $screen-height;
}

.menus,
.assign-menu {
	position: absolute;
	bottom: v-bind("menuStateResult.menuPosition.y");
	left: v-bind("menuStateResult.menuPosition.x");
	background-color: $black-09;
	width: v-bind("menuStateResult.menuSize.menuWidth");
	height: v-bind("menuStateResult.menuSize.menuHeight");
    z-index: 2;

	.header,
	.footer {
		padding: 6px 12px;
		color: $white;
		font-size: 10px;
	}

	.footer {
		position: absolute;
		bottom: 0;
		width: calc(100% - 24px);
		display: flex;
		justify-content: space-between;
	}

	.body {
		height: calc(100% - 44px);
		display: flex;
		color: $light-grey;
		font-size: 10px;

		.sidebar {
			width: 120px;
			height: 100%;
			background-color: $black-1C;

			.hp-logo {
				padding: 8px 0;
				display: flex;
				justify-content: center;
				align-items: center;

                img {
                    width: 44px;
                }
			}
		}

        .options {
            .option {
                height: 26px;
                display: flex;
                align-items: center;
                padding: 0 10px;
                border: 1px solid transparent;

                &.disabled {
                    color: $black-50;
                }

                &.selected:not(.disabled) {
                    background-color: $black;
                    border: 1px solid $blue;
                    color: $white;

                    &.focus {
                        border: 1px solid transparent;
                        position: relative;

                        &::before {
                            position: absolute;
                            content: "";
                            right: 4px;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-width: 5px 0 5px 10px;
                            border-color: transparent transparent transparent $white;
                        }
                    }
                }
            }
        }
	}
}

.menus {
    opacity: v-bind("menuStateResult.menuTransparency");
    
    &.accessibility {
        bottom: 74px;
        left: 276px;
        margin: 0;
    }
}

.assign-menu {
    position: absolute;
    top: unset;
    left: unset;
	bottom: 34px;
	right: 44px;
    background-color: $black-16;
    width: 200px;
	height: 304px;

    &.accessibility {
        transform: scale(1.2);
        bottom: 100px;
        right: 120px;
    }

    &.Information {
        width: 300px;
    }

    .header {
        padding: 6px 12px;
		color: $white;
		font-size: 10px;
        background-color: $black-09;
    }
    .body {
        height: calc(100% - 22px);
    }
}

.controller-menus {
	position: absolute;
	display: flex;
	bottom: 0px;
	right: 84px;

    &.accessibility {
        transform: scale(1.1);
        right: 94px;
    }

	.menu-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
		height: 16px;
		background-color: $black-28;
		border: 0.8px solid $black;

		img {
            width: 16px;
		}
	}
}

.controller {
	position: absolute;
	bottom: -108px;
	right: 16px;

	.controller-btn,
	:deep(.controller-btn) {
		width: 46px;
		height: 46px;

        &:hover,
        &.show-guide {
            border: 1px dashed $white;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .15);
        }
	}

    .power-guide {
        position: absolute;
        bottom: -36px;
        right: -28px;
        white-space: nowrap;

        &::before {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            left: calc((100% - 10px) / 2);
            bottom: 20px;
            border-style: solid;
            border-width: 0 5px 10px 5px;
            border-color: transparent transparent $white transparent;
        }
    }

    .menu-buttons-guide {
        position: absolute;
        white-space: nowrap;
        content: "";
        bottom: -20px;
        right: 0;
        width: 184px;
    }
}
</style>