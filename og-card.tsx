import { SocialImageOptions } from "./quartz/util/og"
import { getFontSpecificationName } from "./quartz/util/theme"

// Link-preview card (Discord, WhatsApp, etc.) in the campaign's own look:
// dark parchment, gold rule, Cinzel title, EB Garamond description. No Quartz branding.
const palette = {
  bg: "#1b1510",
  bgDeep: "#120d09",
  frame: "#5a4630",
  gold: "#cfa55a",
  ember: "#e08a4c",
  title: "#f1e6cf",
  body: "#e3d6bc",
  muted: "#9a876a",
}

function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : max).replace(/[,;:.\s]+$/, "") + "…"
}

function sectionLabel(slug: string | undefined) {
  if (!slug || slug === "index") return "The Chronicle"
  const parts = slug.split("/")
  if (parts.length < 2) return "The Chronicle"
  return parts[0].replace(/-/g, " ")
}

export const campaignOgCard: SocialImageOptions["imageStructure"] = ({
  cfg,
  title,
  description,
  fileData,
}) => {
  const headerFont = getFontSpecificationName(cfg.theme.typography.header)
  const bodyFont = getFontSpecificationName(cfg.theme.typography.body)
  const cleanTitle = clip(title, 70)
  const titleSize = cleanTitle.length > 40 ? 62 : cleanTitle.length > 24 ? 74 : 86
  const desc = clip(description ?? "", 190)
  const section = sectionLabel(fileData.slug)

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: palette.bgDeep,
        padding: "22px",
        fontFamily: bodyFont,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          border: `2px solid ${palette.frame}`,
          backgroundImage: `radial-gradient(circle at 50% 0%, #2c2117 0%, ${palette.bg} 60%, ${palette.bgDeep} 100%)`,
          padding: "48px 64px 40px 64px",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: headerFont,
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", color: palette.gold }}>{cfg.pageTitle}</div>
          <div style={{ display: "flex", color: palette.muted }}>{section}</div>
        </div>

        {/* Gold rule with a diamond */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "22px" }}>
          <div style={{ display: "flex", flex: 1, height: "2px", backgroundColor: palette.gold }} />
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              margin: "0 14px",
              backgroundColor: palette.ember,
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ display: "flex", flex: 1, height: "2px", backgroundColor: palette.gold }} />
        </div>

        {/* Title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: headerFont,
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.12,
              color: palette.title,
            }}
          >
            {cleanTitle}
          </div>
          {desc && (
            <div
              style={{
                display: "flex",
                marginTop: "26px",
                fontSize: 38,
                lineHeight: 1.35,
                color: palette.body,
              }}
            >
              {desc}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 24,
            color: palette.muted,
            letterSpacing: "0.04em",
          }}
        >
          {cfg.baseUrl}
        </div>
      </div>
    </div>
  )
}
