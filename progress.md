Original prompt: 先继续优化都市人生 simsapp：去掉 pics 里的丑像素家具/房屋贴图，改成自己画的像素图；并把“吃瓜”从单纯调用 API 引导 char 行动，升级为随机触发“角色剧情”或“主线剧情”，主线剧情要有明显标题和附件栏，附件可包含图片、道具、证据、同人文等。

2026-03-19
- Removed the hardcoded building PNG override in `utils/tinyTownTiles.ts` so LifeSim now uses generated pixel-style town tiles instead of `pics` house textures.
- Added story attachment types, world-drama prompt helpers, fallback attachment generation, and `materializeStoryAttachments` so main-plot events can drop image/item/evidence/fanfic payloads.
- Added `apps/lifesim/StoryAttachments.tsx` for compact attachment cards plus a modal detail viewer.
- Wired `apps/LifeSimApp.tsx` so `吃瓜` now randomly branches into either normal char-driven drama or a no-char main-plot event from `主线编剧室`.
- Seeded replay actions correctly for the new branch and moved `runCharTurns` above the user action handlers to avoid referencing it before initialization.
- Added a no-API fallback for char turns so the sim no longer gets stuck when external model settings are empty; chars will still produce lightweight “围观” replay entries.
- Updated the drama feed and replay overlay to surface main-plot badges, headlines, and attachment shelves.
- `npm run build` passes after the LifeSim changes.
- Automated Playwright validation is currently blocked because `C:\Users\tiaotiao\.codex\skills\develop-web-game\scripts\web_game_playwright_client.js` cannot resolve the `playwright` package in this environment.
- Added drama filters (`全部 / 角色 / 主线 / 系统`) and changed the normal drama log to keep the full scrollable history instead of truncating to 50.
- Added a LifeSim settings panel for selecting which external characters are allowed to participate in the sim.
- Added long-press NPC editing so residents can be edited in-place for this run (name / gender / personality / bio / backstory).
- Replaced the browser-native reset confirm with a custom retro dialog that can either reset directly or generate a LifeSim ending summary card before resetting.
- Added a new `lifesim_reset_card` score-card payload and wired it through chat rendering plus readable archive/context formatting in Chat / Character / chat prompt history.
- Text attachments like fanfic/evidence now surface the original text as the primary reading area in the attachment modal.
- Adjusted `apps/lifesim/DramaFeed.tsx` so main-plot actions also remain visible in the left-hand dynamic stream under `全部 / 主线`, instead of being excluded from `drama.log`.
- Restyled the LifeSim reset summary card in `components/chat/MessageItem.tsx` to look more like the game's retro pseudo-window UI (sharper borders, title bar, grid texture, status bar).
- `npm run build` still passes after the latest DramaFeed + chat-card styling changes.
- Automated browser validation is still blocked locally because `require('playwright')` fails with `MODULE_NOT_FOUND`.

TODO
- If local browser testing is possible, verify both `吃瓜 -> 角色剧情` and `吃瓜 -> 主线剧情` paths and inspect attachment modal behavior.
- Install or provide `playwright` if automated screenshot-based UI validation is needed later.
