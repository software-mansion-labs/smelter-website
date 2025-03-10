import type Smelter from "@swmansion/smelter-web-wasm";
import { setWasmBundleUrl } from "@swmansion/smelter-web-wasm";

import { useCallback, useEffect } from "react";
import RaceMp4 from "../../../assets/race_640x360_full.mp4";
import StreamerMp4 from "../../../assets/streamer_640x360_full.mp4";
import { useSmelter } from "../useSmelter";
import LayoutsSection from "./LayoutsSection";
import Output from "./Output";
import StreamForm from "./StreamForm";

setWasmBundleUrl("/smelter.wasm");

export const INPUT_SIZE = { width: 1920, height: 1080 } as const;

export default function StreamSection() {
  const smelter = useSmelter();

  useEffect(() => {
    if (!smelter) {
      return;
    }

    void smelter?.registerInput("stream", { url: RaceMp4, type: "mp4" });
    void smelter?.registerInput("streamer-placeholder", { url: StreamerMp4, type: "mp4" });

    const intervalStream = setInterval(async () => {
      await smelter?.unregisterInput("stream").catch(() => {});
      await smelter?.registerInput("stream", { url: RaceMp4, type: "mp4" });
    }, 18000);

    const intervalStreamerPalceholder = setInterval(async () => {
      await smelter?.unregisterInput("streamer-placeholder").catch(() => {});
      await smelter?.registerInput("streamer-placeholder", { url: StreamerMp4, type: "mp4" });
    }, 7000);

    return () => {
      clearInterval(intervalStream);
      clearInterval(intervalStreamerPalceholder);
    };
  }, [smelter]);

  return (
    <>
      <div className="flex w-full justify-center gap-x-6">
        <div className="flex flex-3.5">
          <div className="flex w-full flex-col">
            <Output smelter={smelter} />
            <StreamForm smelter={smelter} />
          </div>
        </div>
        <LayoutsSection />
      </div>
    </>
  );
}
