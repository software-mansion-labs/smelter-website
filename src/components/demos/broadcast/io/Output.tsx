import type Smelter from "@swmansion/smelter-web-wasm";

import { InputStream, Rescaler, View } from "@swmansion/smelter";
import { useMemo } from "react";
import { COLORS } from "../../../../../styles/colors";
import Chyron, { useChyronStore } from "./Chyron";
import SmelterVideoOutput from "../../smelter-utils/SmelterVideoOutput";

export const OUTPUT_SIZE = { width: 1270, height: 720 };

type OutputProps = {
  smelter: Smelter;
};

export default function Output({ smelter }: OutputProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <SmelterVideoOutput
        muted
        smelter={smelter}
        width={OUTPUT_SIZE.width}
        height={OUTPUT_SIZE.height}>
        <OutputContent />
      </SmelterVideoOutput>
    </div>
  );
}

function OutputContent() {
  const { chyronContent, backgroundColor } = useChyronStore();

  const messages = useMemo(() => {
    return chyronContent.split(/\r?\n|\r/);
  }, [chyronContent]);

  return (
    <View
      style={{
        borderRadius: 16,
        borderColor: COLORS.white100,
        borderWidth: 1.5,
      }}>
      <Rescaler style={{ rescaleMode: "fill" }}>
        <InputStream inputId="broadcast" />
      </Rescaler>
      <View
        style={{
          bottom: 0,
          left: 0,
          height: 48,
          paddingHorizontal: 24,
          backgroundColor: backgroundColor,
        }}>
        <Chyron messages={messages} messageDurationMs={4000} />
      </View>
    </View>
  );
}
