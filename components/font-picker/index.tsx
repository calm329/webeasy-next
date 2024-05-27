import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const FontPicker = () => {
  const appState = useAppSelector(AS);
  const [fonts, setFonts] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const apiKey = "AIzaSyDG8abWoK3DvSh9s0bT7BEy_JxtalF6P-s"; // Ensure your API key is stored in .env.local
    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
      )
      .then((response) => {
        const fontFamilies = response.data.items.map(
          (font: any) => font.family,
        );
        setFonts(fontFamilies);
        // dispatch(
        //   updateAppState({ ...appState, selectedFont: fontFamilies[0] }),
        // ); // Set initial font to the first one in the list
      })
      .catch((error) => console.error("Error fetching fonts:", error));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1>Font Picker</h1>
        <select
          value={appState.selectedFont}
          onChange={(e) =>
            dispatch(
              updateAppState({ ...appState, selectedFont: e.target.value }),
            )
          }
          style={{ fontFamily: appState.selectedFont, fontSize: "16px" }}
        >
          {fonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <p style={{ fontFamily: appState.selectedFont, fontSize: "24px" }}>
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  );
};

export default FontPicker;
