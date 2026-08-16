import {
  IconBuilding,
  IconBuildingBank,
  IconChartLine,
  IconHeartbeat,
  IconPackage,
  IconRoute,
  IconShoppingBag,
} from '@tabler/icons-react'
import type { ElementType } from 'react'

export const industryIcon = (name?: string | null): ElementType => {
  const l = (name || '').toLowerCase()
  if (l.includes('fin') || l.includes('bank') || l.includes('payment')) return IconBuildingBank
  if (l.includes('health') || l.includes('med')) return IconHeartbeat
  if (l.includes('logist') || l.includes('ship')) return IconPackage
  if (l.includes('retail') || l.includes('ecommerce') || l.includes('e-com')) return IconShoppingBag
  if (l.includes('agri')) return IconRoute
  if (l.includes('saas') || l.includes('soft')) return IconBuilding
  return IconChartLine
}
