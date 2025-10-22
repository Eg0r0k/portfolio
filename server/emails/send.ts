import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'HR <lambdawork1n@gmail.com>',
      to: ['lambdawork1n@gmail.com'],
      subject: `Новое сообщение от ${fullname}`,
      html: `
        <p>Получено новое сообщение через форму контактов на сайте.</p>
        <p><strong>Детали:</strong></p>
        <ul>
          <li><strong>Имя:</strong> ${fullname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Телефон:</strong> ${phone || '—'}</li>
          <li><strong>Тема:</strong> ${subject || '—'}</li>
          <li><strong>Сообщение:</strong><br>${message.replace(/\n/g, '<br>')}</li>
        </ul>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
