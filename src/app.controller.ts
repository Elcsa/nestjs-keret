import {
  Body,
  Controller,
  Get,
  Param, Query,
  Render,Redirect, Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { Books }from './books.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listbooks(){
    const [rows]=await db.execute(
      'SElect id,title rating from  books where 1 order by rating desc;',

    );
    return{
      Books:rows,
    };
  }
  @Get('books/new')
  @Render('form')
  newkonyvekForm(){
    return{};
  }
  @Get('/keres')
  @Render('index')
  async booksSearch(@Query('rating')rating:number){
    const[rows]=await db.execute(
      'SElect id,title,rating from books where rating like?'[rating],
    );
    return{Books: new};
  }
  @Post('books/new')
  @Redirect()
  async newBooks(@Body()Books:Books){
    const[result]:any=await db.execute(
      'insert into books (title,rating)values(?,?)',
      [Books.title,Books.rating],
    );
    return{
      url:'/',
    };
  }
}
 