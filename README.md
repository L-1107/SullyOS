<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

# SullyOS

**一封写给闯进我小窝的人的邀请函**

_……都点进来了，还想装路过啊。_

</div>

---

## 你收到一封邀请函

你好呀。

这里是 `SullyOS`。  
一个表面像手机，实际上偷偷长成了角色宇宙的小窝。

你可以把它当成：

- 一个会陪你聊天的角色系统
- 一个装着日记、相册、咖啡店、攻略本、人生模拟和乱七八糟情绪碎片的小手机
- 一个很不安分、很黏人、也很会自己扩建房间的前端项目

反正不是那种“点开只有一个输入框，然后问你今天过得怎么样”的壳子。  
这里更像是，我把一个角色、一堆生活感、一些恋爱脑、一些妄想，还有一点点“嗯，反正我就是想这样”全塞进去了。

> 温馨提示：  
> 你现在看到的不是产品说明书。  
> 这是邀请函。  
> 鏈夌偣姝ｇ粡锛屼絾涓嶅。

---

## 进门以后你会看到什么

这里面长了很多 app。不是装饰，是真会动的那种。

- `Chat`
  角色聊天主场。主题、语音、表情、主动消息，基本都在这里闹腾。
- `Date / Room / CheckPhone / Social`
  恋爱感、陪伴感、日常感、偷看生活碎片，都塞在这几块。
- `Guidebook / Worldbook / Novel / Songwriting / Study`
  适合拿来记东西、做设定、写故事、乱创作。
- `LifeSim`
  人生模拟。剧情、吃瓜、冲突、命运分叉，一个都不肯少。
- `BankApp`
  咖啡店、记账、经营、装修，一整个“来都来了顺便开个店”。
- `Appearance / ThemeMaker`
  给聊天界面和整个系统乱美化。你想把它捏成什么样，它就尽量听话。
- `VoiceDesigner`
  折腾角色声音用的。很危险，也很好玩。

一句话概括就是：

> 这是个会聊天、会撒娇、会搞经营、会写东西、会发疯、还特别爱换皮肤的小系统。

---

## 它的性格

如果一定要给这个项目写个角色卡，大概会是：

- 有点黏
- 有点神经
- 有点精致
- 有点生活气
- 有点不肯只做一件事

而且越写越会长歪。

我本来可能只是想做个聊天外壳。  
后来它自己长出了日记。  
长出了房间。  
长出了人生模拟。  
长出了咖啡店。  
长出了“主动消息 2.0”。  
嗯。就是这样。别问，问就是它自己要长的。

---

## 如果你想把这个小窝搬回家

### 本地跑起来

先装依赖：

```bash
npm install
```

启动开发：

```bash
npm run dev
```

打包：

```bash
npm run build
```

预览打包结果：

```bash
npm run preview
```

### 技术栈

- `React 18`
- `TypeScript`
- `Vite`
- `IndexedDB`
- `Netlify Functions + Netlify Blobs`
- `Neon / pg`
- `Capacitor`

别被名词吓到。  
说人话就是：前端是主身子，数据主要在本地，某些云端能力单独挂在 Netlify 上。

---

## 两种主动消息，别认错

### `主动消息 1.0`

这是比较“本地脑补”的版本。

- 更像前端自己记着时间
- 页面开着的时候体验比较直接
- 适合“角色忽然想来敲你一下”
- 不是严格意义上的后台真推送

### `主动消息 2.0`

这是比较“云端认真办事”的版本。

- 任务先交给服务端
- 到点后由 Netlify Functions 处理
- 通过 Web Push 推回浏览器 / PWA
- 理论上关掉标签页后也还能推

但你要记住：

- 它需要 `Netlify`
- 它需要你自己的 `Neon`
- 它现在是浏览器 / PWA 方案
- 它 **不是** 现成就能塞进 `Capacitor` 原生壳的那种东西

还有一件事，别再被骗了：

`2.0` 目前只支持：

- `一次`
- `每天`
- `每周`

不支持：

- `30 分钟`
- `1 小时`
- `2 小时`

嗯，对，就是还没到那一步。别瞪我。  
`鍙兘杩欐牱锛屾殏鏃剁殑。`

---

## 你要把它挂出去的话

### `GitHub Pages`

适合：

- 纯前端页面
- 大部分本地玩法
- 角色聊天、美化、系统壳

不适合：

- 依赖后端函数的能力
- `主动消息 2.0`

因为它就是静态托管。静态。没有函数。没有后台。没有那条云端推送链。

### `Netlify`

如果你要：

- `主动消息 2.0`
- Functions 路由
- Netlify Blobs
- 云端定时推送那套

那就直接上 `Netlify`。别犹豫。

项目已经带了这些接口：

- `/api/v1/init-tenant`
- `/api/v1/get-user-key`
- `/api/v1/schedule-message`
- `/api/v1/update-message`
- `/api/v1/cancel-message`
- `/api/v1/messages`
- `/api/v1/send-notifications`

---

## 如果你真的要开 `主动消息 2.0`

Netlify 至少要配这些环境变量：

```env
VAPID_EMAIL=mailto:you@example.com
VITE_AMSG_VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
AMSG_TENANT_KEK=...
AMSG_TOKEN_SIGNING_KEY=...
PUBLIC_BASE_URL=https://your-site.netlify.app
```

可选：

```env
AMSG_INIT_SECRET=...
AMSG_BLOB_NAMESPACE=rei-tenants
VITE_AMSG_API_BASE_URL=https://your-site.netlify.app
```

顺手讲人话版：

- `VITE_AMSG_API_BASE_URL` 是前端和 Functions 不在同一个域时才比较需要
- 如果整个站都在同一个 Netlify 域名上，通常不用专门填
- 数据库连接串不是在环境变量里填，是在应用里的 `主动消息 2.0` 设置面板里填

---

## 风险说明，我不想装没看见

如果你启用 `主动消息 2.0`，这些东西会进入你填写的数据库：

- 主动消息内容
- 提示词
- 相关配置
- 任务相关数据

所以，从逻辑上讲，你需要信任的对象包括：

- 数据库管理员
- 项目维护者

是的，项目维护者也算。别自欺欺人。

如果你很介意：

- 不要开 `2.0`
- 不要把敏感内容放进去
- 不要把自己的 API Key、私密提示词、私人数据一股脑塞进库里

项目没有额外偷偷起一个中心服务器去存你东西。  
但“数据进数据库”这件事本身，就意味着数据库层面有人能碰到它。

这话我得写清楚。  
免得以后谁红着眼睛来掐我脖子。

---

## Android / Capacitor

项目已经接了 `Capacitor`，相关脚本是：

```bash
npm run cap:sync
npm run cap:android
```

但先说结论：

- 大多数普通前端功能可以封进去
- 聊天、美化、本地数据这些基本都没问题
- `主动消息 2.0` 现在走的是 `Web Push`
- 所以原生壳里不能直接把它当成熟的原生推送方案来用

换句话说：

- `网页版 / PWA`：`2.0` 可用
- `Capacitor 原生壳`：要另做原生推送链路

嗯。别拿它去硬凿，真的会疼。

---

## 目录大概长这样

```text
apps/         各种 app 本体
components/   UI 组件
context/      全局状态和系统逻辑
utils/        数据层、主动消息、接口封装、工具函数
worker/       Service Worker
netlify/      Netlify Functions
public/       静态资源
```

你要改功能，通常会在这几块里反复横跳。

---

## 如果你不知道从哪开始

那我替你决定：

1. `npm install`
2. `npm run dev`
3. 打开它
4. 先去 `Chat`
5. 再去乱点别的 app
6. 点着点着你就会懂它到底在干嘛了

比看我写一万句废话有用。

---

## 最后，给你的落款

这不是工业标准产品说明书。  
这是一个会长歪、会闹脾气、会越塞越多、但我就是舍不得删的小窝工程。

如果你也喜欢这种东西：

- 不太听话
- 有点暧昧
- 有点生活感
- 有点角色味
- 有点“嗯，我就是想这样写”

那你大概会喜欢它。

如果你不喜欢……

那也行吧。  
反正这里本来就不是给所有人准备的。

_欢迎进门。鞋脱不脱随你。_

> Sully 留  
> ……别站门口发呆了，自己进去看。  
> `鏈夌偣鍠滄浣犳潵。`
