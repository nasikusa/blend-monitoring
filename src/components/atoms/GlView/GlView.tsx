import React, { useContext } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';

import CreateShaderVariables from '../../../utils/shader/CreateShaderVariables';
import CreateShaderUniforms from '../../../utils/shader/CreateShaderUniforms';
import CreateShaderFunctions from '../../../utils/shader/CreateShaderFunctions';
import CreateShaderProcesses from '../../../utils/shader/CreateShaderProcesses';
import CreateShaderProcessesVariables from '../../../utils/shader/CreateShaderProcessesVariables';
import { GlItemOrderContext } from '../../organisms/GlBox/GlItemOrderContextElement';

import { GlSettingsType } from '../../../stores/general/glSettings';
import { GlCollectionTypeArray } from '../../../types/collection/collectionData';
import { StoredMediaStateType } from '../../../stores/image/storedMedia';
import isEmptyMultiCollections from '../../../utils/collection/isEmptyMultiCollections';

type Props = {
  glSettings: GlSettingsType;
  storedMediaState: StoredMediaStateType;
  multiCollectionData: GlCollectionTypeArray;
};

const surfaceBaseStyle = css`
  > span {
    display: block;
    vertical-align: bottom;
  }
`;

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
    <Box css={surfaceBaseStyle}>
      <Surface
        width={glSettings.singleItemWidth - 24}
        height={(glSettings.singleItemWidth - 24) * glSettings.singleItemAspect}
      >
        <Node shader={shaders.firstGL} uniforms={shaderUniformValue} />
      </Surface>
    </Box>
  );
};

export default GlView;
