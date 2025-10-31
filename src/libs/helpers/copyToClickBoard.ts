export const copyToClickBoard = (text: string) => {
  navigator.clipboard.writeText(text).catch(() => {});
};
