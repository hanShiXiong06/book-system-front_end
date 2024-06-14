<script setup>
import { ref } from "vue"
import { postCategory } from "@/api/admin/book";
import { ElMessage } from 'element-plus'
const text = ref('')
const add = async () => {
    const result = await postCategory({ name: text.value })
    console.log(result);
    ElMessage.success('添加成功')

}
</script>
<template>

    添加分类
    <el-card>
        <el-input v-model="text" style="width: 240px" placeholder="Please input" />
        <el-button @click="add"> 添加分类 </el-button>
    </el-card>
</template>
<style></style>