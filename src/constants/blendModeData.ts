export type BlendModeRoughTypeType =
  | 'blendModeNormal'
  | 'blendModeBrightnessMinus'
  | 'blendModeBrightnessPlusMinus'
  | 'blendModeBrightnessPlus'
  | 'blendModeMath';

export type BasicBlendModeType = 'normal';

export type BrightnessPlusBlendModesType =
  | 'lighten'
  | 'screen'
  | 'linearDodge'
  | 'colorDodge'
  | 'lighterColor';

export type BrightnessPlusMinusBlendModesType =
  | 'pinLight'
  | 'overlay'
  | 'linearLight'
  | 'vividLight'
  | 'softLight'
  | 'hardLight'
  | 'hardMix';

export type BrightnessMinusBlendModesType =
  | 'darken'
  | 'multiply'
  | 'linearBurn'
  | 'colorBurn'
  | 'darkerColor';

export type HSLBlendModesType = 'hue' | 'color' | 'saturation' | 'luminosity';

export type MathBlendModesType =
  | 'difference'
  | 'exclusion'
  | 'subtract'
  | 'divide';

export type BlendModesType =
  | BasicBlendModeType
  | BrightnessPlusBlendModesType
  | BrightnessPlusMinusBlendModesType
  | BrightnessMinusBlendModesType
  | HSLBlendModesType
  | MathBlendModesType;

export type BlendModeTypeBaseType = 'other' | 'normal' | 'hsl' | 'math';

export type BlendModeTypeBrightnessType = null | '+' | '+-' | '-';

export type BlendModeTypeMathType =
  | null
  | 'IndividualComparison'
  | 'Multiplication'
  | 'Addition'
  | 'Division'
  | 'TotalComparison';

export type BlendModeDataItemType = {
  mode: BlendModesType;
  type: {
    base: BlendModeTypeBaseType;
    brightness: BlendModeTypeBrightnessType;
    math: BlendModeTypeMathType;
  };
  name: {
    ja: string;
    equalJa?: string;
    equalEn?: string;
  };
  exist?: {
    adobe?: boolean;
    css?: boolean;
    blender?: boolean;
  };
  ready?: boolean;
};

export type BlendModeDataType = {
  [key in BlendModesType]: BlendModeDataItemType;
};

export type PartialBlendModeDataType = Partial<BlendModeDataType>;
/**
 * @see: https://twitter.com/optie_f/status/974263251071418368
 * @todo: existの箇所の対応(今はすべてtrueになってるので意味がない)
 */
const blendModeData: BlendModeDataType = {
  normal: {
    mode: `normal`,
    type: {
      base: `other`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `通常`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  lighten: {
    mode: `lighten`,
    type: {
      base: `normal`,
      brightness: `+`,
      math: `IndividualComparison`,
    },
    name: {
      ja: `比較(明)`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  screen: {
    mode: `screen`,
    type: {
      base: `normal`,
      brightness: `+`,
      math: `Multiplication`,
    },
    name: {
      ja: `スクリーン`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  linearDodge: {
    mode: `linearDodge`,
    type: {
      base: `normal`,
      brightness: `+`,
      math: `Addition`,
    },
    name: {
      equalJa: `加算`,
      ja: `覆い焼きリニア(加算)`,
      equalEn: `Add`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  colorDodge: {
    mode: `colorDodge`,
    type: {
      base: `normal`,
      brightness: `+`,
      math: `Division`,
    },
    name: {
      ja: `覆い焼きカラー`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  lighterColor: {
    mode: `lighterColor`,
    type: {
      base: `normal`,
      brightness: `+`,
      math: `TotalComparison`,
    },
    name: {
      ja: `カラー比較(明)`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  pinLight: {
    mode: `pinLight`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `IndividualComparison`,
    },
    name: {
      ja: `ピンライト`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  overlay: {
    mode: `overlay`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `Multiplication`,
    },
    name: {
      ja: `オーバーレイ`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  linearLight: {
    mode: `linearLight`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `Addition`,
    },
    name: {
      ja: `リニアライト`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  vividLight: {
    mode: `vividLight`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `Division`,
    },
    name: {
      ja: `ビビッドライト`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  softLight: {
    mode: `softLight`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `TotalComparison`,
    },
    name: {
      ja: `ソフトライト`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  hardLight: {
    mode: `hardLight`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `Multiplication`,
    },
    name: {
      ja: `ハードライト`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  hardMix: {
    mode: `hardMix`,
    type: {
      base: `normal`,
      brightness: `+-`,
      math: `Division`,
    },
    name: {
      ja: `ハードミックス`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  darken: {
    mode: `darken`,
    type: {
      base: `normal`,
      brightness: `-`,
      math: `IndividualComparison`,
    },
    name: {
      ja: `比較(暗)`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  multiply: {
    mode: `multiply`,
    type: {
      base: `normal`,
      brightness: `-`,
      math: `Multiplication`,
    },
    name: {
      ja: `乗算`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  linearBurn: {
    mode: `linearBurn`,
    type: {
      base: `normal`,
      brightness: `-`,
      math: `Addition`,
    },
    name: {
      ja: `焼き込みリニア`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  colorBurn: {
    mode: `colorBurn`,
    type: {
      base: `normal`,
      brightness: `-`,
      math: `Division`,
    },
    name: {
      ja: `焼き込みカラー`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  darkerColor: {
    mode: `darkerColor`,
    type: {
      base: `normal`,
      brightness: `-`,
      math: `TotalComparison`,
    },
    name: {
      ja: `カラー比較(暗)`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  hue: {
    mode: `hue`,
    type: {
      base: `hsl`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `色相`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
    ready: false,
  },
  color: {
    mode: `color`,
    type: {
      base: `hsl`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `カラー`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
    ready: false,
  },
  saturation: {
    mode: `saturation`,
    type: {
      base: `hsl`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `彩度`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
    ready: false,
  },
  luminosity: {
    mode: `luminosity`,
    type: {
      base: `hsl`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `輝度`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
    ready: false,
  },
  difference: {
    mode: `difference`,
    type: {
      base: `math`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `差の絶対値`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  exclusion: {
    mode: `exclusion`,
    type: {
      base: `math`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `除外`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  subtract: {
    mode: `subtract`,
    type: {
      base: `math`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `減算`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
  divide: {
    mode: `divide`,
    type: {
      base: `math`,
      brightness: null,
      math: null,
    },
    name: {
      ja: `除算`,
    },
    exist: {
      adobe: true,
      css: true,
      blender: true,
    },
  },
};

export default blendModeData;
