// 影像 > 影像位置

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, BackNodes } from '../_utilities';
const DefaultNodesEnum = new DefaultNodes();
const BackNodesEnum = new BackNodes();

export default class ImagePositionPlusNodes extends DefaultNodes implements Nodes {
    key = "ImagePosition";
    size = 3;
    page = 1;
    mode = ModeType.button;
    only = ["VGA"];
    language = {
        German: "Bildposition",
        SimplifiedChinese: "图像位置",
        TraditionalChinese: "影像位置",
        English: "Image Position",
        Español: "Posición de la imagen",
        French: "Position de l'image",
        Italian: "Posizione immagine",
        Japanese: "画面の位置",
        Nederlands: "Afbeeldingspositie",
        BrazilianPortuguese: "Posição da imagem",
        Russian: "Положение изобр-ния"
    };
    nodes = [
        // 水平
        {
            // VGA only - Range (0~100)
            ...DefaultNodesEnum,
            key: "Horizontal",
            selected: 50,
            result: 50,
            parents: this.key,
            mode: ModeType.horizontalRange,
            rangeMin: 0,
            rangeMax: 100,
            horizontalRangeFocus: true,
            only: ["VGA"],
            language: {
                German: "Horizontal",
                SimplifiedChinese: "水平",
                TraditionalChinese: "水平",
                English: "Horizontal",
                Español: "Horizontal",
                French: "Horizontal",
                Italian: "Orizzontale",
                Japanese: "水平",
                Nederlands: "Horizontaal",
                BrazilianPortuguese: "Horizontal",
                Russian: "Горизонтально"
            }
        },
        // 垂直
        {
            // Range (0~100)
            ...DefaultNodesEnum,
            key: "Vertical",
            selected: 50,
            result: 50,
            parents: this.key,
            mode: ModeType.horizontalRange,
            rangeMin: 0,
            rangeMax: 100,
            horizontalRangeFocus: false,
            only: ["VGA"],
            language: {
                German: "Vertikal",
                SimplifiedChinese: "垂直",
                TraditionalChinese: "垂直",
                English: "Vertical",
                Español: "Vertical",
                French: "Vertical",
                Italian: "Verticale",
                Japanese: "垂直",
                Nederlands: "Verticaal",
                BrazilianPortuguese: "Vertical",
                Russian: "Вертикально"
            }
        },
        // 上一步
        {
            ...BackNodesEnum,
            parents: this.key,
        }
    ];
};