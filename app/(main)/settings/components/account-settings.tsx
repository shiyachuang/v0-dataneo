'use client'

import * as React from 'react'
import { userService } from '@/lib/mock/services'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AccountSettings() {
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    userService.getUserInfo().then(setUser)
  }, [])

  if (!user) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">账户</h2>
        <p className="text-sm text-muted-foreground">管理你的账户信息和偏好设置</p>
      </div>

      <div className="space-y-4">
        {/* 头像 */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* 用户名 */}
        <div className="space-y-2">
          <Label>用户名</Label>
          <Input value={user.name} disabled className="max-w-md" />
        </div>

        {/* 邮箱 */}
        <div className="space-y-2">
          <Label>邮箱</Label>
          <Input value={user.email} disabled className="max-w-md" />
        </div>

        {/* 手机号 */}
        {user.mobile && (
          <div className="space-y-2">
            <Label>手机号</Label>
            <Input value={user.mobile} disabled className="max-w-md" />
          </div>
        )}
      </div>
    </div>
  )
}
