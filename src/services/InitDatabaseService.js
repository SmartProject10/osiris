const User = require('../model/userSchema.js');
const Rol = require('../model/rolesSchema.js');
const bcrypt = require('bcryptjs');

async function createSuperAdmin() {

  const usuario = ({
    email: "isoandiso@gmail.com",
    password: "123",
    firstname: "Super",
    lastname: "Admin",
    vName: "Super Admin"
  });

  const { email, password, lastname, firstname, vName } = usuario;

  try {

    const rolFound = await Rol.findOne({ vName });
    if (!rolFound) {
      console.log(vName+' user role no found!');
      return;
    }

   // console.log(rolFound.id);

    const userFound = await User.findOne({ email });
    if (userFound) {
      console.log(vName+' user  was created ago!');
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordHash,
      firstname,
      lastname,
      rol: rolFound.id
    });
    await  newUser.save();
    console.log(vName+' user  created successfully ;)');
    return;
  } catch (error) {
    console.error('We can not to make the '+vName+' user  :( =>' + error);
    return;
  }

}

async function createRol(rol, no) {

  const Props = ({
    vName: rol,
    vOrder: no
  });

  const { vName, vOrder } = Props;


  try {
    const Found = await Rol.findOne({ vName });
    if (Found) {
      console.log('Role was created ago!');
      return;
    }

    const New = new Rol(Props);

    await New.save();
    console.log('Role created successfully ;)');
    return;
  } catch (error) {
    console.error('We can not to make ' + rol + ' role user :( =>' + error);
    return;
  }

}


module.exports = {
  createSuperAdmin,
  createRol
};