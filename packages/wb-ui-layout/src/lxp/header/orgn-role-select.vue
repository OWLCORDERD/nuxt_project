<template>
    <button type="button" title="학습자 홈으로 이동" 
        class="btn-s-line-main has-icon" @click="goLearner">
        <SvgoGNBHome />
        <span>{{ selectedOrgn?.ORGN_NAME }} 학습자 홈으로 이동</span>
    </button>
    <div class="select-menu">
        <select class='orgn-select' aria-label="selectedOrgn" id="upperOrgnSelectBox" @change="changeUpperOrgn" :disabled="!['1', '2'].includes(roleId)">
            <option v-for="orgn in orgnList.upper" :value="orgn.ORGN_ID" :selected="orgn.SELECTED === 'Y'">{{ orgn.ORGN_NAME }}</option>
        </select>
        <select class="orgn-select" aria-label="selectedOrgn" id="orgnSelectBox" @change="changeOrgn" :disabled="!['1', '2', '7'].includes(roleId)">
            <option v-for="orgn in orgnList.lower" :value="orgn.ORGN_ID" :selected="orgn.SELECTED === 'Y'" :disabled="orgn.ORGN_ACCESS_AGREE_YN === 'N'">{{ orgn.ORGN_NAME }}</option>
        </select>
        <select class='role-select' aria-label="selectedRole" v-model="roleId" @change="changeRole">
            <option v-for="role in roleList" :value="role.ROLE_ID" :selected="role.ROLE_ID === Number(roleId)">{{ role.ROLE_NAME }}</option>
        </select>
        <button type="button" class='logout' title="로그아웃" @click="logout">
            <svgo-ETC-exit />
        </button>
    </div>
  </template>
  
  <script setup>
  import { useAsyncData } from 'nuxt/app';
  import { useRoute, useRouter } from 'nuxt/app';
  
  const router = useRouter();
//   const { $auth } = useNuxtApp();
//   const { roleId } = $auth;
  const env = useRuntimeConfig().public.env;

  const roleId = ref('1');
  
  // 2024.10.24[wschoe]: 라우트 사용 추가
  const route = useRoute();
  
//   const { data: orgnList } = await useAsyncData('userOrgnList', () => useWbFetch('/user/orgn/list/load', {
//     baseURL: 'lxp',
//   }), {
//     transform: response => {
//       return response.data ?? {upper: [], lower: []};
//     }
//   })
  
//   const { data: roleList } = await useAsyncData('userRoleList', () => useWbFetch('/user/role/list/load', {
//     baseURL: 'lxp',
//     method: 'POST'
//   }), {
//     transform: response => {
//       return response.data ?? [];
//     }
//   })

  const orgnList = ref({upper: [], lower: []});

  const roleList = ref([{
    ROLE_ID: '1',
    ROLE_NAME: '관리자',
  }, {
    ROLE_ID: '2',
    ROLE_NAME: '사용자',
  }]);
  
  const changeRole = async (e) => {
    if (!e.target.value) {
      return;
    }
  
    const { code, data, message } = await useWbFetch('/auth/role/modify', {
      baseURL: 'lxp',
      method: 'POST',
      body: {
        roleId: e.target.value
      }
    })
  
    if (code === 'response.ok') {
    //   await $auth.login(data);
      router.push('/lxp').then(() => {
        location.reload();
      });
    } else {
      alert(message);
    }
  }
  
  const targetUpperOrgn = ref();
  const choice = {
    "SELECTED": "Y",
    "ORGN_NAME": "-선택-",
    "ORGN_ID": "0",
    "ORGN_ACCESS_AGREE_YN": "Y"
  };
  
  const changeUpperOrgn = async (e) => {
    const { code, data, message } = await useWbFetch('/auth/upper/orgn/modify', {
      baseURL: 'lxp',
      method: 'POST',
      body: {
        upperOrgnId: e.target.value
      }
    })
  
    if (code === 'response.ok') {
      data.unshift(choice);
  
      orgnList.value.lower = data;
      targetUpperOrgn.value = e.target.value;
    } else {
      alert(message);
    }
  }
  
  const changeOrgn = async (e) => {
    if (e.target.value === '0') {
      return;
    }
  
    const { code, data, message } = await useWbFetch('/auth/orgn/modify', {
      baseURL: 'lxp',
      method: 'POST',
      body: {
        targetUpperOrgnId: targetUpperOrgn.value,
        orgnId: e.target.value,
      }
    })
  
    if (code === 'response.ok') {
    //   await $auth.login(data);
      router.push('/lxp').then(() => {
        location.reload();
      });
    } else {
      alert(message);
    }
  }
  
  const selectedOrgn = computed(() => {
    return orgnList.value.lower.find(item => item.SELECTED === 'Y');
  })
  
  // 2024.10.24[wschoe]: 설정된 기관의 ID를 저장
  const domain = useState('domain');
  
  // 2024.04.12[susong]: 학습자 이동
  const goLearner = async () => {
    const { code, data } = await useWbFetch('/common/sso/token/load', {
      baseURL: 'lxp',
    });
  
    if (code === "response.ok") {
      let protocol = 'https://';
  
      if (env === 'local') {
        protocol = 'http://';
      }
      // 2024.10.24[wschoe]: 현재 기관의 도메인으로 이동되도록 변경
      window.open(protocol + domain.value + '/login?type=id&sso=' + data.ssoKey);
    }
  }
  
  </script>
  <style scoped>
  .select-option > option:disabled{
    display: block;
    background-color: #e3e1e1;
  }
  </style>