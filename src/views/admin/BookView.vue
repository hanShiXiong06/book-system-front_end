<script setup>
import { fetchBookList } from "@/api/admin/book"
import { ref, watchEffect } from 'vue'
const booklist = ref([])
const page = ref({
    page: 1,
    pageSize: 10,
    total: 0
})
const _fetchBookList = async () => {
    const { data } = await fetchBookList(page.value)

    booklist.value = data.rows
    page.value.total = data.count
}
_fetchBookList()

watchEffect(() => {
    _fetchBookList();
});

// const handleSizeChange = () => {
//     _fetchBookList()
// }
// const handleCurrentChange = () => {
//     _fetchBookList()
// }



</script>

<template>
    123图书列表
    <el-card>
        <el-table :data="booklist" stripe style="width: 100%">
            <el-table-column prop="bookId" label="id" width="80" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="author" label="作者" />
            <el-table-column label="图片">
                <template #default="{ row }">
                    <!-- {{ row }} -->
                    <el-image style="width: 100px; height: 100px" :src="row.img" fit="contain" />
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-pagination v-model:current-page="page.page" v-model:page-size="page.pageSize" :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper" :total="page.total" />
</template>
<style></style>
