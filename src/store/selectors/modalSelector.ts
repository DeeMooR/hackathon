import { RootState } from "../hooks";

export const getModalSelector = (state: RootState) => state.modal;

export const getModalActionSelector = (state: RootState) => state.modal.action;

export const getModalErrorMessageSelector = (state: RootState) => state.modal.errorMessage;