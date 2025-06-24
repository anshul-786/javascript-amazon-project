import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import isWeekend from '../scripts/utils/date.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDateString(deliveryOption) {
  const today = dayjs();
  let daysToBeAdded = deliveryOption.deliveryDays;
  let deliveryDate = today;

  while (daysToBeAdded) {
    if (!isWeekend(deliveryDate.add(1, 'days'))) {
      daysToBeAdded--;
    }
    deliveryDate = deliveryDate.add(1, 'days');
  }

  const deliveryDateString = deliveryDate.format('dddd, MMMM D');
  return deliveryDateString;
}