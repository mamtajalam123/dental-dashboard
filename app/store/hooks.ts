// src/store/hooks.ts

import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "./index";

// Typed Dispatch Hook
export const useAppDispatch =
  () => useDispatch<AppDispatch>();

// Typed Selector Hook
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;