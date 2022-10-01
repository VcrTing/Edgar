import AddCompany from '@/pages/AddCompany/AddCompany'

import AcSearchSelect from '@/pages/AddCompany/AcSearchSelect/AcSearchSelect'
import AcInputRemind from '@/pages/AddCompany/AcInputRemind/AcInputRemind'
import AcInputTax from '@/pages/AddCompany/AcInputTax/AcInputTax'

import AcFinished from '@/pages/AddCompany/AcFinished/AcFinished.vue'

export default [

    {
        path: '/home/add_company',
        component: AddCompany,
        redirect: '/home/add_company/search_select',
        children: [
            {
                path: '/home/add_company/search_select',
                component: AcSearchSelect,
                meta: { index: 1 }
            },
            {
                path: '/home/add_company/input_remind',
                component: AcInputRemind,
                meta: { index: 2 }
            },
            {
                path: '/home/add_company/input_tax',
                component: AcInputTax,
                meta: { index: 3 }
            }
        ]
    },

    {
        path: '/home/add_company/finished',
        component: AcFinished
    }
]