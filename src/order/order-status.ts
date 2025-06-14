import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});