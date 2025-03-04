import type Smelter from "@swmansion/smelter-web-wasm";
import type React from "react";
import { useCallback } from "react";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

type SmelterCanvasProps = {
  id: string;
  onCanvasCreate?: (canvasRef: HTMLCanvasElement | null) => Promise<void>;
  onCanvasStarted?: () => Promise<void>;
  smelter: Smelter;
  children: React.ReactElement;
} & CanvasProps;

export default function SmelterCanvas(props: SmelterCanvasProps) {
  const { onCanvasCreate, onCanvasStarted, children, smelter, ...canvasProps } = props;

  // biome-ignore lint/correctness/useExhaustiveDependencies: children
  const canvasRef = useCallback(
    async (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        return;
      }

      if (onCanvasCreate) {
        await onCanvasCreate(canvas);
      }

      await smelter.registerOutput(`${props.id}-output`, children, {
        type: "canvas",
        video: {
          canvas: canvas,
          resolution: {
            width: Number(canvasProps.width ?? canvas.width),
            height: Number(canvasProps.height ?? canvas.height),
          },
        },
        audio: false,
      });
    },
    [onCanvasCreate, canvasProps.width, canvasProps.height, smelter, props.id]
  );

  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <canvas ref={canvasRef} className="aspect-video w-[80%]" {...canvasProps}></canvas>;
}
