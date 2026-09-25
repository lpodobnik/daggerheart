import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Explorer: folders first, then files alphabetically — except entries listed in `order`
// (the Events, chronologically), which sort by their number. The list between the ORDER
// markers is rewritten by .publish/export.py on every publish; don't edit it by hand.
const explorer = Component.Explorer({
  sortFn: (a, b) => {
    // ORDER-START
    const order: Record<string, number> = {"The First Meteor": 0, "The Second Meteor": 1, "The Coming of Magic": 2, "The Skybreak": 3, "The Void Glance": 4, "The Eternal Alliance": 5, "The Evil Alliance": 6, "The Fall of Glaive Port": 7, "The Elf-Spider Alliance": 8, "Elyndra's Defeat": 9, "The Fungal Plague": 10, "The Great Battle of the Third Age": 11, "The Shattering": 12, "The Collapse of the Left Eye": 13, "The Siege of Glaive Port": 14, "The Third Meteor": 15}
    // ORDER-END
    const oa = order[a.displayName]
    const ob = order[b.displayName]
    if (oa !== undefined && ob !== undefined) return oa - ob
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
    }
    return !a.isFolder && b.isFolder ? 1 : -1
  },
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ links: {} }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    explorer,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
  ],
  right: [],
}
