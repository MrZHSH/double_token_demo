<template>
  <div>
    <button @click="getToken">
      登录
    </button>
    <button @click="getDatas">
      获取数据
    </button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import { login, getData } from '../apis';
import { setAccessToken, setRefreshToken } from '../config/storage.ts';
const getToken = async () => {
  const res = await login();
  console.log('登录成功：获取到token');
  setAccessToken(res.data.accessToken);
  setRefreshToken(res.data.refreshToken);
};

const getDatas = async () => {
  const data = await getData();
  console.log('获取到数据：成功',  data);
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
