<template>
    <div class="container">
        <div class="curtain">
            <ribbon></ribbon>

            <div class="section">
                <div class="inner">
                    <div class="left">
                        <div class="input">
                            <div :class="['tab', { 'selected-tab': store.$state.input.result == tab.result }]" v-for="tab in tabs"
                                v-text="tab.selected" @click="selectInput(tab)"></div>
                        </div>
                        <div class="card">
                            <div class="top"></div>
                            <div class="info">
                                Welcome to the {{config.company}} {{config.screenModel}} OSD Simulator. Please press the power button and then select an input source.
                            </div>
                        </div>
                    </div>
                    
                    <div class="monitor-block">
                        <div class="monitor">
                            <img src="@/assets/images/monitor.png" alt="monitor">
                        </div>

                        <div class="wrapper">
                            <div class="power-light" v-if="openMonitor && monitorResult.powerLED"></div>
    
                            <monitorScreen v-if="openMonitor" v-model:openMonitor="openMonitor"
                                v-model:screenInitial="screenInitial"
                                v-model:showMonitorStatus="showMonitorStatus"
                                v-model:showScreen="showScreen"
                                v-model:startUpFinish="startUpFinish">
                            </monitorScreen>

                            <toast v-if="toastObj.open" v-model:open="toastObj.open"
                                :message="toastObj.message" :images="toastObj.images">
                            </toast>

                            <div class="menu-buttons">
                                <img src="@/assets/images/menu-buttons.png" alt="">
                                <div class="power-light menu-btn" v-if="openMonitor && monitorResult.powerLED"></div>
                            </div>

                            <div class="language-direction" v-if="enabledLanguageDirection">
                                <p class="direction">The function is for demonstration purposes only. Returning to the previous page will restore to English.</p>
                            </div>
    
                            <menus v-model:openMonitor="openMonitor"
                                v-model:startUpFinish="startUpFinish"
                                v-model:showScreen="showScreen"
                                v-model:showMonitorStatus="showMonitorStatus"
                                v-model:openToast="toastObj.open"
                                v-model:enabledLanguageDirection="enabledLanguageDirection"
                                ref="childMenusComponentRef">
                                <template v-slot:openMonitor>
                                    <button class="controller-btn open-btn" @click="handleMonitor"></button>
                                </template>
                            </menus>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from 'vue';
import { useStore } from '@/stores/index';
import type { Nodes, HomeEvent, Language } from '@/types';
import ribbon from '@/views/home/_ribbon/ribbon.vue';
import monitorScreen from '@/views/home/_monitor-screen/monitor-screen.vue';
import menus from '@/views/home/_menus/menus.vue';
import { monitorResult } from '@/service/monitor-state-result';
import config from '@/config/config';
import toast from '@/views/home/_toast/toast.vue';

import iconWarn from '@/assets/icons/icon-warn.svg';

const store = useStore();

const tabs = reactive([
    store.$state.input.nodes[0],
    store.$state.input.nodes[1],
    store.$state.input.nodes[2]
]);

const selectedTab = ref<Nodes | null>(tabs[0] as Nodes | null);

const toastObj = ref({
    open: false,
    images: "",
    message: null as Language | null,
    timeout: 5000
});

function selectInput(tab: Nodes) {
    if(screenInitial.value == false) {

        if(openMonitor.value && tab.result != store.$state.input.result) {
            restartScreen();
        };

        selectedTab.value = tab;
        store.$state.input.selected = selectedTab.value.selected as string;
        store.$state.input.result = selectedTab.value.result as string;

        // 選擇 VGA 時更換自訂按鈕項目
        store.setAssignButtonValue();
    }
};


/* 啟動螢幕 start  */
const openMonitor = ref(false);
const screenInitial = ref(false);
const showMonitorStatus = ref(false);
const showScreen = ref(false);
const startUpFinish = ref(false);
const childMenusComponentRef = ref(null);
const enabledLanguageDirection = ref(false);

function handleMonitor() {
    openMonitor.value = !openMonitor.value;

    if(openMonitor.value) {
        showScreen.value = false;
        showMonitorStatus.value = false;
        startUpFinish.value = false;
    }
};

/* 啟動螢幕 end  */



// 自動調整
const autoAdjustmentIntervalId = ref<number | null>(null);
function autoAdjustment() {
    if(store.$state.input.result != "VGA") return;

    toastObj.value.open = true;
    toastObj.value.images = iconWarn;
    toastObj.value.message = {
        German: "Automatische Einstellung wird durchgeführt",
        SimplifiedChinese: "正在自动调整",
        TraditionalChinese: "自動調整中",
        English: "Auto-Adjustment in Progress",
        Español: "Ajuste automático en curso",
        French: "Ajustement automatique en cours",
        Italian: "Autoregolazione in corso",
        Japanese: "自動調整中です",
        Nederlands: "Bezig met automatisch aanpassen",
        BrazilianPortuguese: "Ajuste Automático está em Andamento",
        Russian: "Выполняется автом. регулировка"

    };

    // 復原時脈和相位
    const resetImageClockandPhase = () => {
        store.$state.image.nodes[1].nodes[0].result = 50;
        store.$state.image.nodes[1].nodes[0].selected = 50;
        store.$state.image.nodes[1].nodes[1].result = 50;
        store.$state.image.nodes[1].nodes[1].selected = 50;

        store.$state.image.nodes[2].nodes[0].result = 50;
        store.$state.image.nodes[2].nodes[0].selected = 50;
        store.$state.image.nodes[2].nodes[1].result = 50;
        store.$state.image.nodes[2].nodes[1].selected = 50;
    };

    resetImageClockandPhase();

    setTimeout(() => {
        resetToast();
        resetImageClockandPhase();

        if (autoAdjustmentIntervalId.value !== null) {
            clearInterval(autoAdjustmentIntervalId.value);
            autoAdjustmentIntervalId.value = null;
        };
    }, toastObj.value.timeout);

    autoAdjustmentIntervalId.value = setInterval(() => {
        store.$state.image.nodes[2].nodes[0].result += Math.floor(Math.random() * (2 - (-2)) + (-2));
        store.$state.image.nodes[2].nodes[0].selected += Math.floor(Math.random() * (2 - (-2)) + (-2));
    }, 100);
};

function resetToast() {
    toastObj.value.open = false;
    toastObj.value.images = "";
    toastObj.value.message = null;
    toastObj.value.timeout = 5000;
};

/* 重啟畫面 */
function restartScreen() {
    if(!screenInitial.value) {
        showScreen.value = false;
        showMonitorStatus.value = false;
        startUpFinish.value = false;
    
        if(childMenusComponentRef.value) {
            // 暫時使用 any 解決
            (childMenusComponentRef.value as any).handlerClose();
        };

        setTimeout(() => {
            showScreen.value = true;
            showMonitorStatus.value = true;
    
            setTimeout(() => {
                showMonitorStatus.value = false;
                startUpFinish.value = true;
            }, 2000);
        }, 1000);
    }
};
/* 重啟畫面 */


provide<HomeEvent>("homeEvent", {
    restartScreen,
    autoAdjustment
    
});


</script>

<style lang="scss" >
@use '@/styles/_var' as *;

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.curtain {
    width: 1280px;
    max-width: 1280px;
    background-image: linear-gradient(to bottom, $white 9%, $grey 141%);
}

.section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: initial;

    .inner {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0 4px;
        margin-top: 8px;
    }

    .left {
        width: 224px;
        height: max-content;
        display: grid;
        gap: 88px 0;
        margin-top: 88px;

        .card {
            width: 184px;

            .top {
                width: initial;
                height: 18px;
                background-color: $dark-gray;
                margin-bottom: 2px;
            }

            .info {
                background-color: $light-grey;
                padding: 24px;
                color: $white;
                line-height: 1.2;
            }
        }
    }

    .monitor-block {
        position: relative;

        .wrapper {
            position: absolute;
            content: '';
            top: 8px;
            left: 6px;
            width: $screen-width;
            height: $screen-height;
        }
        
        .monitor {
            img {
                // 螢幕內 960寬 需增加螢幕外觀尺寸
                width: calc(#{$screen-width} + 18px);
            }
        }

        .power-light {
            position: absolute;
            bottom: -26px;
            right: 74px;
            width: 4px;
            height: 4px;
            background-color: $white;
            border-radius: 50%;
            box-shadow: 0px 0px 10px 2px rgba($white, 0.9);
        }

        .menu-buttons {
            position: absolute;
            bottom: -98px;
            right: 30px;

            img {
                width: 115%;
            }

            > .power-light.menu-btn {
                position: absolute;
                bottom: 16px;
                right: 32px;

            }
        }

        .language-direction {
            width: 260px;
            height: max-content;
            position: absolute;
            bottom: -210px;
            right: -4px;
            line-height: 1.33;
            
            .direction{
                color: $text-red;
            }
        }
    }
}

.initial-enter-active {
    transition: opacity 1s ease;
}

.initial-leave-active {
    transition: opacity 2s ease;
}

.initial-enter-from,
.initial-leave-to {
    opacity: 0;
}
</style>