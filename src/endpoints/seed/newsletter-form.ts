import { RequiredDataFromCollectionSlug } from 'payload'

export const newsletterForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Newsletter Form',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Subscribed — check your inbox to confirm.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  emails: [
    {
      emailFrom: '"Martin\'s AI" <hello@martinsmichael.dev>',
      emailTo: '{{email}}',
      subject: 'You\u2019re subscribed.',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Thanks for subscribing to the newsletter.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ],
  fields: [
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email',
      required: true,
      width: 100,
    },
  ],
  redirect: undefined,
  submitButtonLabel: 'Subscribe',
}
