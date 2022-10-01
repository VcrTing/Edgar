
import CompanyMy from '@/pages/CompanyMy/CompanyMy'
import CompanyView from '@/pages/CompanyView/CompanyView'

import CompanyEdit from '@/pages/CompanyEdit/CompanyEdit'
import CompanyTrash from '@/pages/CompanyEdit/CompanyTrash'
import CompanyCreate from '@/pages/CompanyCreate/CompanyCreate'

export default [

    {
        path: '/home/company_my',
        component: CompanyMy
    },
    {
        path: '/home/company_view',
        component: CompanyView
    },
    {
        path: '/home/company_edit',
        component: CompanyEdit
    },
    {
        path: '/home/company_trash',
        component: CompanyTrash
    },
    {
        path: '/home/company_create',
        component: CompanyCreate
    }
]