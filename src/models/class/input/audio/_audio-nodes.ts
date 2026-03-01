// 管理 > 無障礙

import type { Nodes } from "@/types";
import { ModeType } from "@/types";
import { DefaultNodes, BackNodes } from '../../_utilities';
import VolumeNodes from './_volume-nodes';

const DefaultNodesEnum = new DefaultNodes();
const VolumeNodesEnum = new VolumeNodes();
const BackNodesEnum = new BackNodes();

export default class AudioNodes extends DefaultNodes implements Nodes {
    key = "Audio";
    selected = ["Enable Speakers"];
    result = ["Enable Speakers"];
    assignDisplay = false;
    size = 7;
    page = 1;
    mode = ModeType.button;
    only = ["DisplayPort", "HDMI"]
    language = {
        German: "Audio",
        SimplifiedChinese: "音效",
        TraditionalChinese: "音訊",
        English: "Audio",
        Español: "Áudio",
        French: "Audio",
        Italian: "Audio",
        Japanese: "オーディオ",
        Nederlands: "Audio",
        BrazilianPortuguese: "Áudio",
        Russian: "Аудио"
    };
    nodes = [
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "EnableSpeakers",
            selected: "Enable Speakers",
            result: "Enable Speakers",
            parents: this.key,
            mode: ModeType.checkBox,
            only: this.only,
            language: {
                German: "Lautsprecher einschalten",
                SimplifiedChinese: "启用扬声器",
                TraditionalChinese: "啟用喇叭",
                English: "Enable Speakers",
                Español: "Activar altavoces",
                French: "Activer les haut-parleurs",
                Italian: "Abilita altoparlanti",
                Japanese: "スピーカーを有効化",
                Nederlands: "Luidsprekers inschakelen",
                BrazilianPortuguese: "Ativar altifalantes",
                Russian: "Включить динамики"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "AudioFollowsVideo",
            selected: "HDMI Audio",
            result: "HDMI Audio",
            parents: "EnableSpeakers",
            mode: ModeType.info,
            only: this.only,
            language: {
                German: "Audio folgt Video",
                SimplifiedChinese: "音频跟随视频",
                TraditionalChinese: "根據視訊源使用音源",
                English: "Audio Follows Video",
                Español: "El audio sigue al video",
                French: "L'audio suit la vidéo",
                Italian: "Audio segue video",
                Japanese: "ビデオのオーディオを使用",
                Nederlands: "Audio volgt video",
                BrazilianPortuguese: "Áudio segue vídeo (AFV)",
                Russian: "Аудио следует за видео"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "DisplayPortAudio",
            selected: "DisplayPort Audio",
            result: "DisplayPort Audio",
            parents: "AudioFollowsVideo",
            mode: ModeType.radio,
            only: this.only,
            language: {
                German: "DisplayPort Audio",
                SimplifiedChinese: "DisplayPort 音频",
                TraditionalChinese: "DisplayPort 音源",
                English: "DisplayPort Audio",
                Español: "áudio DisplayPort",
                French: "Audio DisplayPort",
                Italian: "Audio DisplayPort",
                Japanese: "DisplayPortオーディオ",
                Nederlands: "DisplayPort Audio",
                BrazilianPortuguese: "áudio DisplayPort",
                Russian: "Аудио DisplayPort"
            }
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "HDMIAudio",
            selected: "HDMI Audio",
            result: "HDMI Audio",
            parents: "AudioFollowsVideo",
            mode: ModeType.radio,
            only: this.only,
            language: {
                German: "HDMI-Audio",
                SimplifiedChinese: "HDMI 音频",
                TraditionalChinese: "HDMI 音源",
                English: "HDMI Audio",
                Español: "áudio HDMI",
                French: "Audio HDMI",
                Italian: "HDMI-Audio",
                Japanese: "HDMI オーディオ",
                Nederlands: "HDMI-audio",
                BrazilianPortuguese: "áudio HDMI",
                Russian: "Аудио HDMI"
            }
        },
        {
            ...JSON.parse(JSON.stringify(VolumeNodesEnum)),
            parents: this.key,
        },
        {
            ...JSON.parse(JSON.stringify(DefaultNodesEnum)),
            key: "InternalSpeakerSelfTest",
            selected: null,
            result: null,
            parents: this.key,
            mode: ModeType.button,
            only: this.only,
            language: {
                German: "Interner Lautsprecherselbsttest",
                SimplifiedChinese: "内置扬声器自检",
                TraditionalChinese: "內建喇叭自我測試",
                English: "Internal Speaker Self-Test",
                Español: "Prueba auto. de altavoz interno",
                French: "Test auto. du haut-parleur int.",
                Italian: "Autotest altoparlante interno",
                Japanese: "内蔵スピーカーのセルフテスト",
                Nederlands: "Zelftest interne luidspreker",
                BrazilianPortuguese: "Autoteste do altifalante interno",
                Russian: "Самопроверка встроенн. динамика"
            },
        },
        // 上一步
        {
            ...JSON.parse(JSON.stringify(BackNodesEnum)),
            parents: this.key
        }
    ]
};