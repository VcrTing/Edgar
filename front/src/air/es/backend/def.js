

const delete_strapi_def = function(res) {
    delete res.created_at
    delete res.updated_at
    delete res.published_at
    return res
}

export default {
    delete_strapi_def
}