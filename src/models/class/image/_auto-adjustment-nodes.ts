// 影像 > 自動調整

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../_utilities';

export default class AutoAdjustmentNodes extends DefaultNodes implements Nodes {
    key = "AutoAdjustment";
    mode = ModeType.button;
    only = ["VGA"];
    language = {
        German: "Automat. Einstellung",
        SimplifiedChinese: "自动调整",
        TraditionalChinese: "自動調整",
        English: "Auto-Adjustment",
        Español: "Ajuste automático",
        French: "Réglage auto",
        Italian: "Regolazione autom.",
        Japanese: "自動調整",
        Nederlands: "Automatisch aanpassen",
        BrazilianPortuguese: "Ajuste Automático",
        Russian: "Автом. регулировка"
    };
};