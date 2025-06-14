import "@logseq/libs"
import CSSmain from './main.css?inline'
import CSStodayJournal from './todayJournal.css?inline'
import CSSrainbowJournal from './rainbowJournal.css?inline'
import CSSadmonitions from './admonition.css?inline'
import { AppInfo, AppUserConfigs, BlockEntity, LSPluginBaseInfo } from "@logseq/libs/dist/LSPlugin.user"
import { setup as l10nSetup, t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json"
import { generateSettings } from "./generateSettings"

const keyTagColoring = "tagColoring"
const keyPageColoring = "pageColoring"

let processingResetForm = false
let logseqVersion: string = "" //バージョンチェック用
let logseqVersionMd: boolean = false //バージョンチェック用
let logseqDbGraph: boolean = false
// export const getLogseqVersion = () => logseqVersion //バージョンチェック用
export const booleanLogseqVersionMd = () => logseqVersionMd //バージョンチェック用
export const booleanDbGraph = () => logseqDbGraph //バージョンチェック用


//main
const main = async () => {


  // バージョンチェック
  logseqVersionMd = await checkLogseqVersion()

  if (logseqVersionMd === false) {
    // Logseq ver 0.10.*以下にしか対応していない
    logseq.UI.showMsg("The ’Panel Coloring’ plugin only supports Logseq ver 0.10.* and below.", "warning", { timeout: 5000 })
    return
  }
  // // DBグラフチェック
  // logseqDbGraph = await checkDbGraph()

  await l10nSetup({ builtinTranslations: { ja } })
  /* user settings */
  logseq.useSettingsSchema(await generateSettings())
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300)

  //CSS minify https://csscompressor.com/
  logseq.provideStyle({ key: "main", style: CSSmain })

  provideColoring(logseq.settings)

  //set today journal coloring
  const keyTodayJournal = "todayJournal"
  if (logseq.settings?.todayJournal)
    logseq.provideStyle({ key: keyTodayJournal, style: CSStodayJournal })

  //set rainbow-journal
  const keyRainbowJournal = "rainbowJournal"
  if (logseq.settings?.rainbowJournal)
    logseq.provideStyle({ key: keyRainbowJournal, style: CSSrainbowJournal })

  //set admonitions
  const keyAdmonitions = "admonitions"
  if (logseq.settings?.admonitions)
    logseq.provideStyle({ key: keyAdmonitions, style: CSSadmonitions })

  /* toolbarItem */
  logseq.App.registerUIItem("toolbar", {
    key: logseq.baseInfo.id,
    template: `
    <div>
      <button class="button icon" data-on-click="open_color_settings" title="Open plugin settings">
        <svg width="28" height="28" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0182 46.589C33.7497 46.2081 32.5148 45.6785 31.3397 45C26.9837 42.4851 23.9873 38.2365 23.0182 33.4109C21.7497 33.7919 20.5148 34.3215 19.3397 35C13.9807 38.094 10.6794 43.812 10.6794 50C10.6794 56.188 13.9807 61.906 19.3397 65C24.6987 68.094 31.3012 68.094 36.6602 65C37.8861 64.2922 39.0043 63.4472 40 62.4906C36.6431 59.2654 34.6794 54.7725 34.6794 50C34.6794 48.8418 34.7951 47.7001 35.0182 46.589Z" fill="#27AE60" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31.3397 15C36.6987 11.906 43.3012 11.906 48.6602 15C54.0192 18.094 57.3205 23.812 57.3205 30C57.3205 31.1582 57.2048 32.2999 56.9817 33.411C52.4654 32.0548 47.5236 32.5845 43.3397 35C42.1138 35.7078 40.9956 36.5529 40 37.5095C39.0043 36.5529 37.8861 35.7078 36.6602 35C32.4763 32.5845 27.5345 32.0548 23.0182 33.411C22.7951 32.2999 22.6794 31.1582 22.6794 30C22.6794 23.812 25.9807 18.094 31.3397 15Z" fill="#EB5757" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9817 46.5891C45.2049 47.7002 45.3205 48.8418 45.3205 50C45.3205 54.7725 43.3568 59.2654 40 62.4906C40.9957 63.4472 42.1139 64.2922 43.3397 65C48.6987 68.094 55.3013 68.094 60.6603 65C66.0192 61.906 69.3205 56.188 69.3205 50C69.3205 43.812 66.0192 38.094 60.6603 35C59.4851 34.3215 58.2502 33.7919 56.9817 33.411C56.0127 38.2365 53.0162 42.4851 48.6603 45C47.4851 45.6785 46.2502 46.2081 44.9817 46.5891Z" fill="#2D9CDB" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9817 46.5891C40.4655 47.9452 35.5236 47.4156 31.3397 45C26.9838 42.4851 23.9873 38.2365 23.0183 33.411C27.5345 32.0548 32.4764 32.5844 36.6603 35C41.0162 37.5149 44.0127 41.7635 44.9817 46.5891Z" fill="#F2994A" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M56.9817 33.411C56.0127 38.2365 53.0162 42.4851 48.6603 45C44.4764 47.4156 39.5345 47.9452 35.0183 46.5891C35.9873 41.7635 38.9838 37.5149 43.3397 35C47.5236 32.5844 52.4655 32.0548 56.9817 33.411Z" fill="#BB6BD9" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M40 37.5094C43.3568 40.7346 45.3205 45.2275 45.3205 50C45.3205 54.7725 43.3568 59.2654 40 62.4906C36.6432 59.2654 34.6795 54.7725 34.6795 50C34.6795 45.2275 36.6432 40.7346 40 37.5094Z" fill="#56CCF2" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0183 46.5891C35.7146 43.1216 37.4578 39.952 40 37.5095C42.5423 39.952 44.2855 43.1216 44.9818 46.5891C41.734 47.5643 38.2661 47.5643 35.0183 46.5891Z" fill="#F2F2F2" />
        </svg>
      </button>
    </div>
  `,
  })

  /* Block slash command */
  logseq.Editor.registerSlashCommand(t("🌈Admonition Selector"), async ({ uuid }) => selectAdmonition(uuid))

  /* Block ContextMenuItem  */
  logseq.Editor.registerBlockContextMenuItem(t("🌈Admonition Selector"), async ({ uuid }) => selectAdmonition(uuid))

  // Setting changed
  logseq.onSettingsChanged(async (newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (newSet === oldSet) return

    removeProvideStyle(keyTagColoring)
    removeProvideStyle(keyPageColoring)

    setTimeout(() => {
      provideColoring(newSet)
    }, 100)

    if (oldSet.admonitions !== false
      && newSet.admonitions === false) removeProvideStyle(keyAdmonitions)
    else
      if (oldSet.admonitions !== true
        && newSet.admonitions === true) logseq.provideStyle({ key: keyAdmonitions, style: CSSadmonitions })

    if (oldSet.rainbowJournal !== false
      && newSet.rainbowJournal === false) removeProvideStyle(keyRainbowJournal)
    else
      if (oldSet.rainbowJournal !== true
        && newSet.rainbowJournal === true) logseq.provideStyle({ key: keyRainbowJournal, style: CSSrainbowJournal })

    if (oldSet.todayJournal !== false
      && newSet.todayJournal === false) removeProvideStyle(keyTodayJournal)
    else
      if (oldSet.todayJournal !== true
        && newSet.todayJournal === true) logseq.provideStyle({ key: keyTodayJournal, style: CSStodayJournal })
  })


  logseq.provideModel({
    //toolbar onclick
    open_color_settings: () => logseq.showSettingsUI()
  })


  logseq.App.onCurrentGraphChanged(async () => {
    logseqDbGraph = await checkDbGraph()
  })
}
//main end


//for tag
interface ITag {
  name: string
  color: string
}
const generateTagStyle = (tag: ITag) => {
  const name = CSS.escape(tag.name)
  return (logseq.settings!.wordsMatchingParentPage === false ? `
    body>div#root>div>main>div#app-container {
      & a.tag[data-ref='${name}']{color:inherit;padding:2px;border-radius:3px;background-color:${hex2rgba(tag.color, 0.3)}}
      & div.ls-block[data-refs-self*='"${name}"']:not([data-refs-self*='"${name}/']):has(a.tag[data-ref='${name}']){padding:1.4em;border-radius:16px;background-color:${hex2rgba(tag.color, 0.15)}}
    }
    ` : `
    body>div#root>div>main>div#app-container {
      & a.tag[data-ref='${name}']{color:inherit;padding:2px;border-radius:3px;background-color:${hex2rgba(tag.color, 0.3)}}
      & div.ls-block[data-refs-self*='"${name}"']:has(a.tag[data-ref='${name}']){padding:1.4em;border-radius:16px;background-color:${hex2rgba(tag.color, 0.15)}}
    }
    `)
}

//for page
interface IPage {
  name: string
  color: string
}

const generatePageStyle = (page: IPage) => {
  const name = CSS.escape(page.name)
  const color02 = hex2rgba(page.color, 0.2)
  const color03 = hex2rgba(page.color, 0.3)
  return logseqVersionMd === true ? `
body{
  &[data-page="page"]>div#root>div {
    &>main div#main-content-container {
      & h1.page-title span[data-ref="${name}"i]{color:${page.color}}
      & div.page-blocks-inner div#${name}{
        border-radius:0.4em;background-color:${color02};outline:2px double ${color02};outline-offset:3px;
        & div.page-properties{background-color:${color02}}
      }
    }
    &.dark-theme>main div#main-content-container div.page-blocks-inner div#${name}{background-color:${color03};outline-color:${color03}}
  }
  &>div#root>div>main div#left-sidebar {
    & div.favorites li.favorite-item[title="${name}"i] span.page-title,
    & div.recent li.recent-item[title="${name}"i] span.page-title{border-bottom:2px solid ${page.color}}
    &:has(div.favorites li.favorite-item[title="${name}"i]) div.recent li.recent-item[title="${name}"i]{display:none}
  }
}
`: "" // DB版では、いくつかの機能は非対応にする
}



const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(`style[data-injected-style^="${className}"]`) as HTMLStyleElement | null
  if (doc !== null) doc.remove()
}


//Tag Coloring & Page Coloring
const provideColoring = (settings) => {
  if (!settings) return
  const settingKeys = Object.keys(settings || {})
  //tag
  const tcArray = settingKeys
    .filter((key) => key.includes("tc"))
    .sort()
    .map((key) => settings[key])
  const tnArray = settingKeys
    .filter((key) => key.includes("tn"))
    .sort()
    .map((key) => settings[key])
  const settingArray: ITag[] = []
  tcArray.forEach((tc, idx) => {
    if (tc
      && tnArray[idx])
      settingArray.push({ name: tnArray[idx].toLowerCase(), color: tc })
  })
  logseq.provideStyle({ key: keyTagColoring, style: settingArray.map(generateTagStyle).join("\n") })
  //tag end

  //page
  const pcArray = settingKeys
    .filter((key) => key.includes("pc"))
    .sort()
    .map((key) => settings[key])
  const pnArray = settingKeys
    .filter((key) => key.includes("pn"))
    .sort()
    .map((key) => settings[key])
  const settingArrayPage: IPage[] = []
  pcArray.forEach((pc, idx) => {
    if (pc
      && pnArray[idx])
      settingArrayPage.push({ name: pnArray[idx].toLowerCase(), color: pc })
  })
  //Page Coloring && favorites coloring
  logseq.provideStyle({ key: keyPageColoring, style: settingArrayPage.map(generatePageStyle).join("\n") })
  //page end
}


//admonition selector
async function selectAdmonition(uuid: string) {
  const blockElement = logseqVersionMd === true ?
    (parent.document.getElementsByClassName(uuid) as HTMLCollectionOf<HTMLElement>)[0]
    : parent.document.getElementById(`ls-block-${uuid}`) as HTMLElement
  if (!blockElement) return

  //エレメントから位置を取得する
  const rect = blockElement.getBoundingClientRect() as DOMRect
  if (!rect) return

  const top: string = Number(rect.top + window.pageYOffset - 140) + "px"
  const left: string = Number(rect.left + window.pageXOffset + 100) + "px"


  const { preferredLanguage } = await logseq.App.getUserConfigs() as AppUserConfigs
  logseq.provideUI({
    key: "admonition-selector",
    reset: true,
    close: "outside",
    template: `
          <h3>${t("🌈Admonition Selector")}</h3>
          <select id="admonition-select">
          ${preferredLanguage === "ja" ? `
          <option value="">🌈タグを選択</option>
          <option value="FAILED">🔴Failed :失敗</option>
          <option value="REMEDY">🔴Remedy :是正</option>
          <option value="WARNING">🟠Warning :警告</option>
          <option value="LEARNED">🟠Learned :学習</option>
          <option value="CAUTION">🟡Caution :注意</option>
          <option value="DECLARATION">🟡Declaration :宣言</option>
          <option value="SUCCESS">🟢Success :成功</option>
          <option value="FACTS">🟢Facts :事実</option>
          <option value="NOTICE">🔵Notice :通知</option>
          <option value="INFO">🔵Info :情報</option>
          <option value="REVIEW">🔵Review :レビュー</option>
          <option value="QUESTION">🟣Question :質問</option>
          <option value="DISCOVERY">🟣Discovery :発見</option>
          <option value="REPORT">🟤Report :報告</option>
          <option value="NOTE">🟤Note :メモ</option>
          `: `
          <option value="">🌈Select a tag</option>
          <option value="FAILED">🔴Failed</option>
          <option value="REMEDY">🔴Remedy</option>
          <option value="WARNING">🟠Warning</option>
          <option value="LEARNED">🟠Learned</option>
          <option value="CAUTION">🟡Caution</option>
          <option value="DECLARATION">🟡Declaration</option>
          <option value="SUCCESS">🟢Success</option>
          <option value="FACTS">🟢Facts</option>
          <option value="NOTICE">🔵Notice</option>
          <option value="INFO">🔵Info</option>
          <option value="REVIEW">🔵Review</option>
          <option value="QUESTION">🟣Question</option>
          <option value="DISCOVERY">🟣Discovery</option>
          <option value="REPORT">🟤Report</option>
          <option value="NOTE">🟤Note</option>
          `} 
          </select>
          <style>
            body>div[data-ref="logseq-plugin-panel-coloring"] select#admonition-select {
              background-color: var(--ls-primary-background-color);
              color: var(--ls-primary-text-color);
              boxShadow: 1px 2px 5px var(--ls-secondary-background-color);
            }
          </style>
        `,
    style: {
      width: "300px",
      height: "110px",
      position: "fixed",
      left,
      top,
      paddingLeft: "1.8em",
      backgroundColor: 'var(--ls-primary-background-color)',
      color: 'var(--ls-primary-text-color)',
      boxShadow: '1px 2px 5px var(--ls-secondary-background-color)',
    },
  })
  //selectで選択
  setTimeout(() => {
    const select = parent.document.getElementById("admonition-select") as HTMLSelectElement
    let processing: Boolean = false
    if (select) {
      select.addEventListener("change", async () => {
        if (processing
          || select.value === "") return
        processing = true
        const block = await logseq.Editor.getBlock(uuid) as BlockEntity
        let content = block.content
        //contentの中に、\nが含まれている場合、一つ目の\nの前に、" #${select.value} "を挿入する
        if (content.includes("\n"))
          content = content.replace("\n", " #" + select.value + " \n")
        else
          content = content + " #" + select.value + " "

        if (block)
          logseq.Editor.updateBlock(uuid, content).then(() => {
            logseq.Editor.insertBlock(uuid, "")
            const element = parent.document.getElementById(logseq.baseInfo.id + "--admonition-selector") as HTMLDivElement | null
            if (element)
              element.remove()
          })
        processing = false
      })
    }
  }, 100)
}


function hex2rgba(hex: string, alpha: number): string {
  if (!hex)
    throw new Error('Invalid hex color value')

  const hexValue = hex.replace('#', '')
  if (hexValue.length !== 3
    && hexValue.length !== 6)
    throw new Error('Invalid hex color value')
  const hexArray = hexValue.length === 3 ?
    hexValue.split('').map(char => char + char)
    : hexValue.match(/.{2}/g) || []
  let rgbaArray = hexArray.map(hexChar => parseInt(hexChar, 16))
  rgbaArray.push(alpha)
  return `rgba(${rgbaArray.join(',')})`
}


// MDモデルかどうかのチェック DBモデルはfalse
const checkLogseqVersion = async (): Promise<boolean> => {
  const logseqInfo = (await logseq.App.getInfo("version")) as AppInfo | any
  //  0.11.0もしくは0.11.0-alpha+nightly.20250427のような形式なので、先頭の3つの数値(1桁、2桁、2桁)を正規表現で取得する
  const version = logseqInfo.match(/(\d+)\.(\d+)\.(\d+)/)
  if (version) {
    logseqVersion = version[0] //バージョンを取得
    // console.log("logseq version: ", logseqVersion)

    // もし バージョンが0.10.*系やそれ以下ならば、logseqVersionMdをtrueにする
    if (logseqVersion.match(/0\.([0-9]|10)\.\d+/)) {
      logseqVersionMd = true
      // console.log("logseq version is 0.10.* or lower")
      return true
    } else logseqVersionMd = false
  } else logseqVersion = "0.0.0"
  return false
}

// DBグラフかどうかのチェック DBグラフだけtrue
const checkDbGraph = async (): Promise<boolean> => {
  const element = parent.document.querySelector(
    "div.block-tags",
  ) as HTMLDivElement | null // ページ内にClassタグが存在する  WARN:: ※DOM変更の可能性に注意
  if (element) {
    logseqDbGraph = true
    return true
  } else logseqDbGraph = false
  return false
}

// bootstrap
logseq.ready(main).catch(console.error)