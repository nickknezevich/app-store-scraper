import { Injectable } from '@nestjs/common';
import { CreateCompletionDto } from './dto/create-completion.dto';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

@Injectable()
export class ChatGPTService {

  async createCompletion({
    question,
    model,
    temperature,
  }: CreateCompletionDto): Promise<unknown | Error> {
    try {
      console.log("QUESTION", question)
      const params: any = {
        model: model || 'text-davinci-003',
        temperature: temperature || 0.9,
        messages: [{role: "user", content: question}],
      };
      
      const data = await openai.chat.completions.create(params);
      return data;
    
      
    } catch (e) {
      console.log(e)
      throw new Error(e);
    }
  }
}