<template>
  <div>
    <Login :submit-form="loginUser"/>
  </div>
</template>

<script>
import Login from '@/components/login/Login';
export default {
  name: 'Login',
  components: {
    Login,
  },
  methods: {
      loginUser(loginInfo){
        this.$auth.loginWith('local', {
          data: loginInfo
        })
      }
    }
};
</script>
