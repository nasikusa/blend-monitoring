/**
 *
 * @see : https://gist.github.com/mattdesl/6024dfb256406e7d325dd9d4c6e64c13
 */
export const ShaderContainImageSize = `
vec2 ShaderContainImageSize (vec2 uv, vec2 resolution, vec2 texResolution) {
    float tAspect = texResolution.x / texResolution.y;
    float pAspect = resolution.x / resolution.y;
    float pwidth = resolution.x;
    float pheight = resolution.y;
    
    float width = 0.0;
    float height = 0.0;  
    if (tAspect > pAspect) {
      height = pheight;
      width = height * tAspect; 
    } else {
      width = pwidth;
      height = width / tAspect;
    }
    float x = (pwidth - width) / 2.0;
    float y = (pheight - height) / 2.0;
    vec2 nUv = uv;
    nUv -= vec2(x, y) / resolution;
    nUv /= vec2(width, height) / resolution;
    return nUv;
  }
`;

/**
 * cssのbackground-size: coverのような効果のシェーダー
 * @see : https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
 */
export const ShaderCoverImageSize = `
vec2 ShaderCoverImageSize( vec2 uv, vec2 resolution, vec2 texResolution ){
    vec2 s = resolution; // Screen
    vec2 i = texResolution; // Image
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 resuv = uv * s / new + offset;
    return resuv;
}
`;
