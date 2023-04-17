import { createContext, useState, ReactNode, FC } from "react";

interface GlobalContextType {
  userId: number;
  nickname: string;
  avatar: string;
  /**
   * 登录后更新全局上下文中的用户信息
   */
  updateUserInfo: (
    data: Partial<Pick<GlobalContextType, "userId" | "avatar" | "nickname">>
  ) => void;
}

const globalContext = createContext<GlobalContextType>({} as any);

const GlobalContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [ctxValue, setCtxValue] = useState<GlobalContextType>({
    userId: 1,
    nickname: "zzx",
    avatar: "",
    updateUserInfo: (info) => setCtxValue({ ...ctxValue, ...info }),
  });
  return (
    <globalContext.Provider value={ctxValue}>{children}</globalContext.Provider>
  );
};

export { GlobalContextWrapper, globalContext };
