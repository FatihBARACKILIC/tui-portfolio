import { ContribCell } from "@/components/portfolio/ui/ContribCell";
import { GITHUB_CONSTANTS } from "@/lib/constants/github.constants";

const cellLevel = (index: number): "l0" | "l1" | "l2" | "l3" | "l4" => {
  const value = Math.abs((Math.sin(index * 12.9898) * 43_758.5453) % 1);
  const day = index % 7;
  if (day === 0 || day === 6) {
    return value > 0.8 ? "l1" : "l0";
  }
  if (value > 0.86) {
    return "l4";
  }
  if (value > 0.66) {
    return "l3";
  }
  if (value > 0.4) {
    return "l2";
  }
  if (value > 0.18) {
    return "l1";
  }
  return "l0";
};

export const ContribGraph = () => {
  const cells = Array.from(
    { length: GITHUB_CONSTANTS.CONTRIB_CELLS },
    (_, index) => <ContribCell key={index} level={cellLevel(index)} />
  );

  return (
    <div className="grid w-max auto-cols-[10px] grid-flow-col grid-rows-[repeat(7,10px)] gap-[3px]">
      {cells}
    </div>
  );
};
