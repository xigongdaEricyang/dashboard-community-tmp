import { createModel } from '@rematch/core';

interface IState {
  version: string;
  username: string;
  aliasConfig: any;
}

export const app = createModel({
  state: {
    version: '',
    username: '',
    aliasConfig: {} as any,
    connection: {} as any,
  },
  reducers: {
    update: (state: IState, payload: any) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (_dispatch: any) => ({
    
  })
});