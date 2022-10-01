
module.exports = {
    get: async (param, DB) => await strapi.query( DB ).find( param ),

    post: async (data, DB) => await strapi.query( DB ).create( data ),

    vaiide: async(data, DB) => await strapi.entityValidator.validateEntityCreation(
        strapi.models[ DB ],
        data,
        { isDraft: isDraft(data, strapi.models.restaurant) }
    )
}