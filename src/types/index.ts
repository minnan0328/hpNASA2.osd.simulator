// enum
export enum ModeType {
    horizontalRange = "horizontalRange",
    verticalRange = "verticalRange",
    radio = "radio",
    button = "button",
    paginationButton = "PaginationButton",
    checkBox ="checkBox",
    message = "message",
    info = "info",
    exit = "exit"
};

export interface Language {
    German: string,
    SimplifiedChinese: string,
    TraditionalChinese: string,
    English: string,
    Español: string,
    French: string,
    Italian: string,
    Japanese: string,
    Nederlands: string,
    BrazilianPortuguese: string,
    Russian: string
};

// interface
export interface Nodes {
    key: string;
    selected: number | string | string[] | boolean | null;
    result: number | string | string[] | boolean | null;
    assignDisplay: Boolean;
    disabled: Boolean;
    displayValue: boolean;
    displayState: boolean;
    livePreview: Boolean;
    size: number;
    page: number; // 當有啟用分頁需加入 NextPageButtonsNodes 及 PreviousPageButtonsNodes
    parents: string | null;
    mode: string;
    rangeMin: number;
    rangeMax: number;
    horizontalRangeFocus: boolean;
    rangeMaxIcon: string | null;
    rangeMinIcon: string | null;
    mergeGrid: boolean;
    only: string[];
    language: Language | null;
    unit: Language | null;
    nodes: Nodes[] | null;
};

export interface ControllerButtonList {
    image: string | null,
    event: (() => void),
    stopEvent: (() => void),
    type: string
};

export interface HomeEvent {
    [key: string]: () => void;
};
