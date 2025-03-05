import type React from "react";
import { create } from "zustand";
import { COLORS } from "../../../../styles/colors";
import Edit from "../../../assets/demos/edit.svg";

type LabelStore = {
  labelTextContent: string;
  labelColor: string;
  backgroundColor: string;
  setLabelTextContent: (content: string) => void;
  setLabelColor: (color: string) => void;
};

export const useLabelStore = create<LabelStore>((set) => ({
  labelTextContent: "User john123 donated 30$",
  labelColor: COLORS.red40,
  backgroundColor: COLORS.black100,
  setLabelTextContent: (content) => set({ labelTextContent: content }),
  setLabelColor: (color) => set({ labelColor: color }),
}));

export default function StreamForm() {
  const { labelTextContent, labelColor, backgroundColor, setLabelTextContent, setLabelColor } =
    useLabelStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelTextContent(event.target.value);
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelColor(event.target.value);
  };

  return (
    <div className="flex gap-x-4 space-y-4 py-4">
      <input
        type="text"
        value={labelTextContent}
        onChange={handleChange}
        placeholder="Enter text here..."
        className="w-[60%] rounded-md border p-4 shadow-sm focus:outline-none"
        style={{ color: labelColor, backgroundColor: backgroundColor }}
      />

      <div className="group relative flex flex-col items-center">
        <input
          type="color"
          id="textColor"
          value={labelColor}
          onChange={handleTextColorChange}
          className="h-10 w-20 cursor-pointer rounded-md border border-demos-border"
        />
        <img
          alt="edit"
          src={Edit.src}
          className="pointer-events-none absolute mt-2 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
