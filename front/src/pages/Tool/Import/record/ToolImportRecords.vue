<template>
    
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                form: {
                    error_json: [ ],
                    file_name: '',

                    success_num: 0,
                    error_num: 0,

                    total: 0,
                    user: { },
                    mark: ''
                }
            }
        },
        methods: {
            async create_record(form) {
                await this.serv.imports.create_import_record(this, form)
            },

            build_error_item(code) {
                let txt = '无数据'
                if (code >=400 && code < 500) {
                    txt = '该数据，字段错误 或 无关键字段（后台监测出该条数据无法导入）'
                } else if(code >= 500) {
                    txt = '数据重复（后台监测该条数据后，表示导入时出错）'
                }
                return {
                    code,
                    txt
                }
            },

            reset() {
                this.form = {
                    error_json: [ ],
                    file_name: '',

                    success_num: 0,
                    error_num: 0,

                    total: 0,
                    user: { },
                    mark: ''
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>