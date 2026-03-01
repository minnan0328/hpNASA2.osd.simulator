// 影像 > 銳利度

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, BackNodes } from '../_utilities';
const DefaultNodesEnum = new DefaultNodes();
const BackNodesEnum = new BackNodes();

export default class SharpnessNodes extends DefaultNodes implements Nodes {
    key = "Sharpness";
    selected = "Level 4";
    result = "Level 4";
    displayValue = true;
    size = 8;
    page = 1;
    mode = ModeType.button;
    language = {
        German: "Schärfe",
        SimplifiedChinese: "清晰度",
        TraditionalChinese: "銳利度",
        English: "Sharpness",
        Español: "Nitidez",
        French: "Netteté",
        Italian: "Nitidezza",
        Japanese: "シャープネス",
        Nederlands: "Scherpte",
        BrazilianPortuguese: "Nitidez",
        Russian: "Резкость"
    };
    nodes = [
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Soft",
            selected: "Soft",
            result: "Soft",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Weich",
                SimplifiedChinese: "柔和",
                TraditionalChinese: "柔和",
                English: "Soft",
                Español: "Suave",
                French: "Doux",
                Italian: "Con poco contrasto",
                Japanese: "ソフト",
                Nederlands: "Zacht",
                BrazilianPortuguese: "Suave",
                Russian: "Мягкое"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Level2",
            selected: "Level 2",
            result: "Level 2",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Ebene 2",
                SimplifiedChinese: "2 级",
                TraditionalChinese: "2 級",
                English: "Level 2",
                Español: "Nivel 2",
                French: "Niveau 2",
                Italian: "Livello 2",
                Japanese: "レベル 2",
                Nederlands: "Niveau 2",
                BrazilianPortuguese: "Nível 2",
                Russian: "Уровень 2"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Level3",
            selected: "Level 3",
            result: "Level 3",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Ebene 3",
                SimplifiedChinese: "3 级",
                TraditionalChinese: "3 級",
                English: "Level 3",
                Español: "Nivel 3",
                French: "Niveau 3",
                Italian: "Livello 3",
                Japanese: "レベル 3",
                Nederlands: "Niveau 3",
                BrazilianPortuguese: "Nível 3",
                Russian: "Уровень 3"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Level4",
            selected: "Level 4",
            result: "Level 4",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Ebene 4",
                SimplifiedChinese: "4 级",
                TraditionalChinese: "4 級",
                English: "Level 4",
                Español: "Nivel 4",
                French: "Niveau 4",
                Italian: "Livello 4",
                Japanese: "レベル 4",
                Nederlands: "Niveau 4",
                BrazilianPortuguese: "Nível 4",
                Russian: "Уровень 4"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Level5",
            selected: "Level 5",
            result: "Level 5",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Ebene 5",
                SimplifiedChinese: "5 级",
                TraditionalChinese: "5 級",
                English: "Level 5",
                Español: "Nivel 5",
                French: "Niveau 5",
                Italian: "Livello 5",
                Japanese: "レベル 5",
                Nederlands: "Niveau 5",
                BrazilianPortuguese: "Nível 5",
                Russian: "Уровень 5"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Level6",
            selected: "Level 6",
            result: "Level 6",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Ebene 6",
                SimplifiedChinese: "6 级",
                TraditionalChinese: "6 級",
                English: "Level 6",
                Español: "Nivel 6",
                French: "Niveau 6",
                Italian: "Livello 6",
                Japanese: "レベル 6",
                Nederlands: "Niveau 6",
                BrazilianPortuguese: "Nível 6",
                Russian: "Уровень 6"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "Sharp",
            selected: "Sharp",
            result: "Sharp",
            livePreview: true,
            parents: this.key,
            mode: ModeType.radio,
            language: {
                German: "Scharf",
                SimplifiedChinese: "清晰",
                TraditionalChinese: "銳利",
                English: "Sharp",
                Español: "Nítido",
                French: "Dur",
                Italian: "Bene a fuoco",
                Japanese: "シャープ",
                Nederlands: "Scherp",
                BrazilianPortuguese: "Nítido",
                Russian: "Резкое"
            }
        },
        // 上一步
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            parents: this.key,
        }
    ];
};