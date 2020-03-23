import request from '@/utils/request'

/**
 * 18、添加要闻
 * @param { newsAdd } JSON
 */
export const newsAdd = addImportantNews => {
    return request({
      method: 'POST',
      url: '/master/news/add',
      data: addImportantNews
    })
}

/**
 * 19、上传图片
 * @param { uploadPictures } formData
 */
export const uploadPictures = (file) => {
    const formData = new FormData();
    formData.append("file", file.file);
    return request({
      method: 'POST',
      url: '/file/uploadImg',
      data: formData
    })
}