/**
 * 英語文字列の最初の文字を大文字に変換して返す関数
 */
export default (inputString: string): string => {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};
