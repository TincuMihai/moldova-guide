export type NotificationType = 'success' | 'info' | 'warning' | 'promo';

export interface Notification {
  id: string;
  text: string;
  time: string;
  type: NotificationType;
  read: boolean;
}
