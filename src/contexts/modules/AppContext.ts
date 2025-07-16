import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI as ModalInstance } from 'antd/es/modal/useModal';
import { NotificationInstance } from 'antd/es/notification/interface';
import { createContext } from 'react';

export type AppContextType = {
  message: MessageInstance;
  modal: ModalInstance;
  notification: NotificationInstance;
} | null;

export const AppContext = createContext<AppContextType>(null);
