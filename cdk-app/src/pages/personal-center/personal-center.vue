<template>
  <view class="personal-center">
    <!-- 用户信息 -->
    <view class="user-info">
      <image
        :src="userInfo.avatarUrl"
        mode="aspectFill"
        class="avatar"
      />
      <text class="nickname">{{ userInfo.nickName }}</text>
    </view>

    <!-- 功能模块 -->
    <up-cell-group>
      <up-cell
        title="我的收藏"
        icon="star"
        :isLink="true"
        @click="onFavoritesClick"
      />
      <up-cell
        title="反馈建议"
        icon="edit-pen"
        :isLink="true"
        @click="onFeedbackClick"
      />
    </up-cell-group>

    <!-- 登录按钮 -->
    <view v-if="!isLogged" class="login-button">
      <up-button
        type="primary"
        text="登录/注册"
        shape="circle"
        block
        @click="onLoginClick"
      />
    </view>
    <view v-else class="login-button">
      <up-button
        type="primary"
        text="退出登录"
        shape="circle"
        block
        @click="onLogoutClick"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { apiLogin } from '@/apis/login.api';
import { ref, onMounted } from 'vue';

// 用户信息
const isLogged = ref(false);
const userInfo = ref({
  nickName: '游客',
  avatarUrl: 'https://haowallpaper.com/link/common/file/getCroppingImg/15024949517192512',
});

// 检查登录状态
const checkLoginStatus = () => {
  const openid = uni.getStorageSync('openid');
  if (openid) {
    isLogged.value = true;
    // TODO: 调用获取用户信息接口
    userInfo.value = {
      nickName: '已登录用户',
      avatarUrl: '',
    };
  }
};

// 导航
const onFavoritesClick = () => {
  if (!isLogged.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }
  uni.navigateTo({
    url: '/pages/favorites/favorites',
  });
};

const onFeedbackClick = () => {
  if (!isLogged.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }
  uni.navigateTo({
    url: '/pages/feedback/feedback',
  });
};

const onLoginClick = () => {
  // #ifdef H5
  // do something
  // #endif

  // #ifdef MP-WEIXIN
  uni.getUserProfile({
    desc: '用于完善用户资料',
    success: (res) => {
      userInfo.value = res.userInfo;
      uni.login({
        provider: 'weixin',
        success(loginRes) {
          const code = loginRes.code;

          apiLogin(code).then((res) => {
            const { openid, sessionKey } = res.data;
            uni.setStorageSync('openid', openid);
            isLogged.value = true;
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });
          }).catch((err) => {
            console.error('登录失败：', err);
            uni.showToast({
              title: '登录失败',
              icon: 'none'
            });
          })
        },
      })
    },
    fail: () => {
      uni.showToast({
        title: '授权失败',
        icon: 'none'
      });
    }
  });
  // #endif
};

const onLogoutClick = () => {
  uni.showModal({
    title: '提示',
    content: '确认退出登录？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('openid');
        isLogged.value = false;
        userInfo.value = {
          nickName: '游客',
          avatarUrl: '',
        };
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        });
      }
    }
  });
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped lang="scss">
.personal-center {
  box-sizing: border-box;
  padding: 20px;
  // #if MP-WEIXIN
  height: 100vh;
  // #endif
  // #if H5
  height: calc(100vh - var(--window-bottom));
  // #endif
  width: 100%;
  background: url('https://haowallpaper.com/link/common/file/getCroppingImg/15024949517192512') no-repeat center / cover;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    .avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }
    .nickname {
      margin-top: 15px;
      font-size: 18px;
      color: var(--font-color);
      font-weight: 500;
    }
  }

  .login-button {
    margin-top: 30px;
    padding: 0 20px;
  }

  :deep(.u-cell-group) {
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
  }
}
</style>