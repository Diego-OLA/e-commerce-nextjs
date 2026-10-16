export interface OrderItemInput {
  product_id: string | number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemInput[];
  shippingAddress?: string;
  paymentMethod?: string;
}

export interface OrderResponse {
  id: string;
  total: number;
  status: string;
  createdAt: string;
}