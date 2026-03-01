// 影像 > 時脈和相位

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, BackNodes } from '../_utilities';
const DefaultNodesEnum = new DefaultNodes();
const BackNodesEnum = new BackNodes();

export default class HPEnhancePlusNodes extends DefaultNodes implements Nodes {
    key = "ClockandPhase";
    size = 3;
    page = 1;
    mode = ModeType.button;
    only = ["VGA"];
    language = {
        German: "Takt und Phasenlage",
        SimplifiedChinese: "时钟和相位",
        TraditionalChinese: "時脈和相位",
        English: "Clock and Phase",
        Español: "Reloj y fase",
        French: "Horloge et Phase",
        Italian: "Orologio e fase",
        Japanese: "クロックおよびフェーズ",
        Nederlands: "Clock en Phase",
        BrazilianPortuguese: "Relógio e fase",
        Russian: "Частота синхр. и фаза"
    };
    nodes = [
        // 時脈
        {
            // VGA only - Range (0~100)
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Clock",
            selected: 50,
            result: 50,
            parents: this.key,
            mode: ModeType.horizontalRange,
            rangeMin: 0,
            rangeMax: 100,
            horizontalRangeFocus: true,
            only: ["VGA"],
            language: {
                German: "Takt",
                SimplifiedChinese: "时钟",
                TraditionalChinese: "時脈",
                English: "Clock",
                Español: "Reloj",
                French: "Horloge",
                Italian: "Orologio",
                Japanese: "クロック",
                Nederlands: "Kloksnelheid",
                BrazilianPortuguese: "Sincronização",
                Russian: "Частота синхр."
            }
        },
        // 相位
        {
            // Range (0~100)
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Phase",
            selected: 45,
            result: 45,
            parents: this.key,
            mode: ModeType.horizontalRange,
            rangeMin: 0,
            rangeMax: 100,
            horizontalRangeFocus: false,
            only: ["VGA"],
            language: {
                German: "Phasenlage",
                SimplifiedChinese: "相位",
                TraditionalChinese: "相位",
                English: "Phase",
                Español: "Fase",
                French: "Phase",
                Italian: "Fase",
                Japanese: "フェーズ",
                Nederlands: "Phase",
                BrazilianPortuguese: "Fase",
                Russian: "Фаза"
            }
        },
        // 上一步
        {
            ...JSON.parse(JSON.stringify(BackNodesEnum)),
            parents: this.key,
        }
    ];
};