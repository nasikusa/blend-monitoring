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
import { GlCollectionInterfaceArray } from '../../../stores/collectionData';

type Props = {
  itemKey: number;
  glSettings: GlSettingsType;
  multiCollectionData: GlCollectionInterfaceArray;
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
  const { glSettings, multiCollectionData } = props;

  /**
   * glsl描画アイテムの順番
   */
  const glItemOrderKey = useContext(GlItemOrderContext);

  /**
   * シェーダー文字列
   */
  const shaderString = `
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
          glItemOrderKey
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
        height={glSettings.singleItemHeight}
      >
        <Node
          shader={shaders.firstGL}
          uniforms={{
            ...CreateShaderUniforms(multiCollectionData, glItemOrderKey),
          }}
        />
      </Surface>
    </div>
  );
};

export default GlView;
