<script setup>
import { ref } from "vue"
import { post } from "@/utils/request"

const form = ref({
    cid: '35',
    name: '西游记',
    author: '五成呢',
    file: null
})
const imageUrl = ref('')


const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const handleChange = (file) => {
    console.log(file);
    imageUrl.value = file.url
    form.value.file = file.raw || file;


}

const onSubmit = async () => {
    console.log(form.value);
    const formdata = new FormData()
    formdata.append('cid', form.value.cid)
    formdata.append('name', form.value.name)
    formdata.append('author', form.value.author)
    formdata.append('file', form.value.file)
    const result = await post('/admin/books', formdata, true)

    console.log(result);


}

</script>
<template>

    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="书名">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="分类">
            <el-input v-model="form.cid" />
        </el-form-item>
        <el-form-item label="作者">
            <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="书名">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload" :auto-upload="false" :on-change="handleChange" accept="image/*"
                list-type="picture-card">

                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>

    </el-form>

</template>
<style scoped>
.avatar-uploader img {
    width: 100%;
    height: 100%;
}
</style>