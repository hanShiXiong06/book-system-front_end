<script setup>
import { fetchCategory } from "@/api/admin/book"
import { useAuthAdminStore } from "@/stores/admin/AuthAdminStore";
import { useRouter } from "vue-router"

const router = useRouter()
fetchCategory().then(res => {
    console.log(res);
})
const exit = () => {
    useAuthAdminStore().saveToken('')
    router.push('/login')
}

</script>
<template>
    <!-- wind -->
    <div class="common-layout">
        <el-container>
            <el-header>
                <div>主页 </div>
                <el-button @click="exit"> exit </el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-row class="tac">
                        <el-col :span="24">
                            <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose">
                                <el-sub-menu index="1">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span> 分类管理 </span>
                                    </template>
                                    <el-menu-item-group title="分类">
                                        <el-menu-item index="/add/category"> 添加分类 </el-menu-item>
                                        <el-menu-item index="/category">分类列表</el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-sub-menu index="2">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span> 图书管理 </span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="1-1"> 添加图书 </el-menu-item>
                                        <el-menu-item index="1-2">图书列表</el-menu-item>
                                    </el-menu-item-group>

                                </el-sub-menu>
                                <el-sub-menu index="3">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span> 用户管理 </span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="1-1"> 添加用户 </el-menu-item>
                                        <el-menu-item index="1-2">用户列表</el-menu-item>
                                    </el-menu-item-group>

                                </el-sub-menu>
                            </el-menu>
                        </el-col>

                    </el-row>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<style scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.el-aside {
    height: calc(100vh - 60px);

}

.el-menu {
    height: 100%;
}
</style>