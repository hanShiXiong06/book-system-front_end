<script setup>
import { ref } from "vue"
import { fetchCategory, putCategory, delCategory } from "@/api/admin/book";
import { ElMessage } from 'element-plus'

const tableData = ref([])
const editCategoryDialogVisible = ref(false)
const categoryText = ref('')
const currentCategoryId = ref(null)

const pages = ref({
    total: 0,
    pageSize: 10,
    currentPage: 1
})

const _fetchCategory = () => {
    fetchCategory().then(res => {
        tableData.value = res.data.rows
        console.log(res.data.count);
        pages.value.total = res.data.count
    })
}


// 修改 分类
const edit = (cid) => {
    editCategoryDialogVisible.value = true
    currentCategoryId.value = cid
}
// 
const _putCategory = async () => {

    const reslut = await putCategory(currentCategoryId.value, { name: categoryText.value })
    ElMessage({
        message: '更新成功',
        type: 'success',
    })
    editCategoryDialogVisible.value = false
    _fetchCategory()
}


// 删除分类
const del = async (cid) => {
    const reslut = await delCategory(cid)
    ElMessage({
        message: '删除成功',
        type: 'success',
    })
    _fetchCategory()
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
        {{ pages }}

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="cid" label="分类id" width="80" />
            <el-table-column prop="name" label="Name" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="edit(row.cid)"> 修改</el-button>
                    <el-popconfirm @confirm="del(row.cid)" title="你确定要删除他吗?">

                        <template #reference>
                            <el-button type="danger"> 删除</el-button>
                        </template>

                    </el-popconfirm>
                </template>
            </el-table-column>

        </el-table>
        <template #footer>
            <el-pagination v-model:current-page="pages.currentPage" v-model:page-size="pages.pageSize"
                :page-sizes="[10, 20, 30, 40]" :small="small" layout="total, sizes, prev, pager, next, jumper"
                :total="pages.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </template>
    </el-card>
    <el-dialog v-model="editCategoryDialogVisible" title="修改分类" width="500" :before-close="handleClose">
        <el-input v-model="categoryText" style="width: 240px" placeholder="Please input" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editCategoryDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="_putCategory">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
.el-card {
    margin-top: 20px;
    width: 100%;
}
</style>