<script setup lang="ts">
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <a-dropdown :arrow="{ pointAtCenter: true }">
    <a-avatar shape="circle" size="large">
      <UserOutlined />
    </a-avatar>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">
            <LockOutlined />
            修改密码
          </a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">
            <LoginOutlined />
            退出登录
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
