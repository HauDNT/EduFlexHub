import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart_detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart_detail.dto';

@Injectable()
export class CartDetailsService {
  create(createCartDetailDto: CreateCartDetailDto) {
    return 'This action adds a new cartDetail';
  }

  findAll() {
    return `This action returns all cartDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartDetail`;
  }

  update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    return `This action updates a #${id} cartDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartDetail`;
  }
}
