import { useStore } from '@/stores/index';
import type { Nodes } from '@/types';
import { toLanguageText, toDisplayValueLanguageText } from './toDisplayLanguageText';
const store = useStore();

export function isEnableNode(nodes: Nodes): boolean {
    return nodes.only?.includes(store.$state.input.selected) ? true : false;
};

export function getIconSrc (icon: string) {
    return new URL(`/src/assets/icons/${icon}`, import.meta.url).href;
};

export function toLowerCaseFirstChar(str: string): string {
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
}

export {
    toLanguageText,
    toDisplayValueLanguageText,
}