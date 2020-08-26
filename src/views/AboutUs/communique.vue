<template>
    <div>
         <div class="tb1">
         <el-table  :data="list" style="width: 100%">
              <el-table-column   width="1200">
                <template slot-scope="scope">
                    <i class="el-icon-star-on"></i>
                  <a href="/" >{{scope.row.name}}</a>
                </template>
              </el-table-column>
               <el-table-column   width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.time}}</label>
                </template>
              </el-table-column>
            </el-table>
            </div>
              <div>
               <router-view/>
           </div>
    
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[{
                name:"十一放假通知",
                time:"2020-09-25"
            },
            {
                name:"年终奖取消通知！",
                time:"2020-11-25"
            },
            {
                name:"震惊！",
                time:"2020-07-25"
            },
            {
                name:"震惊！",
                time:"2020-07-25"
            },
            {
                name:"震惊！",
                time:"2020-07-25"
            }
            ]
        }
    }
}
</script>