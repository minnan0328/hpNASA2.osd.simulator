// 顏色 > 自訂 RBG

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

const DefaultNodesEnum = new DefaultNodes();

export default class CustomRGBNodes extends DefaultNodes implements Nodes {
    key = "CustomRGB";
    selected = "Custom RGB";
    result = "Custom RGB";
    livePreview = true;
    size = 3;
    page = 1;
    mode = ModeType.radio;
    language = {
        German: "Benutzerdefiniert RGB",
        SimplifiedChinese: "自定义 RGB",
        TraditionalChinese: "自訂 RGB",
        English: "Custom RGB",
        Español: "RGB Personalizado",
        French: "Personnalisé RGB",
        Italian: "Personalizzato RGB",
        Japanese: "カスタム RGB",
        Nederlands: "Aangepast RGB",
        BrazilianPortuguese: "RGB Personalizado",
        Russian: "Пользовательские настройки RGB"
    };
    nodes = [
        // RGB range (0~255)
        // Red Color
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "RedColor",
            selected: 255,
            result: 255,
            parents: this.key,
            mode: ModeType.verticalRange,
            rangeMin: 0,
            rangeMax: 255,
            language: {
                German: "R",
                SimplifiedChinese: "R",
                TraditionalChinese: "R",
                English: "R",
                Español: "R",
                French: "R",
                Italian: "R",
                Japanese: "R",
                Nederlands: "R",
                BrazilianPortuguese: "R",
                Russian: "R"
            }
        },
        // Green Color
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "GreenColor",
            selected: 255,
            result: 255,
            parents: this.key,
            mode: ModeType.verticalRange,
            rangeMin: 0,
            rangeMax: 255,
            language: {
                German: "G",
                SimplifiedChinese: "G",
                TraditionalChinese: "G",
                English: "G",
                Español: "G",
                French: "G",
                Italian: "G",
                Japanese: "G",
                Nederlands: "G",
                BrazilianPortuguese: "G",
                Russian: "G"
            }
        },
        // Blue Color
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "BlueColor",
            selected: 255,
            result: 255,
            parents: this.key,
            mode: ModeType.verticalRange,
            rangeMin: 0,
            rangeMax: 255,
            language: {
                German: "B",
                SimplifiedChinese: "B",
                TraditionalChinese: "B",
                English: "B",
                Español: "B",
                French: "B",
                Italian: "B",
                Japanese: "B",
                Nederlands: "B",
                BrazilianPortuguese: "B",
                Russian: "B"
            }
        }
    ]
};