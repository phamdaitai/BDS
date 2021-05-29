const { initConnection } = require('../../helpers/dbHelpers');

exports.createCategory = async (data, portal) => {
    let Category = initConnection(portal).model("Category");

    let newCategory = await Category.create(data);
    let category = await Category.findById(newCategory._id );

    return { category }
}

exports.getAllCategories = async (query, portal) => {
    let { page, limit, type, name } = query;

    let option = {};

    //Set query data
    if(name)  option.name = new RegExp(name, "i")
    if(type) option.type = type

    let Category = initConnection(portal).model("Category");

    if (!page || !limit) {
        let allCategories = await Category
            .find(option)
            .sort({createdAt: 'desc' })
        
        return {allCategories}
    } else {
        let allCategories = await Category.paginate(option, {
            page,
            limit,
            sort: { 'createdAt': 'desc' }
        })

        return {allCategories}
    }
}

exports.getDetailCategory = async (id, portal) => {
    let Category = initConnection(portal).model("Category");

    let category = await Category
        .findById(id)
    
    if (!category) {
        throw Error("Category is not existing")
    }

    return { category }
}

exports.updateCategory = async (id, data, portal) => {
    let Category = initConnection(portal).model("Category");

    let category = await Category.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { category }
}

exports.deleteCategory = async (id, portal) => {
    let Category = initConnection(portal).model("Category");

    let category = await Category.findByIdAndDelete(id)

    return { category }
}