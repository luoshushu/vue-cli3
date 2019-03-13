<template>
  <div class="dashboard-container">
    <!--  <x-header></x-header>
   <group>
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>-->
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
    <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import {XHeader,XInput,Group,XAddress} from 'vux'
import { Field } from "mint-ui";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  data() {
    return {
      username: "", //名字
      mobile: "", //手机
      value: "", //地址
      email: "",
      password: "",
      phone: "",
      website: "",
      number: "",
      birthday: "",
      introduction: ""
    };
  },
  components: {
    // XHeader,
    // XInput,
    // Group,
    Field
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
