// 管理 > 無障礙

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes } from '../../_utilities';

const DefaultNodesEnum = new DefaultNodes();

export default class AudioNodes extends DefaultNodes implements Nodes {
    key = "Volume";
    selected = 50;
    result = 50;
    size = 1;
    page = 1;
    mode = ModeType.button;
    only = ["DisplayPort", "HDMI"]
    language = {
        German: "Lautstärke",
        SimplifiedChinese: "音量",
        TraditionalChinese: "音量",
        English: "Volume",
        Español: "Volumen",
        French: "Volume",
        Italian: "Volume",
        Japanese: "音量",
        Nederlands: "Volume",
        BrazilianPortuguese: "Volume",
        Russian: "Громкость"
    };
    nodes = [
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "VolumeRange",
            selected: this.selected,
            result: this.result,
            parents: this.key,
            mode: ModeType.verticalRange,
            rangeMin: 0,
            rangeMax: 100,
            rangeMaxIcon: "icon-sound.svg",
            rangeMinIcon: "icon-sound-mute.svg",
            language: this.language
        },
    ]
};