/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class blogPost {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  created_at: string;
}

export class UpdateBlogPost {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  updated_at: string;
  @ApiProperty()
  post_id: number;
}
