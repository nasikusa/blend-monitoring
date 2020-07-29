export default (
  blendMode: string,
  opacity: any,
  baseLayerName: string,
  blendLayerName: string
) => {
  let inputOpacity = ``;
  if (opacity === 1) {
    inputOpacity = `1.0`;
  } else if (opacity === 0) {
    inputOpacity = `0.0`;
  }

  const resultShader = `blend${
    blendMode.charAt(0).toUpperCase() + blendMode.slice(1)
  }( ${baseLayerName} , ${blendLayerName} , ${inputOpacity} );`;
  return resultShader;
};
