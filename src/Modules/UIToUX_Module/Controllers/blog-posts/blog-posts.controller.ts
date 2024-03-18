import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogPostsService } from '../../Services/blog-posts/blog-posts.service';
import { UpdateBlogPost, blogPost } from 'src/Dto/blog-posts.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Blogs Api')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private blogService: BlogPostsService) {}
  //---------------Create Or Add New Blog For  Website Api Route Controller------------------------//
  @Post('CreateBlogPost')
  async CreateBlogPost(@Body() blogPostData: blogPost) {
    try {
      const CreateBlogPost = await this.blogService.CreateNewBlogPost(
        blogPostData,
      );
      return CreateBlogPost;
    } catch (error) {
      throw error;
    }
  }

  //---------------GET Blog For Website Api Route Controller------------------------//
  @Get('GetAllBlogPost')
  async GetBlogPost() {
    try {
      const GetBlogPost = await this.blogService.GetBlogPost();
      return GetBlogPost;
    } catch (error) {
      throw error;
    }
  }

  //---------------Update Blog For  Website Api Route Controller------------------------//
  @Put('UpdateBlogPosts')
  async UpdateBlogPosts(@Body() UpdateBlogData: UpdateBlogPost) {
    try {
      const UpdateBlogPosts = await this.blogService.UpdateBlogPosts(
        UpdateBlogData,
      );
      return UpdateBlogPosts;
    } catch (error) {
      throw error;
    }
  }

  //---------------Remove Blog For  Website Api Route Controller------------------------//
  @Delete('DeleteBlogPosts')
  async DeleteBlogPosts(@Query('post_id') post_id: number) {
    try {
      const DeleteBlogPosts = await this.blogService.DeleteBlogPosts(post_id);
      return DeleteBlogPosts;
    } catch (error) {
      throw error;
    }
  }
}
