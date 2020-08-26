<template>
    <div>
        
        <div class="tb1">
         <el-table  :data="list" style="width: 100%">
              <el-table-column  >
                <template slot-scope="scope">
                  <a href="/news1" >{{scope.row.name}}</a>
                </template>
              </el-table-column>
               <el-table-column >
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
                name:"震惊！大学生竟然干出这种事",
                time:"2020-07-25"
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