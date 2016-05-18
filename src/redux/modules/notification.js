export function notification(message, kind) {
  return {
    message: message,
    kind: kind ? kind : 'info',
    dismissAfter: 2000
  };
};

export default notification;
