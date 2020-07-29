import React from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';

import CreateShaderUniforms from './script/CreateShaderUniforms';
import CreateShaderFunctions from './script/CreateShaderFunctions';
import CreateShaderProcesses from './script/CreateShaderProcesses';
import CreateShaderProcessesVariables from './script/CreateShaderProcessesVariables';
import CreateShaderVariables from './script/CreateShaderVariables';

/**
 * シェーダー描画部分を担当する関数
 */
const GlView: React.FC = (props: any) => {
  const { itemKey, allLayerData, glSettings } = props;

  const multiLayerData = allLayerData[itemKey];

  /**
   * 最終的に描画されるベースとなるカラー変数名
   */
  const glResultColorName = `resultColor`;
  /**
   * ベースとなるuv変数の名前
   */
  const glUVName = `uv`;

  /**
   * シェーダー文字列
   */
  const shaderString = `
      precision highp float;
      varying vec2 ${glUVName};
      ${CreateShaderVariables(multiLayerData)}
      ${CreateShaderFunctions(multiLayerData)}
      
      void main() {
        vec3 ${glResultColorName} = vec3(0.0);
        ${CreateShaderProcessesVariables(multiLayerData, glUVName, glSettings)}

        ${CreateShaderProcesses(multiLayerData, glResultColorName)}

        gl_FragColor = vec4( ${glResultColorName} , 1.0 );
      }   
      `;
  // console.log(shaderString);

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
          uniforms={{ ...CreateShaderUniforms(multiLayerData) }}
        />
      </Surface>
    </div>
  );
};

export default GlView;
