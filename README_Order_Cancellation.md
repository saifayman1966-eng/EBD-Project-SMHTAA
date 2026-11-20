# Mysta — Smart Perfume Shopping Platform

**Course:** Electronic Business Development (BINF 503) · Winter 2026  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Ahmed Tarek | 16002267 | T8 | ahmeddtarekk9999 |
| Omar Alaa | 16001361 | T8 | OmarAlaaHamouda |
| Mousta Hassan | 16002087 | T8 | moustafagiu |
| Abdullah Abouleil | 16006613 | T5 | abdulaahleil |
| Ali Khaled | 16002876 | T4 | ali-oagiz |
| Saif Adam | 16002689 | T5 | saifayman1966-eng |
| Omar Mohamed | 16006657 | T4 | Shar2awyyy1 |

## 2. The idea

Mysta is an online perfume shopping platform for customers who want to find and buy fragrances with confidence. Low conversion rates can result when shoppers cannot smell perfumes online, feel unsure which fragrance suits them, or encounter friction while purchasing. Mysta helps customers discover suitable fragrances through a personalized finder, evaluate products through reviews, save favorites, and complete orders through a clear shopping cart and checkout. Customers can also request restock notifications for unavailable fragrances.

## 3. Features

### 3.1 The full product

- Secure customer registration and login.
- Personalized perfume finder based on customers' scent preferences.
- Customer reviews and ratings for purchased perfumes.
- Personalized wishlist for saving and removing fragrances.
- Shopping cart, delivery details, and order placement.
- Restock notification requests for unavailable perfumes.
- **Loyalty and rewards program:** Customers earn points when they make purchases and can redeem those points for discounts or exclusive gifts. This encourages repeat purchases and gives customers an added benefit for continuing to shop with Mysta.
- **Perfume comparison tool:** Customers select perfumes to compare their scent notes, longevity, intensity, suitable occasions, and prices side by side. This helps shoppers understand the differences between unfamiliar fragrances and choose one that fits their preferences and budget.
- **Virtual fragrance consultant:** A chatbot answers customers' questions about scent notes and fragrance types, then suggests suitable Mysta perfumes based on what they are looking for. This gives shoppers immediate guidance when they need help choosing a fragrance.
- **Conversion analytics dashboard:** The dashboard tracks product views, add-to-cart rates, checkout abandonment, and completed purchases. Mysta can use these measures to see where shoppers leave the buying process and identify parts of the shopping experience that may need improvement.
- **Order cancellation requests:** Customers request cancellation for an order that has not yet been processed and provide a reason. An admin reviews the request, and the customer can see whether it is pending, approved, or rejected. If approved, the related order is marked as cancelled.

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email, and password; logs in with email and password | Their home page, with their name in the header | A User, with the password hashed |
| 2 | Personalized perfume finder | Answers questions about scent preferences such as sweet, fresh, woody, or floral | Matching Mysta perfumes and their recommendations | A FragranceProfile containing quiz answers and recommended perfumes |
| 3 | Customer reviews and ratings | Rates and writes a review for a perfume they purchased | Their submitted review and the product's customer feedback | A Review linked to the user and product, with rating and comment |
| 4 | Personalized wishlist | Saves a perfume to their wishlist or removes a saved perfume | Their current list of saved perfumes | A Wishlist linked to the user and containing saved product references |
| 5 | Shopping cart and order placement | Adds perfumes to the cart, adjusts quantities, enters delivery details, and places an order | Cart contents, a clear total price, and order confirmation | Cart items and an Order with products, quantities, delivery details, and total |
| 6 | Restock notification requests | Requests a notification for an unavailable perfume | Confirmation that the request is pending; its status when handled | A RestockRequest linked to the user and product, with request status |
| 7 | Order cancellation requests | Requests cancellation of an order that has not yet been processed and provides a reason | The request status: pending, approved, or rejected; confirmation if the order is cancelled | An OrderCancellationRequest linked to the user and order; the Order status is updated if approved |

## 4. Who owns what

| Member | Use case |
|---|---|
| Ahmed Tarek | 1. Registration and login |
| Omar Alaa | 5. Shopping cart and order placement |
| Mousta Hassan | 2. Personalized perfume finder |
| Abdullah Abouleil | 3. Customer reviews and ratings |
| Saif Adam | 6. Restock notification requests |
| Ali Khaled | 4. Personalized wishlist |
| Omar Mohamed | 7. Order cancellation requests |

## 5. Data model

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
});
```

### Product

```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  scentNotes: [{ type: String }],
  fragranceFamilies: [{ type: String }],
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
});
```

### FragranceProfile

```js
const fragranceProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  preferences: [{ type: String, enum: ['sweet', 'fresh', 'woody', 'floral', 'citrus', 'spicy'] }],
  recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  updatedAt: { type: Date, default: Date.now },
});
```

### Review

```js
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
```

### Wishlist

```js
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  updatedAt: { type: Date, default: Date.now },
});
```

### Cart

```js
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  }],
  updatedAt: { type: Date, default: Date.now },
});
```

### Order

```js
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  }],
  deliveryDetails: {
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  createdAt: { type: Date, default: Date.now },
});
```

### RestockRequest

```js
const restockRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: ['pending', 'notified', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  handledAt: { type: Date },
});
restockRequestSchema.index({ user: 1, product: 1, status: 1 });
```

### OrderCancellationRequest

```js
const orderCancellationRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reason: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
});
orderCancellationRequestSchema.index({ user: 1, order: 1 }, { unique: true });
```

## 6. Run it locally

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on [http://localhost:3000](http://localhost:3000).

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app usually runs at [http://localhost:5173](http://localhost:5173). If Vite prints a different address, use that address instead.
