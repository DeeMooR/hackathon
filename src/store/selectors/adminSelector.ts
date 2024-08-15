import { RootState } from "../hooks";

export const getAdminSelector = (state: RootState) => state.admin;

export const getAdminModalSelector = (state: RootState) => state.admin.modal;

export const getAdminModalActionSelector = (state: RootState) => state.admin.modal.action;