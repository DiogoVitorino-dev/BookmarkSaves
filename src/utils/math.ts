function percentageDecrease(
  value: number,
  decrease: number,
  fractionDigits?: number
) {
  const result = value * Math.abs((decrease - 100) / 100);

  return fractionDigits !== undefined
    ? Number(result.toFixed(fractionDigits))
    : result;
}

interface InterpolateRange {
  min: number;
  max: number;
}
function interpolate(
  value: number,
  input: InterpolateRange,
  output: InterpolateRange
) {
  // Ensures the value is within the input range
  value = Math.max(input.min, Math.min(input.max, value));

  let interpolated =
    output.min +
    ((value - input.min) / (input.max - input.min)) * (output.max - output.min);

  // Ensure the interpolated value is within the output range
  interpolated = Math.max(output.min, Math.min(output.max, interpolated));

  return interpolated;
}

const closest = (target: number, ...values: number[]) =>
  values.reduce((prev, curr) =>
    Math.abs(target - prev) > Math.abs(target - curr) ? curr : prev
  );

export const MathUtils = { percentageDecrease, interpolate, closest };
