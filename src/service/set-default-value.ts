import { useStore } from '@/stores/index';
import { OffNodes } from '@/models/class/_utilities';
import CustomRGBNodes from '@/models/class/color/_custom-RGB-nodes';
import HPEnhancePlusNodes from '@/models/class/color/_HP-enhance-plus-nodes';

const store = useStore();
const OffNodesEnum = new OffNodes();
const CustomRGBNodesEnum = new CustomRGBNodes();
const HPEnhancePlusNodesEnum = new HPEnhancePlusNodes();

export function setBrightnessDefaultValue() {
    store.$state.information.nodes[2].selected = store.$state.color.selected;
    store.$state.information.nodes[2].result = store.$state.color.result;

    const colorResult = store.$state.color.nodes.find(n => n.result == store.$state.color.result);

    store.$state.brightnessPlus.nodes[0].result = colorResult.brightness;
    store.$state.brightnessPlus.nodes[0].nodes[0].result = colorResult.brightness;
    
    store.$state.brightnessPlus.nodes[0].selected = colorResult.brightness;
    store.$state.brightnessPlus.nodes[0].nodes[0].selected = colorResult.brightness;
    
    // 當 color 是 HP Enhance+ 時 brightness 的 dynamic contrast 為 disable 並且關閉
    if(store.$state.color.result == HPEnhancePlusNodesEnum.result) {
        // 動態對比設定 Dynamic Contrast
        store.$state.brightnessPlus.nodes[2].disabled = true;
        setDynamicContrastValue();
    }
};

export function setDynamicContrastValue() {
    store.$state.brightnessPlus.nodes[2].result = OffNodesEnum.result;
    store.$state.brightnessPlus.nodes[2].selected = OffNodesEnum.selected;
}

export function setColorBrightnessDefaultValue() {
    const brightness = store.$state.brightnessPlus.nodes[0];
    const colorIndex = store.$state.color.nodes.findIndex(n => n.result == store.$state.color.result);
    
    if(colorIndex !== -1) {

        store.$state.color.nodes[colorIndex].brightness = brightness.result;
    }
}