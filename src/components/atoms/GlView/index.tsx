import React, { useContext } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';

import CreateShaderVariables from './script/CreateShaderVariables';
import CreateShaderUniforms from './script/CreateShaderUniforms';
import CreateShaderFunctions from './script/CreateShaderFunctions';
import CreateShaderProcesses from './script/CreateShaderProcesses';
import CreateShaderProcessesVariables from './script/CreateShaderProcessesVariables';
import { GlItemOrderContext } from '../../organisms/GlBox';

import { GlSettingsType } from '../../../stores/glSettings';
import { GlCollectionTypeArray } from '../../../stores/collectionData';
import { StoredMediaStateType } from '../../../stores/storedMedia';
import isEmptyMultiCollections from '../../../utils/isEmptyMultiCollections';

type Props = {
  glSettings: GlSettingsType;
  storedMediaState: StoredMediaStateType;
  multiCollectionData: GlCollectionTypeArray;
};

/**
 * 最終的に描画されるベースとなるカラー変数名
 */
export const glResultColorName = `resultColor`;
/**
 * ベースとなるuv変数の名前
 */
export const glUVName = `uv`;

/**
 * シェーダー描画部分を担当する関数
 */
const GlView: React.FC<Props> = (props: Props) => {
  const { glSettings, multiCollectionData, storedMediaState } = props;

  /**
   * glsl描画アイテムの順番
   */
  const glItemOrderKey = useContext(GlItemOrderContext);

  const isEmptyMultiCollectionsFlag = isEmptyMultiCollections(
    multiCollectionData
  );

  let shaderString = `
  precision highp float;
  void main(){
    gl_FragColor = vec4( 0.0, 0.0, 0.0 , 1.0 );
  }
  `;
  let shaderUniformValue = {};

  if (isEmptyMultiCollectionsFlag) {
    shaderString = `
    precision highp float;
    varying vec2 ${glUVName};
    ${CreateShaderVariables(multiCollectionData)}
    ${CreateShaderFunctions()}

    void main() {
      vec3 ${glResultColorName} = vec3(0.0);
      ${CreateShaderProcessesVariables(
        multiCollectionData,
        glUVName,
        glSettings,
        glItemOrderKey,
        storedMediaState
      )}

      ${CreateShaderProcesses(
        multiCollectionData,
        glResultColorName,
        glItemOrderKey
      )}

      gl_FragColor = vec4( ${glResultColorName} , 1.0 );
    }
    `;

    // console.log(shaderString);

    shaderUniformValue = {
      ...CreateShaderUniforms(
        multiCollectionData,
        glItemOrderKey,
        storedMediaState
      ),
    };
  }

  /**
   * シェーダー本体
   */
  const shaders = Shaders.create({
    firstGL: {
      frag: GLSL`
            ${shaderString}
            `,
    },
  });

  return (
    <div>
      <Surface
        width={glSettings.singleItemWidth}
        height={glSettings.singleItemWidth * glSettings.singleItemAspect}
      >
        <Node shader={shaders.firstGL} uniforms={shaderUniformValue} />
      </Surface>
    </div>
  );
};

export default GlView;
