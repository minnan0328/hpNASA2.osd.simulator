// 顏色 > 原生

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

export default class NativeNodes extends DefaultNodes implements Nodes {
    key = "Native";
    selected = "Native";
    result = "Native";
    livePreview = true;
    mode = ModeType.radio;
    language = {
        German: "Eigen",
        SimplifiedChinese: "本机",
        TraditionalChinese: "原生",
        English: "Native",
        Español: "Nativo",
        French: "Native",
        Italian: "Nativo",
        Japanese: "ネイティブ",
        Nederlands: "Eigen",
        BrazilianPortuguese: "Nativo",
        Russian: "Исходный"
    };
};