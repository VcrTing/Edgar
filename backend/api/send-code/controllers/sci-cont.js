module.exports = {
    note: {
        'subject': (cd) => '',
        'content': (to, code) => { return `尊敬的客戶，您的驗證碼為[${code}]，該驗證碼僅作用於您的手機號碼 ${to}，請在驗證碼失效之前盡快將驗證碼填入到EdgarEmma網頁的驗證碼輸入框中，感謝您的配合。`}
    },
    whatsapp: {
        'subject': (cd) => '',
        'content': (to, code) => { return `尊敬的客戶，您的驗證碼為[${code}]，該驗證碼僅作用於您的手機號碼 ${to}，請在驗證碼失效之前盡快將驗證碼填入到EdgarEmma網頁的驗證碼輸入框中，感謝您的配合。`}
    },
    email: {
        'subject': (cd) => { return `【${cd}】EdgarEmma 表單的電子郵件驗證碼` },
        'content': (to, code) => { return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>電郵地址驗證碼</title>
        </head>
        <body>
            <div class="box">
                <h2>妳好，這裏是<span>EdgarEmma</span>，請驗證您的電郵地址。 </h2>
                <p>您填入的電郵地址為 ${to}。該電郵地址對應的驗證碼為：<b>${code}</b></p>
                <p>如有查詢，請電郵<a href="mailto:info@EdgarEmma.com">info@EdgarEmma.com</a></p>
            </div>
            <style>
                html { color: #1e1f22; }
                p { color: #58595c; }
                .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
                .Logo { margin: 24px; max-width: 320px; }
            </style>
        </body>
        </html>` }
    }
}