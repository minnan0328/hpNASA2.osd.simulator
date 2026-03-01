import { reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import {
	Brightness, Color, Image, Input,
	Power, Menu, Management,Information, Exit
} from '@/models/index';


import { AssignVolumeNodes, AssignColorNodes } from '@/models/class/menu/assign-buttons/_utilities';
const AssignVolumeNodesEnum = new AssignVolumeNodes();
const AssignColorNodesEnum = new AssignColorNodes();

export interface StoreState {
    brightnessPlus: Brightness;
    color: Color;
    image: Image;
    input: Input;
    power: Power;
    menu: Menu;
    management: Management;
    information: Information;
    exit: Exit;
    isDiagnosticPatterns: boolean;
    currentDiagnosticPatterns: string;
}

// 建立 Menus 預設值
export class MenusDefaultModel implements StoreState  {
    brightnessPlus = new Brightness()
    color = new Color()
    image = new Image()
    input = new Input()
    power = new Power()
    menu = new Menu()
    management = new Management()
    information = new Information()
    exit = new Exit()
	isDiagnosticPatterns = false // 是否啟用診斷模式
	currentDiagnosticPatterns = "black" // 當前診斷模式顏色
};

export const useStore = defineStore('counter', () => {
    const state = reactive<StoreState>(new MenusDefaultModel());

    // 選擇 VGA 時更換分配按鈕2的項目
    function setAssignButtonValue() {
        const assignButton2Result = state.input.result === "VGA" ? AssignColorNodesEnum : AssignVolumeNodesEnum;
        if (state.menu.nodes[6]?.nodes?.[1]) {
            state.menu.nodes[6].nodes[1].selected = assignButton2Result.selected;
            state.menu.nodes[6].nodes[1].result = assignButton2Result.result;
        }
    }

    function $resetAll() {
        state.brightnessPlus = JSON.parse(JSON.stringify(new Brightness()));
        state.color = JSON.parse(JSON.stringify(new Color()));
        state.image = JSON.parse(JSON.stringify(new Image()));
        state.input = JSON.parse(JSON.stringify(new Input()));
        state.power = JSON.parse(JSON.stringify(new Power()));
        state.menu = JSON.parse(JSON.stringify(new Menu()));
        state.management = JSON.parse(JSON.stringify(new Management()));
        state.information = JSON.parse(JSON.stringify(new Information()));
        state.exit = JSON.parse(JSON.stringify(new Exit()));
    }

    return {
        ...toRefs(state),
        $resetAll,
        setAssignButtonValue
    };
});