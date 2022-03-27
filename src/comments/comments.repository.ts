import { EntityRepository, Repository } from "typeorm";
import { Comments, CommentThumbs, Replies, ReplyThumbs } from "./comments.entity";

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {

}

@EntityRepository(Replies)
export class RepliesRepository extends Repository<Replies> {

}

@EntityRepository(CommentThumbs)
export class CommentThumbsRepository extends Repository<CommentThumbs> {

}

@EntityRepository(ReplyThumbs)
export class ReplyThumbsRepository extends Repository<ReplyThumbs> {

}
