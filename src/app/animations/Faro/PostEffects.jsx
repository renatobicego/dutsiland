import {
  EffectComposer,
  N8AO,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";

const PostEffects = () => {
  return (
    <EffectComposer multisampling={4}>
      {/* Ambient Occlusion — da profundidad a los rincones y detalles */}
      <N8AO
        aoRadius={0.8}
        intensity={2.5}
        aoSamples={16}
        denoiseSamples={8}
        distanceFalloff={0.5}
        screenSpaceRadius={false}
      />
      {/* Contraste y desaturación leve para el look sepia */}
      <BrightnessContrast brightness={0.02} contrast={0.1} />
      <HueSaturation saturation={-0.05} hue={0} />
    </EffectComposer>
  );
};

export default PostEffects;
