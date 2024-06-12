<script setup>
import { ref } from "vue"
import { fetchCategory } from "@/api/admin/book";
const tableData = ref([])

const _fetchCategory = () => {
    fetchCategory().then(res => {

        tableData.value = res.data.rows
    })
}


// 修改 分类
const edit = (cid) => {
    console.log(cid);
}

_fetchCategory()
</script>
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <a href="/"> 分类页</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item> 分类页列表</el-breadcrumb-item>

    </el-breadcrumb>

    <el-card>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="cid" label="分类id" width="80" />
            <el-table-column prop="name" label="Name" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="edit(row.cid)"> 修改</el-button>
                    <el-button type="danger"> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <template #footer>
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </template>
    </el-card>
</template>
<style scoped>
.el-card {
    margin-top: 20px;
    width: 100%;
}
</style>