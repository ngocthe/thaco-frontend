import defaultSettings from '@/settings'

const title = defaultSettings.title || 'ORH IT SYSTEM'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
