import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * author: string;
 * title : string
 * content : string;
 * likeCount : number;
 * commentCount : number;
 */
interface PostModel {
  id: number;
  author: string;
  title : string
  content : string;
  likeCount : number;
  commentCount : number;
}

let posts: PostModel[] = [
  {
    id : 1,
    author: 'newjeans_offical',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id : 2,
    author: 'newjeans_offical',
    title: '뉴진스 해린',
    content: '노래 연습하고 있는 민지',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id : 3,
    author: 'blackpink_offical',
    title: '블랙핑크 로제제',
    content: '공연장에서 공연중인 로제',
    likeCount: 1000000,
    commentCount: 999999,
  },
]


@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 1) GET /posts
  //    모든 post를 가져온다.
  @Get()
  getPosts(){
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string){
    const post =  posts.find((post )=> post.id === +id);
    if(!post){
      throw new NotFoundException();
    }
    return post;
  }
  // 3) POST /posts
  //    POST를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    const post: PostModel = {
      id : posts[posts.length-1].id +1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    }
    posts = [
      ...posts,
      post,
    ];
    return post;
  }
  // 4) PUT /posts/:id
  //    id에 해당하는 POST를 변경한다.

  // 5) DELETE /post/:id
  //    id에 해당하는 post를 삭제한다. 

}
