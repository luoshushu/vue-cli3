<template>
  <div class="about">
    <!-- <h1>This is an about page</h1>
            <svg-icon icon-class="a" />
      <button @click="xxxx">ddd </button> -->


     
  </div>
</template>
<script>
  import { getToken,  getUsers , mockData, login, loginOut, registerUser} from '@/api/user'

export default {
  data(){
    return{
      value1:'',
      title:'xddsad'
    }
  },

  methods: {
  








   async xxxx(){
     let reqData = {
       name:'苏宋霖',
       passwd:[1,2,3,4]
     }
      let reqDatas = {
       name: '苏宋霖',
       passwd: '12,3,2'
     }
      // let datas = await getToken(reqDatas)
      // console.log(data);
      // let data =  await sso_login(reqData)
      console.log('有数据了1');
      // let data =  await getUsers(reqData)
        let data =  await mockData(reqData)
      console.log(data);

      
      
    }
  },
}
</script>
