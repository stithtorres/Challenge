import RanksModel from "../models/RanksModel";

export async function getRanks(req, res) {
  try {
    const ranks = await RanksModel.findAll({
      attributes: ['id','value','movie_id','user_id']
    });
    res.json({
      data: ranks
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getRank(req,res) {
  const { id } = req.params;
  const user = await RanksModel.findOne({
    attributes: ['id','value','movie_id','user_id'],
    where: {
      id
    }
  });
  res.json({
    data: user
  });
}

export async function getRanksByUserId(req,res){
  const {user_id} = req.params;
  const ranks = await RanksModel.findAll({
    attributes: ['id','value','movie_id','user_id'],
    where:{user_id}
  });
  res.json({
    data: ranks
  });
}

export async function createRank(req, res) {
  const { value, movie_id, user_id } = req.body;
  //first check if the rank with the given movie and user exists
  const exist = await RanksModel.findOne({
    attributes: ['id','value','movie_id','user_id'],
    where: {
      movie_id,
      user_id
    }
  });

  if(exist){

    // exists then update the rank
    const id = exist.id;
    const ranks = await RanksModel.findAll({
      attributes: ["id", "value", "movie_id", "user_id"],
      where: {
        id
      }
    });
    if (ranks.length > 0) {
      ranks.forEach(async rank => {
        await rank.update({
          value,
          movie_id,
          user_id
        });
      });
    }

    return res.status(200).json({
      message: "Your rate was updated",
      data: exist
    });

  } 
  // if not exists then create
  try {
    let newRank = await RanksModel.create(
      {
        value,
        movie_id,
        user_id
      },
      {
        fields: ["value", "movie_id", "user_id"]
      }
    );
    if (newRank) {
      return res.json({
        message: "You have rated the movie successfully",
        data: newRank
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

export async function deleteRank(req, res) {
  const { id } = req.params;
  const deleteRowCount = await RanksModel.destroy({
    where: {
      id
    }
  });
  res.json({
    message: "Your rating was deleted",
    data: deleteRowCount
  });
}

export async function updateRank(req, res) {
  const { id } = req.params;
  const { value, movie_id, user_id } = req.body;
  const ranks = await RanksModel.findAll({
    attributes: ["id", "value", "movie_id", "user_id"],
    where: {
      id
    }
  });
  if (ranks.length > 0) {
    ranks.forEach(async rank => {
      await rank.update({
        value,
        movie_id,
        user_id
      });
    });
  }

  return res.json({
    message: "rank updated",
    data: ranks
  });
}