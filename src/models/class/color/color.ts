import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, ResetNodes, BackNodes, ExitNodes } from '../_utilities';
import WarmNodes from './_warm-nodes';
import NeutralNodes from './_neutral-nodes';
import CoolNodes from './_cool-nodes';
import NativeNodes from './_native-nodes';
import NightNodes from './_night-nodes';
import HPEnhancePlusNodes from './_HP-enhance-plus-nodes';
import CustomRGBNodes from './_custom-RGB-nodes';

const ResetNodesEnum = new ResetNodes(); 
const BackNodesEnum = new BackNodes();
const ExitNodesEnum = new ExitNodes();
const WarmNodesEnum = new WarmNodes();
const NeutralNodesEnum = new NeutralNodes();
const CoolNodesEnum = new CoolNodes();
const NativeNodesEnum = new NativeNodes();
const NightNodesEnum = new NightNodes();
const HPEnhancePlusNodesEnum = new HPEnhancePlusNodes();
const CustomRGBNodesEnum = new CustomRGBNodes();
export default class Color extends DefaultNodes implements Nodes {
    key = "Color";
    selected = NeutralNodesEnum.selected;
    result = NeutralNodesEnum.result;
    size = 10;
    page = 1;
    mode = ModeType.button;
    language = {
        German: "Farbe",
        SimplifiedChinese: "颜色",
        TraditionalChinese: "色彩",
        English: "Color",
        Español: "Color",
        French: "Couleur",
        Italian: "Colore",
        Japanese: "色",
        Nederlands: "Kleur",
        BrazilianPortuguese: "Cor",
        Russian: "Цвет"
    };
    nodes = [
        // 暖色 Warm
        {
            ...WarmNodesEnum,
            parents: this.key
        },
        // 中性色 Neutral
        {
            ...NeutralNodesEnum,
            parents: this.key
        },
        // 冷色 Cool
        {
            ...CoolNodesEnum,
            parents: this.key
        },
        // 原生 Native
        {
            ...NativeNodesEnum,
            parents: this.key
        },
        // 夜間
        {
            ...NightNodesEnum,
            parents: this.key
        },
        // HP Enhance+
        {
            ...JSON.parse(JSON.stringify(HPEnhancePlusNodesEnum)),
            parents: this.key
        },
        // 自訂 RBG
        {
            ...JSON.parse(JSON.stringify(CustomRGBNodesEnum)),
            parents: this.key
        },
        // 重置
        {
            ...JSON.parse(JSON.stringify(ResetNodesEnum)),
            parents: this.key,
            mergeGrid: true 
        },
        // 上一步
        {
            ...JSON.parse(JSON.stringify(BackNodesEnum)),
            parents: this.key,
            mergeGrid: true 
        },
        {
            ...ExitNodesEnum,
            ...JSON.parse(JSON.stringify(ExitNodesEnum)),
            parents: this.key,
        }
    ];
};