/**
 * hslをrgbに変換する( 0 - 1の値です )
 * @see https://github.com/Jam3/glsl-hsl2rgb
 */
export const hsl2rgb = `
vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}
`;

/**
 * rgbをhslに変換する
 * @see https://gist.github.com/yiwenl/745bfea7f04c456e0101
 */
export const rgb2hsl = `
vec3 rgb2hsl( in vec3 c ){
    float h = 0.0;
      float s = 0.0;
      float l = 0.0;
      float r = c.r;
      float g = c.g;
      float b = c.b;
      float cMin = min( r, min( g, b ) );
      float cMax = max( r, max( g, b ) );
  
      l = ( cMax + cMin ) / 2.0;
      if ( cMax > cMin ) {
          float cDelta = cMax - cMin;
         
          //s = l < .05 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) ); Original
          s = l < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
         
          if ( r == cMax ) {
              h = ( g - b ) / cDelta;
          } else if ( g == cMax ) {
              h = 2.0 + ( b - r ) / cDelta;
          } else {
              h = 4.0 + ( r - g ) / cDelta;
          }
  
          if ( h < 0.0) {
              h += 6.0;
          }
          h = h / 6.0;
      }
      return vec3( h, s, l );
  }
`;

/**
 * @see https://gist.github.com/yiwenl/745bfea7f04c456e0101
 */
const hsv2rgb = `
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`;

/**
 * @see https://gist.github.com/yiwenl/745bfea7f04c456e0101
 */
const rgb2hsv = `
vec3 rgb2hsv(vec3 rgb) {
    float Cmax = max(rgb.r, max(rgb.g, rgb.b));
    float Cmin = min(rgb.r, min(rgb.g, rgb.b));
    float delta = Cmax - Cmin;

    vec3 hsv = vec3(0., 0., Cmax);

    if (Cmax > Cmin) {
        hsv.y = delta / Cmax;

        if (rgb.r == Cmax)
            hsv.x = (rgb.g - rgb.b) / delta;
        else {
            if (rgb.g == Cmax)
                hsv.x = 2. + (rgb.b - rgb.r) / delta;
            else
                hsv.x = 4. + (rgb.r - rgb.g) / delta;
        }
        hsv.x = fract(hsv.x / 6.);
    }
    return hsv;
}
`;

const ShaderColorConvert = `
${hsl2rgb}
${rgb2hsl}
${hsv2rgb}
${rgb2hsv}
`;

export default ShaderColorConvert;
