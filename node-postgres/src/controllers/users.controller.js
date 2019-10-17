import UsersModel from "../models/UsersModel";

export async function getUsers(req, res) {
  try {
    const users = await UsersModel.findAll();
    res.json({
      data: users
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getActualUser(req,res) {
  const { id } = req.user;
  const user = await UsersModel.findOne({
    attributes: ['id','name','email'],
    where: {
      id
    }
  });
  res.json({
    data: user
  });
}

export async function getUser(req,res) {
  const { id } = req.params;
  const user = await UsersModel.findOne({
    where: {
      id
    }
  });
  res.json({
    data: user
  });
}

export async function createUser(req, res) {
  const { name, email, password } = req.body;

  const exist = await UsersModel.findOne({
    where: {
      email
    }
  });
  
  if(exist) return res.status(400).send('The user alredy exists');

  try {
    let newUser = await UsersModel.create(
      {
        name,
        email,
        password
      },
      {
        fields: ["name", "email", "password"]
      }
    );
    if (newUser) {
      return res.json({
        message: "User created successfully",
        data: newUser
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "something goes wrong",
      data: {}
    });
  }
}