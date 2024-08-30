import { RootState } from "../hooks";

export const getModalSelector = (state: RootState) => state.modal;

export const getModalActionSelector = (state: RootState) => state.modal.action;

export const getModalEventSelector = (state: RootState) => state.modal.event;

export const getModalErrorMessageSelector = (state: RootState) => state.modal.errorMessage;

export const getModalSuccessMessageSelector = (state: RootState) => state.modal.successMessage;