interface INotificationData {
  icon: string,
  style: string,
}

export const NotificationData: { [type: string]: INotificationData } = {
  success: {
    icon: '✔',
    style: 'isSuccess'
  },
  error: {
    icon: '!',
    style: 'isError'
  }
};