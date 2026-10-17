# CLAUDE.md

Guidance for working in this repo. The project guide is in `docs/project-guide.md`; the design rationale is in `docs/redesign-plan.md`.

## Generating images

For images used in the design (textures, line art, watermarks, medallions — never the university's own content photos), use the Codex CLI's built-in image tool. It is authenticated through the user's ChatGPT subscription, so no `OPENAI_API_KEY` is needed.

Do **not** use the `image-gen` skill's `scripts/image_gen.py` or any API route. That path needs `OPENAI_API_KEY`, which is not set here.

### How to call it

Run it from a scratch directory, not the repo:

```sh
codex exec --skip-git-repo-check -s read-only "Use your built-in image generation tool (image_gen) to create this image. Do not write any script and do not use the API. <description>. When done, output ONLY the absolute file path of the generated PNG on the last line."
```

- `-s read-only` is enough; the image tool writes to its own folder.
- Generation takes several minutes. Run it with `run_in_background` so the shell is not blocked, and run independent images in parallel.
- Every image lands at `~/.codex/generated_images/<session-id>/exec-<uuid>.png`. Parse the path from the output with `grep -oE '/home/sina/\.codex/generated_images/[a-z0-9-]+/[a-z0-9-]+\.png' <log> | tail -1`, since the final line is not always clean.
- Copy the file out of `~/.codex` before using it. Keep the working copy in the session scratchpad.

### Prompting for design assets

- Ask for flat, uniform artwork on a **solid pure black background** when the asset will be tinted with CSS. State "no shading, no gradients, no color, no border, no text" explicitly. Without this the model adds frames, labels and glow.
- Ask for **seamless tiling** when the asset will repeat (patterns, textures), and say the motif must continue across all four edges.
- For several small pictures, generate **one 2×2 sheet** and split it, rather than four separate calls. Describe the grid, the gutters and the symmetry in the prompt. This worked well for the four girih medallions in V6.
- Specify the aspect ratio in words ("square", "16:9 panoramic") — the tool does not take a size parameter.
- Describe the subject concretely (Hamedan, Alvand, the Baba Taher tower, girih, granite). Do not ask for the university's logo or any real person.

### Processing the output

The output is 1254–1672 px PNG. Process it in the scratchpad, not in the project:

- `sharp` is not in the repo. Install it into a scratch directory (`npm install sharp`) and run the script from there.
- Line art drawn white-on-black: convert luminance to alpha so one file can be tinted from CSS. The V6 pipeline in `assets/` is the reference: greyscale → join as alpha onto a white image → WebP at quality 94.
- Textures: resize, desaturate lightly, JPEG at quality 88.
- Put final assets in `src/versions/<version>/assets/` and reference them from CSS with a relative `url(./assets/…)`.

### Rules

- Generated art is decoration only. Keep it below ~35% opacity over text-bearing surfaces, and keep any text on a solid colour.
- Use the generated image as a texture or watermark. Do not present generated artwork as a photo of the campus or of people.
- Check every generated file visually before committing it. Reject outputs with stray text, frames or shading that the prompt forbade.
- Do not commit scratch files, the raw generations, or the `imgtool` install.

## Design versions

Each version lives in `src/versions/vN-<name>/`, is registered in `src/versions/registry.ts`, and renders the shared content from `src/content/`. Versions own their look; they never own data. See `docs/project-guide.md` §7 for the steps to add one.

## Checks before committing

```sh
pnpm lint
pnpm build
```

Both must be clean. Test responsive layouts at 360 and 1440 px for horizontal overflow.
