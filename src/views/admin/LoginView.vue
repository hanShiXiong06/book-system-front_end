<template>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button>注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { login } from "@/api/admin/auth"
import { useAuthAdminStore } from '@/stores/admin/AuthAdminStore';
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

const { userinfo, saveToken } = useAuthAdminStore()

const router = useRouter()

// do not use same name with ref
const form = reactive({
    username: '',
    password: ''

})

console.log(userinfo);
const onSubmit = () => {
    console.log('submit!')
    console.log(form);
    login(form).then(res => {

        if (res.status !== 'success') {
            return ElMessage.error('登录失败')
        }
        ElMessage.success(res.message)
        saveToken(res.data.token)
        console.log(router.push('/'));
    })

}
</script>