import { reactive, provide, inject } from 'vue';

export const stateSymbol = Symbol('state');
export const createState = () => reactive({ counter: 0 });

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
