import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async chart() {
    return this.orderRepository.query(`
     SELECT DATE_FORMAT(o.created_at, '%y-%m-%d') as date, sum(i.price * i.quantity) as sum
     FROM orders o
     JOIN order_items i on o.id = i.order_id
     GROUP BY date
    `);
  }
}
