import { Injectable, NotFoundException } from '@nestjs/common';

/**
 * author: string;
 * title : string
 * content : string;
 * likeCount : number;
 * commentCount : number;
 */
export interface PostModel {
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

@Injectable()
export class PostsService {
    getAllPosts(){
        return posts;
    }

    getPostById(id: number){
        const post =  posts.find((post )=> post.id === +id);
        if(!post){
            throw new NotFoundException();
        }
        return post;
    }

    createPost(author: string, title: string, content: string){
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

    updatePost(postId: number, author?: string, title?: string, content?: string){
        const post = posts.find( post => post.id === postId);
        if(!post){
        throw new NotFoundException();
        }

        if(author){
        post.author = author;
        }
        if(title){
        post.title = title;
        }
        if(content){
        post.content = content;
        }

        posts = posts.map((prePost)=> prePost.id === postId ? post : prePost);

        return post;
    }

    deletePost(id: number){
        const post = posts.find((post)=> post.id === +id)
        if(!post){
          throw new NotFoundException();
        }
        posts= posts.filter((post)=> post.id !== +id);
        return id;
    }

}
