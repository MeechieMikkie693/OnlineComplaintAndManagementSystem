const User = require('./users')    //we are using the model to find the data in app.js, therefore we are importing the user module.

exports.getAllUsers = async (req,res)=>{
    try{
        const users = await User.find({}) //if we get the data, then store it into users
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createUser = async(req,res)=>{
    try{
        const user = new User(req.body)     //User is the model that we created in users.js. the new user dets is saved in user, then saved to the document using save and then sent to the response.
        await user.save()  //to save it into the document (database)
        res.status(201).send(user)
    }catch(error){
        res.status(500).send(error)
    }
}

exports.updateUser = async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    }catch (error) {
        res.status(500).send(error)
    }
}

exports.findUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    }catch (error) {
        res.status(500).send(error)
    }
}

exports.findUserByEmail = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };

exports.deleteUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    }catch (error){
        res.status(500).send(error)
    }
}