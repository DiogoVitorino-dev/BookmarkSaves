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
  // Ordena os valores de entrada para garantir interpolação correta
  const [inputMin, inputMax] =
    input.min < input.max ? [input.min, input.max] : [input.max, input.min];
  const [outputMin, outputMax] =
    output.min < output.max
      ? [output.min, output.max]
      : [output.max, output.min];

  // Restringe o valor dentro do intervalo de entrada
  value = Math.max(inputMin, Math.min(inputMax, value));

  // Calcula a interpolação corretamente, respeitando inversões
  const t = (value - inputMin) / (inputMax - inputMin);
  return outputMin + t * (outputMax - outputMin);
}

const closest = (target: number, ...values: number[]) =>
  values.reduce((prev, curr) =>
    Math.abs(target - prev) > Math.abs(target - curr) ? curr : prev
  );

export const MathUtils = { percentageDecrease, interpolate, closest };
