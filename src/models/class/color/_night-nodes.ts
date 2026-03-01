// 顏色 > 冷色

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

export default class CoolNodes extends DefaultNodes implements Nodes {
    key = "Night";
    selected = "Night";
    result = "Night";
    livePreview = true;
    mode = ModeType.radio;
    language = {
        German: "Nacht",
        SimplifiedChinese: "夜晚",
        TraditionalChinese: "夜間",
        English: "Night",
        Español: "Noche",
        French: "Nuit",
        Italian: "Notte",
        Japanese: "夜",
        Nederlands: "Nacht",
        BrazilianPortuguese: "Noite",
        Russian: "Ночь"
    };
};