import { Controller, Post, Body } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { CreateCompletionDto } from './dto/create-completion.dto';

@Controller('chat-gpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post('completion')
  async createCompletion(@Body() createCompletionDto: CreateCompletionDto) {
    console.log(createCompletionDto)
    return this.chatGPTService.createCompletion(createCompletionDto);
  }
}