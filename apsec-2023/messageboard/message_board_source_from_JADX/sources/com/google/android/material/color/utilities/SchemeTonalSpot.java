package com.google.android.material.color.utilities;

public class SchemeTonalSpot extends DynamicScheme {
    public SchemeTonalSpot(Hct hct, boolean z, double d) {
        super(hct, Variant.TONAL_SPOT, z, d, TonalPalette.fromHueAndChroma(hct.getHue(), 40.0d), TonalPalette.fromHueAndChroma(hct.getHue(), 16.0d), TonalPalette.fromHueAndChroma(MathUtils.sanitizeDegreesDouble(hct.getHue() + 60.0d), 24.0d), TonalPalette.fromHueAndChroma(hct.getHue(), 6.0d), TonalPalette.fromHueAndChroma(hct.getHue(), 8.0d));
    }
}
