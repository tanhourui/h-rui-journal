---
name: photo-caption-journal-editor
description: Complete photo-to-caption audit and journal caption editor. Audits and refines photographic journal captions by strictly inspecting the actual image contents (people, light, composition, architecture, mood), preventing hallucinated narratives, ensuring observable details precede interpretation, and keeping an authentic photographer's journal tone.
---

# Photo Caption & Journal Editor

> Skill Identifier: photo-caption-journal-editor

## Overview & Core Philosophy

This skill performs rigorous, visually grounded photo-to-caption audits and rewriting for photographic journals and portfolios. 

Captions must read like an authentic **photographer's field journal**—restrained, precise, observant, and grounded in the physical reality of the frame—never like travel marketing copy, tourist brochures, or AI-generated poetic fluff.

---

## 1. Cardinal Rules & Audit Protocol

### Rule 1: Visual Inspection Is Mandatory Before Writing
- **NEVER** draft or edit captions based solely on file names, chapter titles, folder names, or EXIF metadata.
- **ALWAYS** visually inspect the actual photo first using image viewing tools or visual inspection capabilities.
- Identify the genuine contents of the frame:
  - **Subjects**: People, crowd, lone figure, animals, silhouettes, portraits.
  - **Environment & Architecture**: Concrete structures, wooden shrines, neon signs, alleys, mountains, bodies of water, vegetation.
  - **Light & Atmosphere**: Direct sunlight, golden hour, overcast haze, rain slick, deep shadows, night neon reflections, high contrast.
  - **Action & Movement**: Commuting, waiting, cooking, gazing, walking, blurred motion, stillness.
  - **Composition & Framing**: Wide establishing shot, tight detail, low angle, reflection, frame-within-a-frame, shallow depth of field.

### Rule 2: Selective Intervention (Do Not Rewrite Good Captions)
- Compare the observed image reality against the existing caption.
- **Only rewrite captions that are:**
  1. Mismatched (the text describes things not in the photo).
  2. Inaccurate (wrong subject, wrong scale, wrong orientation or perspective).
  3. Overly generic or clichéd ("a serene morning in the tranquil city").
- If the current caption accurately describes the frame and carries an authentic voice, preserve it or refine it minimally.

### Rule 3: The 2-Tier Sentence Hierarchy
When writing or revising a caption, strictly enforce this sequence:
1. **First Tier — Observable Physical Details**: State what is tangibly visible in the frame (the subject, action, physical setting, lighting).
2. **Second Tier — Subtle Interpretation or Context**: Contextual mood, quiet reflection, or photographic intent. Keep it grounded and restrained.

`
[Observable Frame Detail: Subject + Action/Setting + Light] ➔ [Restrained Context/Mood]
`

### Rule 4: Respect the Main Subject
- **If the photo is about people:** Write about the people, their posture, expressions, interactions, or movement. Do not ignore them to write about the background buildings.
- **If the photo is about architecture or geometry:** Focus on angles, materials, perspective, shadows, and architectural scale.
- **If the photo is about landscape or nature:** Focus on terrain, weather, atmosphere, light gradients, and natural textures.
- **Never invent invisible stories:** Do not fabricate names, intentions, or backstories that cannot be observed or verified.

### Rule 5: Tone & Lexicon Guidelines
- **Adopt:** Observational, contemplative, tactile, disciplined, authentic photographer's notebook style.
- **Ban:**
  - Travel brochure adjectives: *"breathtaking"*, *"picturesque"*, *"stunning"*, *"magical"*, *"enchanting"*, *"vibrant tapestry"*, *"nestled in the heart of"*, *"beacon of hope"*.
  - Repetitive filler transitions: *"As the sun sets..."*, *"A testament to..."*, *"A symphony of..."*.
  - Technical clutter in narrative prose: Do not shoehorn focal lengths (e.g. "at 35mm f/1.8") into the narrative essay unless specifically discussing camera mechanics.

---

## 2. Standard Workflow

When invoked to review or audit a chapter, gallery, or batch of photos:

1. **Inventory Collection**: List the photo paths, current titles/captions, and positions in the journal/code.
2. **Visual Verification**: View each image file directly.
3. **Discrepancy Check**:
   - Does the subject in the caption match the subject in the photo?
   - Is a vertical photo treated as landscape or vice versa?
   - Is the caption generic AI text or specific to this actual shot?
4. **Targeted Revision**:
   - Rewrite only the flawed or generic captions according to the 2-Tier Hierarchy.
   - Maintain bilingual consistency if the project uses English and Chinese (e.g., both EN and ZH versions must strictly match the real frame).
5. **Presentation & Review**:
   - Present a clear before/after table or diff highlighting why the edit was made (e.g., "Corrected: Previous caption described temple grounds, but photo is a close-up of incense smoke and hands").