import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateBlogPost, blogPost } from 'src/Dto/blog-posts.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class BlogPostsService {
  //---------------Create Or Add New Blog For  Website Api Service------------------------//
  CreateNewBlogPost = async (
    postBlogData: blogPost,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `blog_posts`;
      const CreateBlogPost = {
        title: postBlogData.title,
        content: JSON.stringify(postBlogData.content),
        created_at: postBlogData.created_at,
      };
      await dbConnection.query(`INSERT INTO ${dbName}.${tableName} SET ?`, [
        CreateBlogPost,
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: `The new blog post has been added successfully!`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Adding Blog Post Try Again`,
      };
    }
  };
  //---------------GET Blog From Database Website Api Service------------------------//
  GetBlogPost = async (): Promise<any> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `blog_posts`;

      const GetBlogPost = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName};
      `);
      return {
        statusCode: HttpStatus.OK,
        message: `Successfully fetched Blogs from the database!`,
        data: GetBlogPost,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to get data from the server`,
      };
    }
  };
  //---------------Update Blog For  Website Api Service------------------------//
  UpdateBlogPosts = async (
    UpdateBlogData: UpdateBlogPost,
  ): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `blog_posts`;
      const UpdateBlogPost = {
        title: UpdateBlogData.title,
        content: JSON.stringify(UpdateBlogData.content),
        updated_at: UpdateBlogData.updated_at,
      };
      await dbConnection.query(
        `UPDATE ${dbName}.${tableName} SET ? WHERE post_id = ?`,
        [UpdateBlogPost, UpdateBlogData.post_id],
      );
      return {
        statusCode: HttpStatus.OK,
        message: `The blog post has been Updated successfully!`,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Updating Blog Post Try Again`,
      };
    }
  };
  //---------------Remove Blog For  Website Api Service------------------------//
  DeleteBlogPosts = async (post_id: number): Promise<responseInterface> => {
    try {
      const dbName = `uitouxdb`;
      const tableName = `blog_posts`;
      await dbConnection.query(
        `DELETE FROM ${dbName}.${tableName} WHERE post_id = ?`,
        [post_id],
      );
      return {
        statusCode: HttpStatus.OK,
        message: `The blog post has been Deleted successfully!`,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Error While Deleting Blog Post Try Again`,
      };
    }
  };
  //----------------------------------------------------------------------------//
}
