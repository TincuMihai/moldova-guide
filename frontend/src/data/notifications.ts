import type { Notification } from '../types';

export const mockNotifications: Notification[] = [
  { id: 'n1', text: 'Turul „Istoria Ascunsă" a fost confirmat pentru 22 feb.', time: '2 ore', type: 'success', read: false },
  { id: 'n2', text: 'Alexandru ți-a trimis un mesaj despre turul din 7 martie.', time: '5 ore', type: 'info', read: false },
  { id: 'n3', text: 'Ai primit o reducere de 15% la tururile de vinuri!', time: '1 zi', type: 'promo', read: true },
  { id: 'n4', text: 'Recenzia ta pentru „Street Art Tour" a fost publicată.', time: '2 zile', type: 'success', read: true },
];
