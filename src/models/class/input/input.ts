// 輸入

import type { Nodes } from '@/types';
import { ModeType } from '@/types';
import AutoSwitchInputNodes from './_auto-switch-input-nodes';
import DPHotPlugDetectionNodes from './_dp-hot-plug-detection-nodes';
import DisplayPortModeNodes from './_ display-port-mode-nodes';
import AudioNodes from './audio/_audio-nodes';
import { DefaultNodes, ResetNodes, BackNodes, ExitNodes, OnNodes, OffNodes } from '../_utilities';

let AutoSwitchInputNodesEnum = new AutoSwitchInputNodes(); 
let DPHotPlugDetectionNodesEnum = new DPHotPlugDetectionNodes(); 
let DisplayPortModeNodesEnum = new DisplayPortModeNodes(); 
let AudioNodesEnum = new AudioNodes(); 
let DefaultNodesEnum = new DefaultNodes(); 
let ResetNodesEnum = new ResetNodes(); 
let BackNodesEnum = new BackNodes();
let ExitNodesEnum = new ExitNodes();
let OnNodesEnum = new OnNodes();
let OffNodesEnum = new OffNodes();

export default class Input extends DefaultNodes implements Nodes {
    key = "Input";
    selected = "HDMI";
    result = "HDMI";
    size = 10;
    page = 1;
    mode = ModeType.button;
    language = {
        German: "Eingabe",
        SimplifiedChinese: "输入",
        TraditionalChinese: "輸入",
        English: "Input",
        Español: "Entrada",
        French: "Entrée",
        Italian: "Invoer",
        Japanese: "入力",
        Nederlands: "Invoer",
        BrazilianPortuguese: "Entrada",
        Russian: "Входы",
    };
    nodes =  [
        // DisplayPort
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "DisplayPort",
            selected: "DisplayPort",
            result: "DisplayPort",
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "DisplayPort",
                SimplifiedChinese: "DisplayPort",
                TraditionalChinese: "DisplayPort",
                English: "DisplayPort",
                Español: "DisplayPort",
                French: "DisplayPort",
                Italian: "DisplayPort",
                Japanese: "DisplayPort",
                Nederlands: "DisplayPort",
                BrazilianPortuguese: "DisplayPort",
                Russian: "DisplayPort"
            }
        },
        // HDMI
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "HDMI",
            selected: "HDMI",
            result: "HDMI",
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "HDMI",
                SimplifiedChinese: "HDMI",
                TraditionalChinese: "HDMI",
                English: "HDMI",
                Español: "HDMI",
                French: "HDMI",
                Italian: "HDMI",
                Japanese: "HDMI",
                Nederlands: "HDMI",
                BrazilianPortuguese: "HDMI",
                Russian: "HDMI"
            }
        },
        // VGA
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "VGA",
            selected: "VGA",
            result: "VGA",
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "VGA",
                SimplifiedChinese: "VGA",
                TraditionalChinese: "VGA",
                English: "VGA",
                Español: "VGA",
                French: "VGA",
                Italian: "VGA",
                Japanese: "VGA",
                Nederlands: "VGA",
                BrazilianPortuguese: "VGA",
                Russian: "VGA"
            }
        },
        // 自動切換輸入
        {
            ...JSON.parse(JSON.stringify(AutoSwitchInputNodesEnum)),
            parents: this.key
        },
        // Audio
        {
            ...JSON.parse(JSON.stringify(AudioNodesEnum)),
            parents: this.key
        },
        // DP Hot-Plug Detection
        {
            ...JSON.parse(JSON.stringify(DPHotPlugDetectionNodesEnum)),
            parents: this.key
        },
        // DisplayPort Mode
        {
            ...JSON.parse(JSON.stringify(DisplayPortModeNodesEnum)),
            parents: this.key
        },

        // 重置
        {
            ...JSON.parse(JSON.stringify(ResetNodesEnum)),
            parents: this.key,
            mergeGrid: true

        },
        // 返回
        {
            ...JSON.parse(JSON.stringify(BackNodesEnum)),
            parents: this.key,
            mergeGrid: true
        },
        {
            ...JSON.parse(JSON.stringify(ExitNodesEnum)),
            parents: this.key,
        }
    ];
}