import { Injectable } from '@nestjs/common';
import { CreateCompleteLessionDto } from './dto/create-complete_lession.dto';
import { UpdateCompleteLessionDto } from './dto/update-complete_lession.dto';

@Injectable()
export class CompleteLessionsService {
  create(createCompleteLessionDto: CreateCompleteLessionDto) {
    return 'This action adds a new completeLession';
  }

  findAll() {
    return `This action returns all completeLessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completeLession`;
  }

  update(id: number, updateCompleteLessionDto: UpdateCompleteLessionDto) {
    return `This action updates a #${id} completeLession`;
  }

  remove(id: number) {
    return `This action removes a #${id} completeLession`;
  }
}
