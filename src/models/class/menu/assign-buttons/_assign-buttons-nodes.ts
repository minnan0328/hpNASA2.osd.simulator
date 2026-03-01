// 功能表 > 指定鍵

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, BackNodes } from '../../_utilities';
import { 
    AssignAutoAdjustmentNodes,
    AssignBrightnessNodes,
    AssignColorNodes,
    AssignDisplayInformationNodes,
    AssignNextActiveInputNodes,
    AssignVolumeNodes,
    AssignEmptyNodes
} from './_utilities';

const DefaultNodesEnum = new DefaultNodes();
const BackNodesEnum = new BackNodes();
const AssignAutoAdjustmentNodesEnum = new AssignAutoAdjustmentNodes();
const AssignBrightnessNodesEnum = new AssignBrightnessNodes();
const AssignColorNodesEnum = new AssignColorNodes();
const AssignDisplayInformationNodesEnum = new AssignDisplayInformationNodes();
const AssignNextActiveInputNodesEnum = new AssignNextActiveInputNodes();
const AssignVolumeNodesEnum = new AssignVolumeNodes();
const AssignEmptyNodesEnum = new AssignEmptyNodes();

export default class AssignButtonsNodes extends DefaultNodes implements Nodes {
    key = "AssignButtons";
    size = 4;
    page = 1;
    mode = ModeType.button;
    language = {
        German: "Tasten zuweisen",
        SimplifiedChinese: "指定按钮",
        TraditionalChinese: "指定鍵",
        English: "Assign Buttons",
        Español: "Asignar botones",
        French: "Attribuer boutons",
        Italian: "Assegna pulsanti",
        Japanese: "ボタンの割り当て",
        Nederlands: "Knoppen toewijzen",
        BrazilianPortuguese: "Atribuir botões",
        Russian: "Назначить кнопки"
    };
    nodes = [
        {
            // Auto-Adjustment only appears in menu for VGA
            // Y (FD=Next Active Input)
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "AssignButton1",
            selected: AssignNextActiveInputNodesEnum.selected,
            result: AssignNextActiveInputNodesEnum.result,
            displayValue: true,
            displayState: true,
            size: 8,
            page: 1,
            parents: this.key,
            mode: ModeType.button,
            language: {
                German: "Taste 1 zuweisen",
                SimplifiedChinese: "指定按钮 1",
                TraditionalChinese: "指定鍵 1",
                English: "Assign Button 1",
                Español: "Asignar botón 1",
                French: "Attribuer bouton 1",
                Italian: "Assegna pulsante 1",
                Japanese: "ボタン1の割り当て",
                Nederlands: "Knop 1 toewijzen",
                BrazilianPortuguese: "Atribuir botões 1",
                Russian: "Назначить кнопку 1"
            },
            nodes: [
                {
                    ...JSON.parse(JSON.stringify(AssignAutoAdjustmentNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignBrightnessNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignColorNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignDisplayInformationNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignNextActiveInputNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignVolumeNodesEnum)),
                    parents: "AssignButton1"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignEmptyNodesEnum)),
                    parents: "AssignButton1"
                },
                // 上一步
                {
                    ...JSON.parse(JSON.stringify(BackNodesEnum)),
                    parents: "AssignButton1"
                }
            ]
        },
        {   
            // Auto-Adjustment only appears in menu for VGA
            // Y input == VGA (FD=color) 
            // Y input == HDMI (FD=Volume)
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "AssignButton2",
            selected: AssignVolumeNodesEnum.selected,
            result: AssignVolumeNodesEnum.result,
            displayValue: true,
            displayState: true,
            size: 8,
            page: 1,
            parents: this.key,
            mode: ModeType.button,
            language: {
                German: "Taste 2 zuweisen",
                SimplifiedChinese: "指定按钮 2",
                TraditionalChinese: "指定鍵 2",
                English: "Assign Button 2",
                Español: "Asignar botón 2",
                French: "Attribuer bouton 2",
                Italian: "Assegna pulsante 2",
                Japanese: "ボタン2の割り当て",
                Nederlands: "Knop 2 toewijzen",
                BrazilianPortuguese: "Atribuir botões 2",
                Russian: "Назначить кнопку 2"
            },
            nodes: [
                {
                    ...JSON.parse(JSON.stringify(AssignAutoAdjustmentNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignBrightnessNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignColorNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignDisplayInformationNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignNextActiveInputNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignVolumeNodesEnum)),
                    parents: "AssignButton2"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignEmptyNodesEnum)),
                    parents: "AssignButton2"
                },
                // 上一步
                {
                    ...JSON.parse(JSON.stringify(BackNodesEnum)),
                    parents: "AssignButton2"
                }
            ]
        },
        {   
            // Auto-Adjustment only appears in menu for VGA
            // Y  (FD=Brightness)
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "AssignButton3",
            selected: AssignBrightnessNodesEnum.selected,
            result: AssignBrightnessNodesEnum.result,
            displayValue: true,
            displayState: true,
            size: 8,
            page: 1,
            parents: this.key,
            mode: ModeType.button,
            language: {
                German: "Taste 3 zuweisen",
                SimplifiedChinese: "指定按钮 3",
                TraditionalChinese: "指定鍵 3",
                English: "Assign Button 3",
                Español: "Asignar botón 3",
                French: "Attribuer bouton 3",
                Italian: "Assegna pulsante 3",
                Japanese: "ボタン3の割り当て",
                Nederlands: "Knop 3 toewijzen",
                BrazilianPortuguese: "Atribuir botões 3",
                Russian: "Назначить кнопку 3"
            },
            nodes: [
                {
                    ...JSON.parse(JSON.stringify(AssignAutoAdjustmentNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignBrightnessNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignColorNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignDisplayInformationNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignNextActiveInputNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignVolumeNodesEnum)),
                    parents: "AssignButton3"
                },
                {
                    ...JSON.parse(JSON.stringify(AssignEmptyNodesEnum)),
                    parents: "AssignButton3"
                },
                // 上一步
                {
                    ...JSON.parse(JSON.stringify(BackNodesEnum)),
                    parents: "AssignButton3"
                }
            ]
        },
        // 上一步
        {
            ...JSON.parse(JSON.stringify(BackNodesEnum)),
            parents: this.key
        }
    ]
};