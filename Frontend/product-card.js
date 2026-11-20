import './product-card.css';

function formatPrice(price, currency = 'EGP') {
  const amount = Number(price);
  if (!Number.isFinite(amount)) return 'Price unavailable';

  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function makeTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

/**
 * Creates one Mysta perfume card for the product listing.
 * The parent passes the product and handles cart or restock API actions.
 */
export function createProductCard(product, options = {}) {
  if (!product || typeof product !== 'object') {
    throw new TypeError('createProductCard requires a product object.');
  }

  const {
    currency = 'EGP',
    onAddToCart,
    onRequestRestock,
  } = options;
  const productId = product._id ?? product.id;
  const productName = product.name || 'Mysta fragrance';
  const imageUrl = product.imageUrl || product.image;
  const stock = Number(product.stock);
  const inStock = Number.isFinite(stock) && stock > 0;
  const card = document.createElement('article');
  card.className = 'product-card';

  if (imageUrl) {
    const image = document.createElement('img');
    image.className = 'product-image';
    image.src = imageUrl;
    image.alt = product.imageAlt || `Mysta ${productName} perfume`;
    image.loading = 'lazy';
    card.append(image);
  } else {
    const placeholder = makeTextElement('div', 'product-image product-image-placeholder', 'MYSTA');
    placeholder.setAttribute('aria-hidden', 'true');
    card.append(placeholder);
  }

  const audience = product.audience || product.gender;
  if (audience) {
    const audienceKey = String(audience).toLowerCase();
    const audienceClass = audienceKey.includes('him')
      ? 'tag-him'
      : audienceKey.includes('her')
        ? 'tag-her'
        : 'tag-both';
    card.append(makeTextElement('p', `tag ${audienceClass}`, audience));
  }

  card.append(makeTextElement('h3', 'product-card__name', productName));

  if (product.subtitle) {
    card.append(makeTextElement('p', 'subtitle', product.subtitle));
  }

  const details = [];
  if (product.concentration) details.push(product.concentration);
  if (product.size) details.push(product.size);
  if (details.length) {
    card.append(makeTextElement('p', 'size', details.join(' · ')));
  }

  if (Array.isArray(product.scentNotes) && product.scentNotes.length) {
    card.append(makeTextElement('p', 'product-card__notes', product.scentNotes.join(' · ')));
  }

  const footer = document.createElement('div');
  footer.className = 'product-footer';
  footer.append(makeTextElement('span', 'price', formatPrice(product.price, currency)));

  const action = document.createElement('button');
  action.className = 'btn btn-small product-card__action';
  action.type = 'button';
  action.disabled = !productId || (inStock
    ? typeof onAddToCart !== 'function'
    : typeof onRequestRestock !== 'function');

  if (inStock) {
    action.textContent = 'Add to bag';
    action.setAttribute('aria-label', `Add ${productName} to bag`);
    action.addEventListener('click', () => onAddToCart(productId));
    footer.append(action);
  } else {
    const stockStatus = makeTextElement('span', 'product-card__stock-status', 'Out of stock');
    stockStatus.setAttribute('role', 'status');
    footer.append(stockStatus);
    action.textContent = 'Notify me';
    action.setAttribute('aria-label', `Request a restock alert for ${productName}`);
    action.addEventListener('click', () => onRequestRestock(productId));
    footer.append(action);
  }

  card.append(footer);
  return card;
}
