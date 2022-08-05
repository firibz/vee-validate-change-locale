import {Notify} from 'quasar'

export const notification = {
  showErrorMessage,
  showSuccessMessage
};

function showErrorMessage(message) {
  Notify.create({
    progress: true,
    color: 'negative',
    icon: 'report_problem',
    caption: 'Error',
    message: message,
    position: 'top',
    timeout: 10000,
    actions: [
      {
        label: 'close', color: 'amber', handler: () => {
        }
      },
    ]
  })
}

function showSuccessMessage(message) {
  Notify.create({
    icon: 'done',
    type: 'positive',
    caption: 'Success',
    message: message,
    position: 'top',
    timeout: 10000,
    actions: [
      {
        label: 'close', color: 'amber', handler: () => {
        }
      },
    ]
  })
}
