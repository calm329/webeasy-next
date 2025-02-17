import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// const fonts = [
//   "Roboto",
//   "Open Sans",
//   "Montserrat",
//   "Lato",
//   "Poppins",
//   "Source Sans Pro",
//   "Raleway",
//   "Noto Sans",
//   "Inter",
//   "Roboto Slab",
//   "Merriweather",
//   "Playfair Display",
//   "Oswald",
//   "Nunito",
//   "Inter Rubik",
//   "PT Serif",
//   "Ubuntu",
//   "Barlow",
//   "Lobster",
//   "LoRa",
//   "Monospace",
//   "Muli",
//   "Alegreya",
//   "Work Sans"
// ];

const FontPicker = () => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [fonts, setFonts] = useState([
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Lato",
    "Poppins",
    "Source Sans Pro",
    "Raleway",
    "Noto Sans",
    "Inter",
    "Roboto Slab",
    "Merriweather",
    "Playfair Display",
    "Oswald",
    "Nunito",
    "Inter Rubik",
    "PT Serif",
    "Ubuntu",
    "Barlow",
    "Lobster",
    "LoRa",
    "Monospace",
    "Muli",
    "Alegreya",
    "Work Sans",
  ]);

  useEffect(() => {
    const WebFontLoader = require("webfontloader");
    WebFontLoader.load({
      google: {
        families: fonts,
      },
    });
  }, [fonts]);

  useEffect(() => {
    if (appState.selectedFont) {
      setFonts((prevFonts) => {
        const newFonts = prevFonts.filter(
          (font) => font !== appState.selectedFont,
        );
        return [appState.selectedFont, ...newFonts];
      });
    }
  }, [appState.selectedFont]);

  return (
    <div className=" flex flex-col gap-5">
      {fonts.map((font) => (
        <div
          key={font}
          onClick={() =>
            dispatch(updateAppState({ ...appState, selectedFont: font }))
          }
          className={`cursor-pointer rounded border p-5 shadow hover:bg-gray-100 ${appState.selectedFont === font && "border-2 border-indigo-700"}`}
        >
          <h1 style={{ fontFamily: font, fontSize: "20px" }}>{font}</h1>
          <p style={{ fontFamily: font, fontSize: "16px" }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      ))}
    </div>
  );
};

export default FontPicker;
