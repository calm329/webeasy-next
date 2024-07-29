import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSectionsType } from "@/types";
import { RootState } from "..";
import { generateUniqueId } from "@/lib/utils/function";

interface SectionState {
  sections: TSectionsType[];
}

const initialState: SectionState = {
  sections: [],
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSections(state, action: PayloadAction<TSectionsType[]>) {
      state.sections = action.payload;
    },
    addSection(state, action: PayloadAction<TSectionsType>) {
      state.sections.push(action.payload);
    },
    updateSection(state, action: PayloadAction<TSectionsType>) {
      const index = state.sections.findIndex(
        (section) => section.id === action.payload.id,
      );
      if (index !== -1) {
        state.sections[index] = action.payload;
      }
    },
    removeSection(state, action: PayloadAction<string>) {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload,
      );
    },
    moveSection(
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>,
    ) {
      const currentIndex = state.sections.findIndex(
        (section) => section.id === action.payload.id,
      );
      if (currentIndex === -1) return;

      const newSections = [...state.sections];
      const swapIndex =
        action.payload.direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (swapIndex < 0 || swapIndex >= newSections.length) return;

      [newSections[currentIndex], newSections[swapIndex]] = [
        newSections[swapIndex],
        newSections[currentIndex],
      ];

      state.sections = newSections;
    },
    duplicateSection(state, action: PayloadAction<string>) {
      const currentIndex = state.sections.findIndex(
        (section) => section.id === action.payload,
      );
      if (currentIndex === -1) return;

      const newSection = {
        ...state.sections[currentIndex],
        id: generateUniqueId(),
      };

      // Insert new section immediately after the original section
      const newSections = [...state.sections];
      newSections.splice(currentIndex + 1, 0, newSection);

      state.sections = newSections;
    },
    changeVariation(
      state,
      action: PayloadAction<{ id: string; variation: number }>,
    ) {
      const index = state.sections.findIndex(
        (section) => section.id === action.payload.id,
      );
      if (index !== -1) {
        state.sections[index].variation = action.payload.variation;
      }
    },
  },
});

export const {
  setSections,
  addSection,
  updateSection,
  removeSection,
  duplicateSection,
  moveSection,
  changeVariation,
} = sectionsSlice.actions;

export const sectionsData = (state: RootState) => state.sectionSlice.sections;

export default sectionsSlice.reducer;
