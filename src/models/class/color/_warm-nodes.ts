// 顏色 > 暖色

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';
export default class WarmNodes extends DefaultNodes implements Nodes {
    key = "Warm";
    selected = "Warm";
    result = "Warm";
    livePreview = true;
    mode = ModeType.radio;
    language = {
        German: "Warm",
        SimplifiedChinese: "暖色",
        TraditionalChinese: "暖色",
        English: "Warm",
        Español: "Caldo",
        French: "Chaud",
        Italian: "Caldo",
        Japanese: "暖色",
        Nederlands: "Warm",
        BrazilianPortuguese: "Aquecida",
        Russian: "Теплый"
    };
};