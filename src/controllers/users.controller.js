import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user){
        res.status(404).send({status:"error",error:"User not found"})
    }  
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
        return res.status(404).send({ status: "error", error: "User not found" });
    }
    await usersService.delete(userId);
    res.send({ status: "success", message: "User deleted" });
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).send({ status: 'error', error: 'Missing fields' });
        }

        const newUser = await usersService.create({ first_name, last_name, email, password, role });
        res.status(201).send({ status: 'success', payload: newUser });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};


export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
}