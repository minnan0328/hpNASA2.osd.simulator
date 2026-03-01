// 顏色 > 冷色

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

export default class CoolNodes extends DefaultNodes implements Nodes {
    key = "Cool";
    selected = "Cool";
    result = "Cool";
    livePreview = true;
    mode = ModeType.radio;
    language = {
        German: "Kühl",
        SimplifiedChinese: "冷色",
        TraditionalChinese: "冷色",
        English: "Cool",
        Español: "Frío",
        French: "Froid",
        Italian: "Freddo",
        Japanese: "寒色",
        Nederlands: "Koel",
        BrazilianPortuguese: "Suave",
        Russian: "Холодный"
    };
};