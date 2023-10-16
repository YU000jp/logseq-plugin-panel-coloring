import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
import { t } from "logseq-l10n";

/* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
export const generateSettings = (): SettingSchemaDesc[] => {
    const rainbowColor = [
        "#37306B", "#66347F", "#9E4784", "#D27685", "#9DC08B", "#609966", "#40513B", "#060047", "#B3005E", "#E90064", "#FF5F9E", "#E21818"
    ];
    const settingArray = [] as SettingSchemaDesc[];

    //option
    settingArray.push(
        {
            key: '',
            title: t("Options"),
            type: "heading",
            default: "",
            description: "",
            inputAs: "color",
        },
        {
            key: "admonitions",
            title: "Admonition by tags (batch block)",
            type: "boolean",
            default: true,
            description: `
        Nest with the tag as the parent.
              🔴#FAILED / #REMEDY, 
              🟠#WARNING / #LEARNED, 
              🟡#CAUTION / #DECLARATION, 
              🟢#SUCCESS / #FACTS, 
              🔵#NOTICE / #INFO / #REVIEW, 
              🟣#QUESTION / #DISCOVERY, 
              🟤#REPORT / #NOTE
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
        {
            key: '',
            title: t("Page Coloring (title and contents)"),
            type: "heading",
            default: "",
            description: t("Accentuate the specified page. Underline the page title in the left sidebar."),
            inputAs: "color",
        }
    );


    //page
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
        settingArray.push(
            {
                key: `heading10${idx}`,
                title: t("Page") + ` [ ${idx} ]`,
                type: "heading",
                default: "",
                description: "",
            },
            {
                key: `pn${idx}`,
                title: t("Set the page title"),
                type: "string",
                default: ``,
                description: "",
            },
            {
                key: `pc${idx}`,
                title: t("Choice the background color"),
                type: "string",
                default: rainbowColor[idx - 1],
                description: t("color fades"),
                inputAs: "color",
            }
        );
    });

    settingArray.push(
        {
            key: '',
            title: t("Tag Coloring (batch block)"),
            type: "heading",
            default: "",
            description: t("Accentuate tagged blocks like a panel"),
            inputAs: "color",
        },
        {
            key: 'wordsMatchingParentPage',
            title: t("Match parent tag? (if the specified tag contains Hierarchy)"),
            type: "boolean",
            default: true,
            description: "default: true",
        }
    );

    //tag
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
        settingArray.push(
            {
                key: `heading00${idx}`,
                title: t("#tag") + ` [ ${idx} ]`,
                type: "heading",
                default: "",
                description: "",
            },
            {
                key: `tn${idx}`,
                title: t("Set the tag name"),
                type: "string",
                default: ``,
                description: "without #",
            },
            {
                key: `tc${idx}`,
                title: t("Choice the background color"),
                type: "string",
                default: rainbowColor[idx - 1],
                description: t("color fades"),
                inputAs: "color",
            }
        );
    });
    return settingArray;
};
