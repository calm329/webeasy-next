import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const fonts = [
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
];

const FontPicker = () => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const WebFontLoader = require('webfontloader')
    WebFontLoader.load({
      google: {
        families: fonts,
      },
    });
  }, [fonts]);

  return (
    <div className=" flex gap-5 flex-col">
      {fonts.map((font) => (
        <div
          key={font}
          onClick={() =>
            dispatch(
              updateAppState({ ...appState, selectedFont: font }),
            )
          }
          className="border p-5 rounded shadow cursor-pointer hover:bg-gray-100"
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
