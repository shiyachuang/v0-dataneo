'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconFileAnalytics,
  IconVocabulary,
  IconFileText,
} from '@tabler/icons-react'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const menus = [
  {
    name: '数据管理',
    url: '/data-manage',
    icon: IconFileAnalytics,
    colorClass: 'text-[#7BAD6B]'
  },
  {
    name: '知识库',
    url: '/knowledge-base',
    icon: IconVocabulary,
    colorClass: 'text-[#347EAA]'
  },
  {
    name: '报告',
    url: '/report',
    icon: IconFileText,
    colorClass: 'text-[#347EAA]'
  },
]

export function NavMenus() {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {menus.map((item) => {
        const isActive = pathname === item.url || pathname.startsWith(item.url + '/')

        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={item.name}
              className="pl-4"
            >
              <Link href={item.url} className="flex items-center gap-2 font-semibold">
                <item.icon className={`h-4 w-4 ${item.colorClass}`} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
