export const initalValue: InitalState = {
  isAccount: false,
  regInfo: { username: "", email: "", password: "" },
};

interface ReginfoProps {
  username: string;
  email: string;
  password: string;
}

interface InitalState {
  isAccount: boolean;
  regInfo: ReginfoProps;
}

export enum ACTION_TYPES {
  HAVE_ACCOUNT,
  USER_INFO,
}

type REDUCER_ACTON = {
  type: ACTION_TYPES;
  reginfo?:ReginfoProps
};

const reducer = (state = initalValue, action: REDUCER_ACTON) => {
  switch (action.type) {
    case ACTION_TYPES.HAVE_ACCOUNT:
      return { ...state, isAccount: !state.isAccount };
    case ACTION_TYPES.USER_INFO:
      return { ...state, regInfo: { ...state.regInfo, ...action.reginfo } };
    default:
      return state;
  }
};

export default reducer;
