export const buildWhatsAppOrderMessage = ({ cartItems, shipping, total }) => {
  const lines = cartItems.map(
    (item, index) =>
      `${index + 1}. ${item.title} — ${item.selectedSize} × ${item.quantity} (R${item.price * item.quantity})`
  );

  return [
    'Hi Golden Grace Honey 👋',
    '',
    'I would like to place this order:',
    ...lines,
    '',
    `Shipping: ${shipping === 0 ? 'Complimentary' : `R${shipping}`}`,
    `Estimated total: R${total}`,
    '',
    'Please confirm availability, delivery/collection details and payment instructions.',
  ].join('\n');
};

export const buildWhatsAppOrderUrl = ({ number, cartItems, shipping, total }) => {
  const message = buildWhatsAppOrderMessage({ cartItems, shipping, total });
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
