/**
 * URL文字列であるかどうかを判別する関数
 * @param inputString 入力文字列
 */
const isValidURL = (inputString: string): boolean => {
  /**
   * @see https://www.it-swarm.dev/ja/javascript/javascript%E3%81%AE%E6%96%87%E5%AD%97%E5%88%97%E3%81%8Curl%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%82%92%E7%A2%BA%E8%AA%8D/971354377/
   */
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(inputString);
};

export default isValidURL;
