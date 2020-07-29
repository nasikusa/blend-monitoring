import CreateShaderBlend from './CreateShaderBlend';

/**
 * ベースとなるカラーに色を追加する処理プロセス - main関数内で実行される
 * @param multiLayerData 複数のレイヤー情報
 * @param baseLayerName 最終出力されるベースとなるレイヤーの名前
 * @todo 透過度対応
 */
export default (multiLayerData: any, baseLayerName: string) => {
  /**
   * シェーダー文字列の配列
   */
  const resultShaderArray: string[] = multiLayerData.map(
    (singleLayerData: any) => {
      const { layerNumber, blendMode, opacity } = singleLayerData;
      const shader: string = `
        ${baseLayerName} = ${CreateShaderBlend(
        blendMode,
        opacity,
        baseLayerName,
        `layer${layerNumber}ColorVec3`
      )}
        `;

      return shader;
    }
  );

  const resultShader: string = resultShaderArray.join('\n');

  return resultShader;
};
