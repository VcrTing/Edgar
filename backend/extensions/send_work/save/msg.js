module.exports = {
    'note': [
        { id: 1,
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: '' }, 
            subject: '', content: '你好，提醒你，你旗下 {{company_named}} 需要在30天內完成報稅，遲左會罰款架。' },
        { id: 2,
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: '' }, 
            subject: '', content: '你好，提醒你，您已成功添加了妳的公司 {{company_named}}。這個一個由EdgarEmma.com提供的免費提醒服務，請留心好妳公司的合規和報稅等提示。' }
    ],
    'email': [
        { id: 1, 
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: ''
            },
            subject: 'EdgarEmma 纳税提醒', content: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>纳税日提醒</title>
            </head>
            <body>
                <div class="box">
                    <img width="320px" style="max-width: 320px; width: 320px;" src="https://edgaremma.com/wp-content/uploads/Edgaremma-logo.png" class="Logo" />
                    <h2>你好 <span>{{user_email}}</span>，提醒你， </h2>
                    <p>你旗下 {{company_named}} 公司需要在30天內完成報稅，遲左會罰款架。</p>
                    <p>如有查詢，請電郵<a href="mailto:info@EdgarEmma.com">info@EdgarEmma.com</a></p>
                    <br/>
                    <p class="sub"><a href="https://strapi07.svr.up5d.com/suspension/notice">暫停該公司的提醒？</a></p>
                </div>
                <style>
                    html { color: #1e1f22; }
                    p { color: #58595c; }
                    .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
                    .Logo { margin: 24px; max-width: 320px; }
                    .sub { font-size: 12px; }
                </style>
            </body>
            </html>` 
        },
        { id: 2, 
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: ''
            },
            subject: 'EdgarEmma 操作提醒', content: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>操作提醒</title>
            </head>
            <body>
                <div class="box">
                    <img width="320px" style="max-width: 320px; width: 320px;" src="https://edgaremma.com/wp-content/uploads/Edgaremma-logo.png" class="Logo" />
                    <h2><span>{{user_email}}</span>提提妳， </h2>
                    <p>您已成功添加了妳的公司 {{company_named}}。這個一個由EdgarEmma.com提供的免費提醒服務，請留心好妳公司的合規和報稅等提示。</p>
                    <p>如有查詢，請電郵<a href="mailto:info@EdgarEmma.com">info@EdgarEmma.com</a></p>
                </div>
                <style>
                    html { color: #1e1f22; }
                    p { color: #58595c; }
                    .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
                    .Logo { margin: 24px; max-width: 320px; }
                </style>
            </body>
            </html>` 
        }
    ],
    'whatsapp': [
        { id: 1, params: { company_named: '', filling_timed: '' }, 
            tempiate_name: 'tax_reminder_01',
            subject: '', content: '{{company_named}}___{{filling_timed}}' },
        { id: 2, params: { company_named: '', }, 
            tempiate_name: 'echo_new_company_added_01',
            subject: '', content: '{{company_named}}' }
    ],

    'error': { id: 0, subject: '錯誤提示', content: '您尚未選擇發送內容。' }
}