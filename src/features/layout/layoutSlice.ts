import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type Breadcrumb = Array<string | { name: string; path: string }>;

export interface LayoutState {
  collapsed: boolean;
  breadcrumb: Breadcrumb;
}

const initialState: LayoutState = {
  collapsed: false,
  breadcrumb: ['首页']
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
      state.breadcrumb = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    }
  }
});

export const { setBreadcrumb, setCollapsed } = layoutSlice.actions;

export const selectBreadcrumb = (state: RootState) => state.layout.breadcrumb;

export default layoutSlice.reducer;
