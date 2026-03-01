// 顏色 > 中性色

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

export default class NeutralNodes extends DefaultNodes implements Nodes {
    key = "Neutral";
    selected = "Neutral";
    result = "Neutral";
    livePreview = true;
    mode = ModeType.radio;
    language = {
        German: "Neutral",
        SimplifiedChinese: "中性色",
        TraditionalChinese: "中性色",
        English: "Neutral",
        Español: "Neutro",
        French: "Neutre",
        Italian: "Neutro",
        Japanese: "無彩色",
        Nederlands: "Neutraal",
        BrazilianPortuguese: "Neutra",
        Russian: "Нейтральный"
    };
};