import { AppUserConfigs, SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"

/* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
export const generateSettings = async (): Promise<SettingSchemaDesc[]> => {
    const rainbowColor = [
        "#37306B", "#66347F", "#9E4784", "#D27685", "#9DC08B", "#609966", "#40513B", "#060047", "#B3005E", "#E90064", "#FF5F9E", "#E21818"
    ]
    const settingArray = [] as SettingSchemaDesc[]
    const { preferredLanguage } = await logseq.App.getUserConfigs() as AppUserConfigs
    //option
    settingArray.push(
        {
            key: '',
            title: t("Target page"),
            type: "heading",
            default: "",
            description: t("Applies the specified color to the page name and its content. Underline the page title in the left sidebar. The color will be lighter than this color to match the theme."),
        }
    );


    //page
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
        settingArray.push(
            {
                key: `pn${idx}`,
                title: t("Set the page name"),
                type: "string",
                default: ``,
                description: "",
            },
            {
                key: `pc${idx}`,
                title: t("Choice the background color"),
                type: "string",
                default: rainbowColor[idx - 1],
                description: "",
                inputAs: "color",
            }
        )
    })

    settingArray.push(
        {
            key: '',
            title: t("Target parent block with tag"),
            type: "heading",
            default: "",
            description: t("Input without #. If the parent block contains the tag, the specified color will be applied. The color will be lighter than this color to match the theme."),
        },
    );

    //tag
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
        settingArray.push(
            {
                key: `tn${idx}`,
                title: t("Set the tag name"),
                type: "string",
                default: ``,
                description: "",
            },
            {
                key: `tc${idx}`,
                title: t("Choice the background color"),
                type: "string",
                default: rainbowColor[idx - 1],
                description: "",
                inputAs: "color",
            }
        )
    })

    settingArray.push(
        {
            key: 'wordsMatchingParentPage',
            title: t("Match parent tag? (if the specified tag contains Hierarchy)"),
            type: "boolean",
            default: true,
            description: "default: true",
        },
        {
            key: '',
            title: t("Options"),
            type: "heading",
            default: "",
            description: "",
        },
        {
            key: "admonitions",
            title: t("Targets blocks with tags for Admonition"),
            type: "boolean",
            default: true,
            description: `
        ${t("Nest with the tag as the parent.")}
        ${preferredLanguage === "ja" ? `
                🔴#FAILED: 失敗 / #REMEDY: 対策,
                🟠#WARNING: 警告 / #LEARNED: 学び,
                🟡#CAUTION: 注意 / #DECLARATION: 宣言,
                🟢#SUCCESS: 成功 / #FACTS: 事実,
                🔵#NOTICE: 通知 / #INFO: 情報 / #REVIEW: レビュー,
                🟣#QUESTION: 質問 / #DISCOVERY: 発見,
                🟤#REPORT: 報告 / #NOTE: ノート
        `: `
                🔴#FAILED / #REMEDY, 
                🟠#WARNING / #LEARNED, 
                🟡#CAUTION / #DECLARATION, 
                🟢#SUCCESS / #FACTS, 
                🔵#NOTICE / #INFO / #REVIEW, 
                🟣#QUESTION / #DISCOVERY, 
                🟤#REPORT / #NOTE
        `}
        ${t("Select one from '🌈Admonition Selector' (bullet menu item).")}
        `,
        },
        {
            key: "rainbowJournal",
            title: t("Outline right border"),
            type: "boolean",
            default: false,
            description: t("Color according to nesting depth. As the outline gets deeper, a rainbow appears on the right side."),
        },
        {
            key: "todayJournal",
            title: t("today & yesterday journals coloring"),
            type: "boolean",
            default: false,
            description: t("background-color: yellow & green (**light theme only)"),
        },
    )
    return settingArray
}
