/**
 * 文字列全体が大文字であるかを確認する関数(最初の文字ではないです)
 * @param c 文字列
 */
export const isUpperCase = (c: string): boolean => {
  return /^[A-Z]+$/g.test(c);
};

/**
 * 文字列の最初が大文字かどうかを返す関数
 * @param c 文字列
 */
export const isFirstUpperCase = (c: string): boolean => {
  return isUpperCase(c.charAt(0));
};

/**
 * 文字列の最初の文字を大文字にして返す関数
 */
export function getFirstStringToUpper(inputString: string): string {
  return inputString.charAt(0).toUpperCase();
}

/**
 * 文字列の最初の文字を小文字にして返す関数
 */
export function getFirstStringToLower(inputString: string): string {
  return inputString.charAt(0).toLowerCase();
}

/**
 * 文字列の最初の文字を抜いて返す関数
 * @param inputString
 */
export function getStringIgnoreFirstString(inputString: string): string {
  return inputString.slice(1);
}

/**
 * 英語文字列の最初の文字を大文字に変換して返す関数
 */
export default (
  inputString: string,
  notAllowEmptyString: boolean = false
): string => {
  if (inputString.length > 0) {
    return (
      getFirstStringToUpper(inputString) +
      getStringIgnoreFirstString(inputString)
    );
  }
  if (notAllowEmptyString) {
    throw new Error('文字列の長さは1以上である必要があります。');
  }
  return '';
};

/**
 * firstStringUpperCase関数で一文字目を大文字にした文字列をもとに戻す関数
 * inputString がない場合は、すべて最初の文字列をlowercaseにする。ある場合は、元の文字列から判断する。
 * @param changedString firstStringUpperCase関数で変更した文字列
 * @param inputString 変更する前の文字列
 */
export function restoreFirstStringUpperCase(
  changedString: string,
  inputString?: string
): string {
  if (changedString.length > 0) {
    if (inputString == null || !isUpperCase(inputString.charAt(0))) {
      return (
        getFirstStringToLower(changedString) +
        getStringIgnoreFirstString(changedString)
      );
    }
    return inputString;
  }
  return '';
}
