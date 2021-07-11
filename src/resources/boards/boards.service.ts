import { Injectable } from '@nestjs/common';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  findAll() {
    return this.boardRepository.getAllBoards();
  }

  findOne(id: string) {
    return this.boardRepository.getBoardById(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.updateBoard(id, updateBoardDto);
  }

  remove(id: string) {
    return this.boardRepository.deleteBoard(id);
  }
}
