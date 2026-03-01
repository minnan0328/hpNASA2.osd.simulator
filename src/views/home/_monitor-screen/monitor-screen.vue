<template>
    <Transition name="initial">
        <div class="screen-initial" v-show="screenInitial && menuStateResult.OSDMessage.powerOnLogo">
            <img src="@/assets/images/screen-initial.jpg" alt="">
        </div>
    </Transition>

    <monitorStatus v-if="showMonitorStatus" v-model:show="menuStateResult.monitorStatus.show"
        v-model:position="(menuStateResult.monitorStatus.nodes.result as string)"
        :showMonitorStatus="showMonitorStatus">
    </monitorStatus>

    <div :class="['screen', monitorScreenResult.imageScaling]" v-if="showScreen && !monitorScreenResult.diagnosticPatterns.start">
        <img :src="monitorScreenResult.blackStretchImage" alt="">
    </div>
    <div v-else-if="monitorScreenResult.diagnosticPatterns.start" :key="monitorScreenResult.diagnosticPatterns.patterns"
        :class="['screen diagnostic-patterns', monitorScreenResult.diagnosticPatterns.patterns]">
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from '@/stores/index';
import monitorStatus from '@/views/home/_monitor-status/monitor-status.vue';
import { menuStateResult, monitorScreenResult } from '@/service/monitorStateResult';

const store = useStore();

const props = defineProps({
    openMonitor: {
        type: Boolean,
        default: false
    },
    screenInitial: {
        type: Boolean,
        default: false
    },
    showMonitorStatus: {
        type: Boolean,
        default: false
    },
    showScreen: {
        type: Boolean,
        default: false
    },
    startUpFinish: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:screenInitial', 'update:showMonitorStatus', 'update:showScreen', 'update:startUpFinish']);

function handleScreen() {
    setTimeout(() => {
        emit('update:showScreen', true);
        emit('update:showMonitorStatus', true);
        handleMonitorStatus();
    }, 2000);
};

function handleMonitorStatus() {
    setTimeout(() => {
        emit('update:showMonitorStatus', false);
        emit('update:startUpFinish', true);
    }, 5000);
};

onMounted(() => {
    if(props.openMonitor) {
        if(menuStateResult.value.OSDMessage.powerOnLogo) {
            emit('update:screenInitial', true);

            setTimeout(() => {
                emit('update:screenInitial', false);

                handleScreen();
            }, 2000);
        } else {
            handleScreen();
        }
    }
});

</script>
<style lang="scss" scoped>
@use '@/styles/_var' as *;
.screen-initial {
    position: absolute;
    top: 0px;
    left: 0px;

    img {
        width: $screen-width;
        height: $screen-height;
    }
}

.screen {
    position: absolute;
    width: $screen-width;
    height: $screen-height;
    top: 1px;
    left: 0px;
    overflow: hidden;

    &.FilltoAspectRatio {
        max-width: 682px;
        height: $screen-height;
        margin: 0 50px;

        &::before {
            width: 682px;
            height: $screen-height;
        }
    }

    img {
        width: v-bind("monitorScreenResult.imageClockPhase.width");
        height: $screen-height;
        position: absolute;
        bottom: v-bind("monitorScreenResult.imagePosition.y");
        left:  v-bind("monitorScreenResult.imagePosition.x");
        filter: 
            hue-rotate(v-bind("monitorScreenResult.RGB"))
            brightness(v-bind("monitorScreenResult.brightness"))
            contrast(v-bind("monitorScreenResult.contrast"))
            blur(v-bind("monitorScreenResult.sharpness"));
    }

    &.diagnostic-patterns {
        background-color: v-bind("monitorScreenResult.diagnosticPatterns.patterns");
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