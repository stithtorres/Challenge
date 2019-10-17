import CommentsModel from "../models/CommentsModel";

export async function getComments(req, res) {
  try {
    const comment = await CommentsModel.findAll({
      attributes: ['id','comment','movie_id', 'user_name','user_id']
    });
    res.json({
      data: comment
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getCommentsByMovieId(req, res) {
  const {movie_id} = req.params;
  const comments = await CommentsModel.findAll({
    attributes: ['id','comment','movie_id', 'user_name','user_id'],
    where:{movie_id}
  });
  res.json({
    data: comments
  });
}

export async function getComment(req,res) {
  const { id } = req.params;
  const comment = await CommentsModel.findOne({
    attributes: ['id','comment','movie_id','user_name','user_id'],
    where: {
      id
    }
  });
  res.json({
    data: comment
  });
}

export async function getCommentsByUserId(req,res){
  const {user_id} = req.params;
  const comments = await CommentsModel.findAll({
    attributes: ['id','comment','movie_id','user_name','user_id'],
    where:{user_id}
  });
  res.json({
    data: comments
  });
}

export async function createComment(req, res) {
  const { comment, movie_id, user_name, user_id } = req.body;
  try {
    let newComment = await CommentsModel.create(
      {
        comment,
        movie_id,
        user_name,
        user_id
      },
      {
        fields: ["comment", "movie_id", "user_name", "user_id"]
      }
    );
    if (newComment) {
      return res.json({
        message: "Comment created successfully",
        data: newComment
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "something goes wrong",
      data: {}
    });
  }
}

